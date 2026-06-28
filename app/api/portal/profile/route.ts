import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyClient } from "@/lib/auth";
import bcrypt from "bcrypt";

export const dynamic = "force-dynamic";

export async function GET() {
  const clientSession = await verifyClient();
  if (!clientSession) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const clientUser = await prisma.clientUser.findUnique({
      where: { id: clientSession.id },
      include: { client: true },
    });

    if (!clientUser) {
      return NextResponse.json({ success: false, message: "Client user not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      clientUser: {
        id: clientUser.id,
        fullName: clientUser.fullName,
        email: clientUser.email,
        role: clientUser.role,
        client: clientUser.client,
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  const clientSession = await verifyClient();
  if (!clientSession) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { fullName, company, contactPerson, phone, website, address, password } = body;

    // Update ClientUser
    const clientUserUpdateData: any = {};
    if (fullName !== undefined) clientUserUpdateData.fullName = fullName;
    if (password) {
      clientUserUpdateData.passwordHash = await bcrypt.hash(password, 10);
    }

    if (Object.keys(clientUserUpdateData).length > 0) {
      await prisma.clientUser.update({
        where: { id: clientSession.id },
        data: clientUserUpdateData,
      });
    }

    // Update Client
    const clientUpdateData: any = {};
    if (company !== undefined) clientUpdateData.company = company;
    if (contactPerson !== undefined) clientUpdateData.contactPerson = contactPerson;
    if (phone !== undefined) clientUpdateData.phone = phone;
    if (website !== undefined) clientUpdateData.website = website;
    if (address !== undefined) clientUpdateData.address = address;

    if (Object.keys(clientUpdateData).length > 0) {
      await prisma.client.update({
        where: { id: clientSession.clientId },
        data: clientUpdateData,
      });
    }

    return NextResponse.json({ success: true, message: "Profile updated successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
