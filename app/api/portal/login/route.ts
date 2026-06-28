import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getClientIp, rateLimit } from "@/lib/rate-limit";

export async function POST(req: Request) {
  const ip = getClientIp(req);
  const limit = rateLimit(`portal-login:${ip}`, 10, 15 * 60_000);
  if (!limit.success) {
    return NextResponse.json(
      { success: false, message: "Too many login attempts. Please try again later." },
      { status: 429 }
    );
  }

  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required" },
        { status: 400 }
      );
    }

    const trimmedEmail = email.trim().toLowerCase();

    const clientUser = await prisma.clientUser.findUnique({
      where: { email: trimmedEmail },
      include: { client: true },
    });

    if (!clientUser) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password" },
        { status: 401 }
      );
    }

    if (!clientUser.active) {
      return NextResponse.json(
        { success: false, message: "Your portal access has been disabled. Please contact the administrator." },
        { status: 403 }
      );
    }

    const valid = await bcrypt.compare(password, clientUser.passwordHash);
    if (!valid) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Update lastLogin
    await prisma.clientUser.update({
      where: { id: clientUser.id },
      data: { lastLogin: new Date() },
    });

    // Create unique Client Token
    const clientToken = jwt.sign(
      {
        id: clientUser.id,
        clientId: clientUser.clientId,
        email: clientUser.email,
        role: "CLIENT",
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: "7d",
      }
    );

    const response = NextResponse.json({
      success: true,
      clientUser: {
        id: clientUser.id,
        fullName: clientUser.fullName,
        email: clientUser.email,
        clientId: clientUser.clientId,
        company: clientUser.client.company,
      },
    });

    // Save in HTTP-only cookie client_token
    response.cookies.set("client_token", clientToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
