import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAdmin } from "@/lib/auth";

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const isAdmin = await verifyAdmin();
  if (!isAdmin) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;

    // Find the lead
    const lead = await prisma.lead.findUnique({
      where: { id },
    });

    if (!lead) {
      return NextResponse.json({ success: false, message: "Lead not found" }, { status: 404 });
    }

    if (lead.status === "CONVERTED" || lead.converted) {
      return NextResponse.json({ success: false, message: "Lead has already been converted" }, { status: 400 });
    }

    // Find or create Client by email (case-insensitive, trimmed and lowercased)
    let client = await prisma.client.findFirst({
      where: {
        email: {
          equals: lead.email.trim().toLowerCase(),
          mode: "insensitive"
        }
      },
    });

    if (!client) {
      client = await prisma.client.create({
        data: {
          company: lead.company || "Individual",
          contactPerson: lead.fullName,
          email: lead.email.trim().toLowerCase(),
          phone: lead.phone,
          notes: lead.notes ? `${lead.notes}\nService: ${lead.service}` : `Service: ${lead.service}`,
        },
      });
    }

    // Update lead status
    await prisma.lead.update({
      where: { id },
      data: {
        status: "CONVERTED",
        converted: true,
      },
    });

    // Create notification
    await prisma.notification.create({
      data: {
        type: "CMS_UPDATED",
        title: "Lead Converted to Client",
        message: `Lead ${lead.fullName} (${lead.company || "Individual"}) was converted to a Client.`,
        read: false,
      },
    });

    return NextResponse.json({ success: true, clientId: client.id });
  } catch (error) {
    console.error("Error converting lead to client:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
