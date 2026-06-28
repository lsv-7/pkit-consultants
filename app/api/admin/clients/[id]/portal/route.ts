import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAdmin } from "@/lib/auth";
import bcrypt from "bcrypt";
import { CommunicationService } from "@/lib/communication/communication";

// Helper to generate temporary password
function generateTempPassword() {
  return "PKIT-" + Math.random().toString(36).substring(2, 8).toUpperCase();
}

// POST: Enable Client Portal
export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const isAdmin = await verifyAdmin();
  if (!isAdmin) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await req.json();
    const { email, fullName } = body;

    if (!email || !fullName) {
      return NextResponse.json({ success: false, message: "Email and Full Name are required" }, { status: 400 });
    }

    // Check if client exists
    const client = await prisma.client.findUnique({
      where: { id },
      include: { clientUsers: true },
    });

    if (!client) {
      return NextResponse.json({ success: false, message: "Client not found" }, { status: 404 });
    }

    if (client.clientUsers.length > 0) {
      return NextResponse.json({ success: false, message: "Portal is already enabled for this client" }, { status: 400 });
    }

    const trimmedEmail = email.trim().toLowerCase();

    // Check if email already registered globally (must be unique)
    const existingUser = await prisma.clientUser.findUnique({
      where: { email: trimmedEmail },
    });
    if (existingUser) {
      return NextResponse.json({ success: false, message: "Email is already registered for another portal user" }, { status: 400 });
    }

    const tempPassword = generateTempPassword();
    const passwordHash = await bcrypt.hash(tempPassword, 10);

    const clientUser = await prisma.clientUser.create({
      data: {
        clientId: id,
        fullName,
        email: trimmedEmail,
        passwordHash,
        role: "CLIENT",
        active: true,
      },
    });

    // Log a notification that portal was enabled
    await prisma.notification.create({
      data: {
        type: "CMS_UPDATED",
        title: "Portal Access Enabled",
        message: `Portal access granted to Client User ${email} (${fullName}).`,
        read: false,
      },
    });

    // Send credentials and welcome email
    await CommunicationService.sendPortalCredentials(
      id,
      fullName,
      trimmedEmail,
      tempPassword,
      "ADMIN"
    );

    return NextResponse.json({
      success: true,
      tempPassword,
      clientUser: {
        id: clientUser.id,
        email: clientUser.email,
        fullName: clientUser.fullName,
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Failed to enable portal" }, { status: 500 });
  }
}

// PATCH: Toggle Portal Status (Active/Disabled)
export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const isAdmin = await verifyAdmin();
  if (!isAdmin) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await req.json();
    const { active } = body;

    const clientUser = await prisma.clientUser.findFirst({
      where: { clientId: id },
    });

    if (!clientUser) {
      return NextResponse.json({ success: false, message: "Portal user not found" }, { status: 404 });
    }

    const updated = await prisma.clientUser.update({
      where: { id: clientUser.id },
      data: { active },
    });

    // Log notification
    await prisma.notification.create({
      data: {
        type: "CMS_UPDATED",
        title: "Portal Access Modified",
        message: `Client Portal status for ${clientUser.email} set to ${active ? "Active" : "Disabled"}.`,
        read: false,
      },
    });

    return NextResponse.json({ success: true, active: updated.active });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Failed to update portal status" }, { status: 500 });
  }
}

// PUT: Reset Client Password
export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const isAdmin = await verifyAdmin();
  if (!isAdmin) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;

    const clientUser = await prisma.clientUser.findFirst({
      where: { clientId: id },
    });

    if (!clientUser) {
      return NextResponse.json({ success: false, message: "Portal user not found" }, { status: 404 });
    }

    const tempPassword = generateTempPassword();
    const passwordHash = await bcrypt.hash(tempPassword, 10);

    await prisma.clientUser.update({
      where: { id: clientUser.id },
      data: { passwordHash },
    });

    // Log notification
    await prisma.notification.create({
      data: {
        type: "CMS_UPDATED",
        title: "Portal Password Reset",
        message: `Portal password reset for Client User ${clientUser.email}.`,
        read: false,
      },
    });

    // Send new credentials email
    await CommunicationService.sendPortalCredentials(
      clientUser.clientId,
      clientUser.fullName,
      clientUser.email,
      tempPassword,
      "ADMIN"
    );

    return NextResponse.json({
      success: true,
      tempPassword,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Failed to reset password" }, { status: 500 });
  }
}
