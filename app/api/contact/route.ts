import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const lead = await prisma.lead.create({
      data: {
        fullName: body.fullName,
        email: body.email,
        phone: body.phone,
        company: body.company,
        service: body.service,
        budget: body.budget,
        contactMethod: body.contactMethod,
        timeline: body.timeline,
        projectDescription: body.projectDescription,
      },
    });

    return NextResponse.json({
      success: true,
      lead,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}