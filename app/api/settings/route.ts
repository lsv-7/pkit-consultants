import { NextResponse } from "next/server";
import { getSettings, updateSettings } from "@/lib/services/settings";
import { verifyAdmin } from "@/lib/auth";

export async function GET() {
  const settings = await getSettings();
  return NextResponse.json(settings);
}

export async function PATCH(req: Request) {
  const isAdmin = await verifyAdmin();
  if (!isAdmin) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await req.json();
    const updated = await updateSettings(data);
    return NextResponse.json({ success: true, settings: updated });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to update settings" }, { status: 500 });
  }
}
