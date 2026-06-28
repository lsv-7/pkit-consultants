import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAdmin } from "@/lib/auth";
import { CommunicationService } from "@/lib/communication/communication";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const isAdmin = await verifyAdmin();
  if (!isAdmin) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await req.json();
    const { projectName, status, progress } = body;

    if (!projectName || !status || progress === undefined) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
    }

    const numericProgress = parseInt(progress);
    if (isNaN(numericProgress) || numericProgress < 0 || numericProgress > 100) {
      return NextResponse.json({ success: false, message: "Progress must be between 0 and 100" }, { status: 400 });
    }

    // Fetch original project to detect status transitions
    const originalProject = await prisma.project.findUnique({
      where: { id },
      include: {
        client: {
          include: { clientUsers: true },
        },
      },
    });

    if (!originalProject) {
      return NextResponse.json({ success: false, message: "Project not found" }, { status: 404 });
    }

    const statusChanged = originalProject.status !== status;
    const oldStatus = originalProject.status;

    // Update project details
    const updatedProject = await prisma.project.update({
      where: { id },
      data: {
        projectName,
        status,
        progress: numericProgress,
      },
    });

    // If status changed, notify all active client portal users
    if (statusChanged && originalProject.client && originalProject.client.clientUsers.length > 0) {
      for (const clientUser of originalProject.client.clientUsers) {
        if (clientUser.active) {
          if (status === "COMPLETED") {
            await CommunicationService.sendProjectCompletion(
              id,
              projectName,
              clientUser.fullName,
              clientUser.email,
              originalProject.clientId || undefined
            );
          } else {
            await CommunicationService.sendProjectStatusUpdate(
              id,
              projectName,
              oldStatus,
              status,
              numericProgress,
              clientUser.fullName,
              clientUser.email,
              originalProject.clientId || undefined
            );
          }
        }
      }
    }

    return NextResponse.json({ success: true, project: updatedProject });
  } catch (error) {
    console.error("[PUT Project Error]:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
