import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getClientIp, rateLimit } from "@/lib/rate-limit";

export async function POST(req: Request) {
  const ip = getClientIp(req);
  const limit = rateLimit(`admin-login:${ip}`, 10, 15 * 60_000);
  if (!limit.success) {
    return NextResponse.json(
      { success: false, message: "Too many login attempts. Please try again later." },
      { status: 429 }
    );
  }

  try {
    const { email, password } = await req.json();
    const cleanEmail = email ? email.trim().toLowerCase() : "";

    const admin = await prisma.admin.findUnique({
      where: { email: cleanEmail },
    });

    if (!admin) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password",
        },
        { status: 401 }
      );
    }

    const valid = await bcrypt.compare(password, admin.password);

    if (!valid) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password",
        },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      {
        id: admin.id,
        email: admin.email,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: "7d",
      }
    );

    // Create Login Activity Notification
    await prisma.notification.create({
      data: {
        type: "LOGIN_ACTIVITY",
        title: "Admin Dashboard Access",
        message: `Admin ${admin.email} successfully logged in.`,
        read: false,
      },
    });

   const response = NextResponse.json({
  success: true,
  admin: {
    id: admin.id,
    name: admin.name,
    email: admin.email,
  },
});

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
      },
      { status: 500 }
    );
  }
}