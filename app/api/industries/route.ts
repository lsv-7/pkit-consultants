import { NextResponse } from "next/server";
import { getIndustries, createIndustry } from "@/lib/services/industries";
import { verifyAdmin } from "@/lib/auth";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const activeOnly = searchParams.get("active") === "true";
  const industries = await getIndustries(activeOnly);
  return NextResponse.json(industries);
}

export async function POST(req: Request) {
  const isAdmin = await verifyAdmin();
  if (!isAdmin) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await req.json();
    if (!data.name || !data.slug) {
      return NextResponse.json({ message: "Name and slug are required" }, { status: 400 });
    }
    const created = await createIndustry(data);
    return NextResponse.json({ success: true, industry: created });
  } catch (error: any) {
    console.error(error);
    if (error.code === "P2002") {
      return NextResponse.json({ message: "Slug must be unique" }, { status: 400 });
    }
    return NextResponse.json({ message: "Failed to create industry" }, { status: 500 });
  }
}
