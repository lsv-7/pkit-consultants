import { NextResponse } from "next/server";
import { getTechnologies, createTechnology } from "@/lib/services/technologies";
import { verifyAdmin } from "@/lib/auth";

export async function GET() {
  const technologies = await getTechnologies();
  return NextResponse.json(technologies);
}

export async function POST(req: Request) {
  const isAdmin = await verifyAdmin();
  if (!isAdmin) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await req.json();
    if (!data.name || !data.category) {
      return NextResponse.json({ message: "Name and category are required" }, { status: 400 });
    }
    const created = await createTechnology(data);
    return NextResponse.json({ success: true, technology: created });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to create technology" }, { status: 500 });
  }
}
