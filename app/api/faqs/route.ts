import { NextResponse } from "next/server";
import { getFAQs, createFAQ } from "@/lib/services/faq";
import { verifyAdmin } from "@/lib/auth";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const activeOnly = searchParams.get("active") === "true";
  const faqs = await getFAQs(activeOnly);
  return NextResponse.json(faqs);
}

export async function POST(req: Request) {
  const isAdmin = await verifyAdmin();
  if (!isAdmin) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await req.json();
    if (!data.question || !data.answer) {
      return NextResponse.json({ message: "Question and answer are required" }, { status: 400 });
    }
    const created = await createFAQ(data);
    return NextResponse.json({ success: true, faq: created });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to create FAQ" }, { status: 500 });
  }
}
