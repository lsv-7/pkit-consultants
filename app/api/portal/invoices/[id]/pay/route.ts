import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyClient } from "@/lib/auth";

type Props = {
  params: Promise<{ id: string }>;
};

export async function POST(req: Request, { params }: Props) {
  const clientSession = await verifyClient();
  if (!clientSession) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const invoice = await prisma.invoice.findUnique({
      where: { id },
      include: { payments: true },
    });

    if (!invoice) {
      return NextResponse.json({ success: false, message: "Invoice not found" }, { status: 404 });
    }

    // Verify ownership
    if (invoice.clientId !== clientSession.clientId) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    if (invoice.paymentStatus === "PAID") {
      return NextResponse.json({ success: false, message: "Invoice is already paid" }, { status: 400 });
    }

    const stripeTxId = "ch_" + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    // Create Stripe Mock Payment
    const payment = await prisma.$transaction(async (tx) => {
      const payRecord = await tx.payment.create({
        data: {
          invoiceId: id,
          amount: invoice.grandTotal,
          paymentDate: new Date(),
          paymentMethod: "STRIPE",
          transactionId: stripeTxId,
          paymentReference: `Stripe Mock Charge for ${invoice.invoiceNumber}`,
        },
      });

      await tx.invoice.update({
        where: { id },
        data: {
          status: "PAID",
          paymentStatus: "PAID",
        },
      });

      return payRecord;
    });

    return NextResponse.json({
      success: true,
      message: "Stripe payment simulation successful",
      payment,
    });
  } catch (error: any) {
    console.error("Stripe payment simulation error:", error);
    return NextResponse.json({ success: false, message: error.message || "Failed to process payment" }, { status: 500 });
  }
}
