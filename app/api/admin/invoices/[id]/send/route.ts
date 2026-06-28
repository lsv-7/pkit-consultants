import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAdmin } from "@/lib/auth";
import { CommunicationService } from "@/lib/communication/communication";

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const isAdmin = await verifyAdmin();
  if (!isAdmin) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;

    // Fetch invoice with client details
    const invoice = await prisma.invoice.findUnique({
      where: { id },
      include: {
        client: {
          include: { clientUsers: true },
        },
      },
    });

    if (!invoice) {
      return NextResponse.json({ success: false, message: "Invoice not found" }, { status: 404 });
    }

    // Check if client has portal users
    const clientUser = invoice.client.clientUsers.find(u => u.active);
    const recipientEmail = clientUser ? clientUser.email : invoice.client.email;
    const recipientName = clientUser ? clientUser.fullName : invoice.client.contactPerson;

    // Generate A4 PDF buffer by fetching internally from PDF endpoint
    const hostHeader = req.headers.get("host") || "localhost:3000";
    const protocol = req.headers.get("x-forwarded-proto") || "http";
    const pdfUrl = `${protocol}://${hostHeader}/api/admin/invoices/${id}/pdf`;
    
    const cookieHeader = req.headers.get("cookie") || "";
    const pdfRes = await fetch(pdfUrl, {
      headers: {
        cookie: cookieHeader,
      },
    });

    if (!pdfRes.ok) {
      throw new Error(`PDF Generation API returned status ${pdfRes.status}`);
    }

    const arrayBuffer = await pdfRes.arrayBuffer();
    const pdfBuffer = Buffer.from(arrayBuffer);

    // Format invoice numbers/dates
    const amountFormatted = `AED ${invoice.grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}`;
    const dueDateFormatted = invoice.dueDate.toISOString().split("T")[0];

    // Trigger Communication Service
    await CommunicationService.sendInvoice(
      invoice.id,
      invoice.invoiceNumber,
      recipientName,
      recipientEmail,
      dueDateFormatted,
      amountFormatted,
      pdfBuffer,
      invoice.clientId
    );

    // Update status to SENT if it was DRAFT
    if (invoice.status === "DRAFT") {
      await prisma.invoice.update({
        where: { id },
        data: { status: "SENT" },
      });
    }

    return NextResponse.json({ success: true, message: "Invoice email sent successfully" });
  } catch (error: any) {
    console.error("[Send Invoice API Error]:", error);
    return NextResponse.json({ success: false, message: error.message || "Failed to dispatch invoice email" }, { status: 500 });
  }
}
