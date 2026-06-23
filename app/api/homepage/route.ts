import { NextResponse } from "next/server";
import { getHomepageSection, updateHomepageSection } from "@/lib/services/website";
import { verifyAdmin } from "@/lib/auth";

export async function GET() {
  const homepage = await getHomepageSection();
  return NextResponse.json(homepage);
}

export async function PATCH(req: Request) {
  const isAdmin = await verifyAdmin();
  if (!isAdmin) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await req.json();
    const updated = await updateHomepageSection(data);
    return NextResponse.json({ success: true, homepage: updated });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to update homepage section" }, { status: 500 });
  }
}
