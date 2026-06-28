import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAdmin } from "@/lib/auth";

// GET: Retrieve documents for client
export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const isAdmin = await verifyAdmin();
  if (!isAdmin) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;

    const documents = await prisma.document.findMany({
      where: { clientId: id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, documents });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Failed to fetch documents" }, { status: 500 });
  }
}

// POST: Add document for client
export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const isAdmin = await verifyAdmin();
  if (!isAdmin) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await req.json();
    const { title, fileUrl, fileSize, category } = body;

    if (!title || !fileUrl || !fileSize || !category) {
      return NextResponse.json({ success: false, message: "All fields are required" }, { status: 400 });
    }

    const document = await prisma.document.create({
      data: {
        title,
        fileUrl,
        fileSize,
        category,
        clientId: id,
      },
    });

    // Log notification
    await prisma.notification.create({
      data: {
        type: "CMS_UPDATED",
        title: "Document Uploaded",
        message: `New document "${title}" (${category}) uploaded for client.`,
        read: false,
      },
    });

    return NextResponse.json({ success: true, document });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Failed to upload document" }, { status: 500 });
  }
}
