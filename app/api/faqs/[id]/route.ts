import { NextResponse } from "next/server";
import { getFAQById, updateFAQ, deleteFAQ } from "@/lib/services/faq";
import { verifyAdmin } from "@/lib/auth";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const faq = await getFAQById(id);
  if (!faq) {
    return NextResponse.json({ message: "FAQ not found" }, { status: 404 });
  }
  return NextResponse.json(faq);
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const isAdmin = await verifyAdmin();
  if (!isAdmin) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await req.json();
    const updated = await updateFAQ(id, data);
    return NextResponse.json({ success: true, faq: updated });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to update FAQ" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const isAdmin = await verifyAdmin();
  if (!isAdmin) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    await deleteFAQ(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to delete FAQ" }, { status: 500 });
  }
}
