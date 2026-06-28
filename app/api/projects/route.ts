import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAdmin } from "@/lib/auth";

export async function GET() {
  const isAdmin = await verifyAdmin();
  if (!isAdmin) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  const projects = await prisma.project.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(projects);
}

export async function POST(req: Request) {
  const isAdmin = await verifyAdmin();
  if (!isAdmin) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const lead = await prisma.lead.findUnique({
  where: {
    id: body.leadId,
  },
});

if (!lead) {
  return NextResponse.json(
    {
      success: false,
      message: "Lead not found.",
    },
    {
      status: 404,
    }
  );
}

if (lead.converted) {
  return NextResponse.json(
    {
      success: false,
      message: "This lead has already been converted into a project.",
    },
    {
      status: 400,
    }
  );
}

    const lowercasedEmail = body.email.trim().toLowerCase();

    // Find or create Client (case-insensitive)
    let client = await prisma.client.findFirst({
      where: {
        email: {
          equals: lowercasedEmail,
          mode: "insensitive"
        }
      },
    });

    if (!client) {
      client = await prisma.client.create({
        data: {
          company: body.company || "Individual",
          contactPerson: body.clientName,
          email: lowercasedEmail,
          phone: body.phone,
        },
      });
    }

    const project = await prisma.project.create({
      data: {
        projectName: body.projectName,
        clientName: body.clientName,
        email: lowercasedEmail,
        phone: body.phone,
        company: body.company,
        service: body.service,
        description: body.description,
        clientId: client.id,
      },
    });

    // Mark the lead as converted
    await prisma.lead.update({
      where: {
        id: body.leadId,
      },
      data: {
        converted: true,
        projectId: project.id,
        status: "COMPLETED",
      },
    });

    // Create Project Notification
    await prisma.notification.create({
      data: {
        type: "PROJECT_CREATED",
        title: "Active Project Initialized",
        message: `Project '${project.projectName}' was successfully created for ${project.clientName}.`,
        read: false,
      },
    });

    return NextResponse.json({
      success: true,
      project,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create project",
      },
      {
        status: 500,
      }
    );
  }
}