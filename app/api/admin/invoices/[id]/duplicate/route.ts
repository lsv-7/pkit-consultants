import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAdmin } from "@/lib/auth";

type Props = {
  params: Promise<{ id: string }>;
};

export async function POST(req: Request, { params }: Props) {
  const isAdmin = await verifyAdmin();
  if (!isAdmin) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const sourceInvoice = await prisma.invoice.findUnique({
      where: { id },
      include: { items: true },
    });

    if (!sourceInvoice) {
      return NextResponse.json({ success: false, message: "Source invoice not found" }, { status: 404 });
    }

    // Generate next invoice number sequentially
    const lastInvoice = await prisma.invoice.findFirst({
      orderBy: { createdAt: "desc" },
    });

    let newInvoiceNumber = `INV-${new Date().getFullYear()}-0001`;
    if (lastInvoice) {
      const match = lastInvoice.invoiceNumber.match(/INV-(\d+)-(\d+)/);
      if (match) {
        const year = match[1];
        const seq = parseInt(match[2]);
        const currentYear = new Date().getFullYear().toString();
        const nextSeq = year === currentYear ? seq + 1 : 1;
        newInvoiceNumber = `INV-${currentYear}-${String(nextSeq).padStart(4, "0")}`;
      } else {
        newInvoiceNumber = `${lastInvoice.invoiceNumber}-DUP-${Math.floor(100 + Math.random() * 900)}`;
      }
    }

    // Double check uniqueness in case of race conditions
    const collision = await prisma.invoice.findUnique({
      where: { invoiceNumber: newInvoiceNumber },
    });
    if (collision) {
      newInvoiceNumber = `${newInvoiceNumber}-1`;
    }

    // Clone base invoice and nested items
    const duplicated = await prisma.invoice.create({
      data: {
        invoiceNumber: newInvoiceNumber,
        invoiceDate: new Date(), // duplicate dated today
        dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // due in 14 days by default
        clientId: sourceInvoice.clientId,
        projectId: sourceInvoice.projectId,
        status: "DRAFT", // duplicates always reset to draft status
        subtotal: sourceInvoice.subtotal,
        vatRate: sourceInvoice.vatRate,
        vatAmount: sourceInvoice.vatAmount,
        discount: sourceInvoice.discount,
        grandTotal: sourceInvoice.grandTotal,
        amountInWords: sourceInvoice.amountInWords,
        notes: sourceInvoice.notes,
        authorizedBy: sourceInvoice.authorizedBy,
        founderName: sourceInvoice.founderName,
        designation: sourceInvoice.designation,
        signatureUrl: sourceInvoice.signatureUrl,
        paymentStatus: "UNPAID",
        items: {
          create: sourceInvoice.items.map((item) => ({
            serialNumber: item.serialNumber,
            description: item.description,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            amount: item.amount,
          })),
        },
      },
      include: {
        items: true,
      },
    });

    return NextResponse.json({
      success: true,
      invoice: duplicated,
    });
  } catch (error: any) {
    console.error("Failed to duplicate invoice:", error);
    return NextResponse.json({ success: false, message: error.message || "Failed to duplicate invoice" }, { status: 500 });
  }
}
