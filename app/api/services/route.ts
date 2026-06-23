import { NextResponse } from "next/server";
import { getServices, createService } from "@/lib/services/services";
import { verifyAdmin } from "@/lib/auth";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const activeOnly = searchParams.get("active") === "true";
  const services = await getServices(activeOnly);
  return NextResponse.json(services);
}

export async function POST(req: Request) {
  const isAdmin = await verifyAdmin();
  if (!isAdmin) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await req.json();
    if (!data.title || !data.slug) {
      return NextResponse.json({ message: "Title and slug are required" }, { status: 400 });
    }
    const created = await createService(data);
    return NextResponse.json({ success: true, service: created });
  } catch (error: any) {
    console.error(error);
    if (error.code === "P2002") {
      return NextResponse.json({ message: "Slug must be unique" }, { status: 400 });
    }
    return NextResponse.json({ message: "Failed to create service" }, { status: 500 });
  }
}
