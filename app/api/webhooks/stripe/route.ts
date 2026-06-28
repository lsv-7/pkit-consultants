import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * Stripe webhook endpoint — structure ready for live integration.
 * Set STRIPE_WEBHOOK_SECRET and STRIPE_SECRET_KEY before enabling live payments.
 */
export async function POST(req: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    return NextResponse.json(
      { success: false, message: "Stripe webhook is not configured" },
      { status: 503 }
    );
  }

  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json(
      { success: false, message: "Missing Stripe signature" },
      { status: 400 }
    );
  }

  const body = await req.text();

  try {
    // When Stripe goes live:
    // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    // const event = stripe.webhooks.constructEvent(body, signature, webhookSecret);

    // switch (event.type) {
    //   case "checkout.session.completed":
    //   case "payment_intent.succeeded": {
    //     const invoiceId = event.data.object.metadata?.invoiceId;
    //     await prisma.$transaction(async (tx) => {
    //       await tx.payment.create({ data: { ... } });
    //       await tx.invoice.update({ where: { id: invoiceId }, data: { paymentStatus: "PAID", status: "PAID" } });
    //     });
    //     break;
    //   }
    //   case "payment_intent.payment_failed":
    //     break;
    // }

    void body;
    void prisma;

    return NextResponse.json({ received: true });
  } catch {
    return NextResponse.json(
      { success: false, message: "Webhook verification failed" },
      { status: 400 }
    );
  }
}
