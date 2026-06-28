import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyClient } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const clientSession = await verifyClient();
  if (!clientSession) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const invoices = await prisma.invoice.findMany({
      where: {
        clientId: clientSession.clientId,
      },
      include: {
        project: {
          select: {
            id: true,
            projectName: true,
          },
        },
        items: {
          orderBy: {
            serialNumber: "asc",
          },
        },
        payments: {
          orderBy: {
            paymentDate: "desc",
          },
        },
      },
      orderBy: {
        invoiceDate: "desc",
      },
    });

    return NextResponse.json({
      success: true,
      invoices,
    });
  } catch (error) {
    console.error("Failed to fetch client invoices:", error);
    return NextResponse.json({ success: false, message: "Failed to load invoices" }, { status: 500 });
  }
}
