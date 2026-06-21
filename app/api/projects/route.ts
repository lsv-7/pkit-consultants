import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const projects = await prisma.project.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(projects);
}

export async function POST(req: Request) {
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

    const project = await prisma.project.create({
      data: {
        projectName: body.projectName,
        clientName: body.clientName,
        email: body.email,
        phone: body.phone,
        company: body.company,
        service: body.service,
        description: body.description,
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