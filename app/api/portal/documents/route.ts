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
    const documents = await prisma.document.findMany({
      where: { clientId: clientSession.clientId },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      success: true,
      documents,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
