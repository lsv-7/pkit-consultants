import { NextResponse } from "next/server";
import { getIndustryById, updateIndustry, deleteIndustry } from "@/lib/services/industries";
import { verifyAdmin } from "@/lib/auth";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const industry = await getIndustryById(id);
  if (!industry) {
    return NextResponse.json({ message: "Industry not found" }, { status: 404 });
  }
  return NextResponse.json(industry);
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const isAdmin = await verifyAdmin();
  if (!isAdmin) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await req.json();
    const updated = await updateIndustry(id, data);
    return NextResponse.json({ success: true, industry: updated });
  } catch (error: any) {
    console.error(error);
    if (error.code === "P2002") {
      return NextResponse.json({ message: "Slug must be unique" }, { status: 400 });
    }
    return NextResponse.json({ message: "Failed to update industry" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const isAdmin = await verifyAdmin();
  if (!isAdmin) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    await deleteIndustry(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to delete industry" }, { status: 500 });
  }
}
