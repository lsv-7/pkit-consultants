import { NextResponse } from "next/server";
import { getTechnologyById, updateTechnology, deleteTechnology } from "@/lib/services/technologies";
import { verifyAdmin } from "@/lib/auth";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const technology = await getTechnologyById(id);
  if (!technology) {
    return NextResponse.json({ message: "Technology not found" }, { status: 404 });
  }
  return NextResponse.json(technology);
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const isAdmin = await verifyAdmin();
  if (!isAdmin) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await req.json();
    const updated = await updateTechnology(id, data);
    return NextResponse.json({ success: true, technology: updated });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to update technology" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const isAdmin = await verifyAdmin();
  if (!isAdmin) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    await deleteTechnology(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to delete technology" }, { status: 500 });
  }
}
