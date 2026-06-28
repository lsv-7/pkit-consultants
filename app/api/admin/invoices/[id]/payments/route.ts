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
    const body = await req.json();
    const {
      amount,
      paymentDate = new Date(),
      paymentMethod,
      transactionId,
      paymentReference,
    } = body;

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0 || !paymentMethod) {
      return NextResponse.json({ success: false, message: "Invalid payment amount or missing payment method" }, { status: 400 });
    }

    const invoice = await prisma.invoice.findUnique({
      where: { id },
      include: { payments: true },
    });

    if (!invoice) {
      return NextResponse.json({ success: false, message: "Invoice not found" }, { status: 404 });
    }

    // Record the payment
    const payment = await prisma.payment.create({
      data: {
        invoiceId: id,
        amount: parsedAmount,
        paymentDate: new Date(paymentDate),
        paymentMethod,
        transactionId: transactionId || null,
        paymentReference: paymentReference || null,
      },
    });

    // Recalculate invoice status and payment status
    const allPayments = await prisma.payment.findMany({
      where: { invoiceId: id },
    });
    const totalPaid = allPayments.reduce((sum, p) => sum + p.amount, 0);

    let paymentStatus = "UNPAID";
    let status = invoice.status;

    if (totalPaid >= invoice.grandTotal) {
      paymentStatus = "PAID";
      status = "PAID";
    } else if (totalPaid > 0) {
      paymentStatus = "PARTIALLY_PAID";
    }

    const updatedInvoice = await prisma.invoice.update({
      where: { id },
      data: {
        paymentStatus,
        status,
      },
      include: {
        payments: true,
        items: true,
      },
    });

    return NextResponse.json({
      success: true,
      invoice: updatedInvoice,
      payment,
    });
  } catch (error: any) {
    console.error("Failed to record payment:", error);
    return NextResponse.json({ success: false, message: error.message || "Failed to record payment" }, { status: 500 });
  }
}
