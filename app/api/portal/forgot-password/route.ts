import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";
import { CommunicationService } from "@/lib/communication/communication";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ success: false, message: "Email is required" }, { status: 400 });
    }

    const trimmedEmail = email.trim().toLowerCase();
    
    // Find client user
    const clientUser = await prisma.clientUser.findUnique({
      where: { email: trimmedEmail },
      include: { client: true },
    });

    if (!clientUser) {
      // Return success even if not found to prevent username enumeration, but log it
      console.log(`[Forgot Password] Requested email not found in database: ${trimmedEmail}`);
      return NextResponse.json({
        success: true,
        message: "If the email is registered, a password reset link has been sent.",
      });
    }

    // Generate secure token
    const token = crypto.randomBytes(32).toString("hex");
    const expiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour expiry

    // Save token to database
    await prisma.clientUser.update({
      where: { id: clientUser.id },
      data: {
        resetToken: token,
        resetTokenExp: expiry,
      },
    });

    // Send reset email via communication service
    await CommunicationService.sendPasswordReset(
      clientUser.id,
      clientUser.fullName,
      clientUser.email,
      token,
      clientUser.clientId
    );

    return NextResponse.json({
      success: true,
      message: "If the email is registered, a password reset link has been sent.",
    });
  } catch (error) {
    console.error("[Forgot Password API Error]:", error);
    return NextResponse.json({ success: false, message: "An error occurred" }, { status: 500 });
  }
}
