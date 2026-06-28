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
    const logs = await prisma.sentEmail.findMany({
      where: {
        clientId: clientSession.clientId,
        type: { not: "ADMIN_NOTIFICATION" },
        status: "SENT",
      },
      select: {
        id: true,
        subject: true,
        body: true,
        type: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, logs });
  } catch (error) {
    console.error("[GET Client Portal Communications Error]:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
