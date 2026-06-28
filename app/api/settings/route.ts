import { NextResponse } from "next/server";
import { getSettings, updateSettings } from "@/lib/services/settings";
import { verifyAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

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

    // Create CMS Notification
    await prisma.notification.create({
      data: {
        type: "CMS_UPDATED",
        title: "Global Settings Saved",
        message: "Company contact parameters or SEO config updated.",
        read: false,
      },
    });

    return NextResponse.json({ success: true, settings: updated });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to update settings" }, { status: 500 });
  }
}
