import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAdmin } from "@/lib/auth";

export async function DELETE(req: Request, { params }: { params: Promise<{ docId: string }> }) {
  const isAdmin = await verifyAdmin();
  if (!isAdmin) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { docId } = await params;

    const document = await prisma.document.findUnique({
      where: { id: docId },
    });

    if (!document) {
      return NextResponse.json({ success: false, message: "Document not found" }, { status: 404 });
    }

    await prisma.document.delete({
      where: { id: docId },
    });

    // Log notification
    await prisma.notification.create({
      data: {
        type: "CMS_UPDATED",
        title: "Document Deleted",
        message: `Document "${document.title}" was removed.`,
        read: false,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Failed to delete document" }, { status: 500 });
  }
}
