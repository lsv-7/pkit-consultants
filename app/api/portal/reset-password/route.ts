import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { CommunicationService } from "@/lib/communication/communication";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { token, email, newPassword } = body;

    if (!token || !email || !newPassword) {
      return NextResponse.json({ success: false, message: "All fields are required" }, { status: 400 });
    }

    if (newPassword.length < 8) {
      return NextResponse.json({ success: false, message: "Password must be at least 8 characters long" }, { status: 400 });
    }

    const trimmedEmail = email.trim().toLowerCase();

    // Find client user
    const clientUser = await prisma.clientUser.findFirst({
      where: {
        email: trimmedEmail,
        resetToken: token,
      },
    });

    if (!clientUser) {
      return NextResponse.json({ success: false, message: "Invalid or expired password reset link" }, { status: 400 });
    }

    // Verify token expiry
    if (!clientUser.resetTokenExp || new Date() > clientUser.resetTokenExp) {
      return NextResponse.json({ success: false, message: "Password reset link has expired" }, { status: 400 });
    }

    // Hash new password
    const passwordHash = await bcrypt.hash(newPassword, 10);

    // Update password and clear reset token fields
    await prisma.clientUser.update({
      where: { id: clientUser.id },
      data: {
        passwordHash,
        resetToken: null,
        resetTokenExp: null,
      },
    });

    // Send confirmation of password change
    await CommunicationService.sendGeneralNotification(
      clientUser.email,
      clientUser.fullName,
      "Security Notice: Password Reset Complete",
      "This email confirms that the password for your PKIT Client Portal account has been successfully reset. If you did not make this change, please contact PKIT Client Support immediately.",
      "Go to Portal",
      `${process.env.NEXT_PUBLIC_APP_URL || "https://www.pkitconsultants.com"}/portal/login`,
      clientUser.clientId
    );

    return NextResponse.json({
      success: true,
      message: "Password has been successfully reset.",
    });
  } catch (error) {
    console.error("[Reset Password API Error]:", error);
    return NextResponse.json({ success: false, message: "An error occurred" }, { status: 500 });
  }
}
