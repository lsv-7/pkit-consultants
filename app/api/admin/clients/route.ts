import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAdmin } from "@/lib/auth";

export async function GET() {
  const isAdmin = await verifyAdmin();
  if (!isAdmin) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const clients = await prisma.client.findMany({
      include: {
        projects: {
          select: {
            id: true,
            projectName: true,
            status: true,
            progress: true,
          },
        },
        clientUsers: {
          select: {
            id: true,
            email: true,
            active: true,
            lastLogin: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      success: true,
      clients,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Failed to fetch clients" }, { status: 500 });
  }
}
