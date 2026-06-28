import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAdmin } from "@/lib/auth";
import { MailQueue } from "@/lib/communication/queue";

export async function GET(req: Request) {
  const isAdmin = await verifyAdmin();
  if (!isAdmin) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "ALL";
    const type = searchParams.get("type") || "ALL";

    const where: any = {};

    if (search) {
      where.OR = [
        { recipient: { contains: search, mode: "insensitive" } },
        { subject: { contains: search, mode: "insensitive" } },
      ];
    }

    if (status !== "ALL") {
      where.status = status;
    }

    if (type !== "ALL") {
      where.type = type;
    }

    const logs = await prisma.sentEmail.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: 100,
    });

    return NextResponse.json({ success: true, logs });
  } catch (error) {
    console.error("[GET Communications Log Error]:", error);
    return NextResponse.json({ success: false, message: "Failed to fetch logs" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const isAdmin = await verifyAdmin();
  if (!isAdmin) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { emailLogId } = body;

    if (!emailLogId) {
      return NextResponse.json({ success: false, message: "Email Log ID is required" }, { status: 400 });
    }

    const log = await prisma.sentEmail.findUnique({
      where: { id: emailLogId },
    });

    if (!log) {
      return NextResponse.json({ success: false, message: "Email log not found" }, { status: 404 });
    }

    // Set state back to RETRYING
    const updatedLog = await prisma.sentEmail.update({
      where: { id: log.id },
      data: {
        status: "RETRYING",
        errorMessage: null,
      },
    });

    let attachments: any[] = [];
    
    // If it is an invoice, dynamically regenerate the PDF attachment
    if (log.invoiceId && log.type === "INVOICE") {
      try {
        const hostHeader = req.headers.get("host") || "localhost:3000";
        const protocol = req.headers.get("x-forwarded-proto") || "http";
        const pdfUrl = `${protocol}://${hostHeader}/api/admin/invoices/${log.invoiceId}/pdf`;
        const cookieHeader = req.headers.get("cookie") || "";
        
        const pdfRes = await fetch(pdfUrl, {
          headers: {
            cookie: cookieHeader,
          },
        });
        if (pdfRes.ok) {
          const arrayBuffer = await pdfRes.arrayBuffer();
          attachments = [
            {
              filename: `Invoice-${log.invoiceId.substring(0, 8)}.pdf`,
              content: Buffer.from(arrayBuffer),
              contentType: "application/pdf",
            }
          ];
        }
      } catch (pdfErr) {
        console.error("[Communications Retry] Failed to regenerate PDF attachment:", pdfErr);
      }
    }

    await MailQueue.add({
      options: {
        to: log.recipient,
        subject: log.subject,
        html: log.body,
        attachments,
      },
      emailLogId: log.id,
      onComplete: async (success, errorMsg) => {
        await prisma.sentEmail.update({
          where: { id: log.id },
          data: {
            status: success ? "SENT" : "FAILED",
            errorMessage: errorMsg || null,
          },
        });
      },
    });

    return NextResponse.json({ success: true, log: updatedLog });
  } catch (error) {
    console.error("[Retry Email Log Error]:", error);
    return NextResponse.json({ success: false, message: "Failed to retry dispatch" }, { status: 500 });
  }
}
