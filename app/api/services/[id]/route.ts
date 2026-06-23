import { NextResponse } from "next/server";
import { getServiceById, updateService, deleteService } from "@/lib/services/services";
import { verifyAdmin } from "@/lib/auth";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const service = await getServiceById(id);
  if (!service) {
    return NextResponse.json({ message: "Service not found" }, { status: 404 });
  }
  return NextResponse.json(service);
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const isAdmin = await verifyAdmin();
  if (!isAdmin) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await req.json();
    const updated = await updateService(id, data);
    return NextResponse.json({ success: true, service: updated });
  } catch (error: any) {
    console.error(error);
    if (error.code === "P2002") {
      return NextResponse.json({ message: "Slug must be unique" }, { status: 400 });
    }
    return NextResponse.json({ message: "Failed to update service" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const isAdmin = await verifyAdmin();
  if (!isAdmin) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    await deleteService(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to delete service" }, { status: 500 });
  }
}
