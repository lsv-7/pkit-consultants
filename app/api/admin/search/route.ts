import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAdmin } from "@/lib/auth";

export async function GET(req: Request) {
  const isAdmin = await verifyAdmin();
  if (!isAdmin) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q") || "";

  if (!query || !query.trim()) {
    return NextResponse.json({ success: true, leads: [], clients: [], projects: [] });
  }

  try {
    // 1. Search Leads
    // Fields: Name (fullName), Email, Phone, Company
    const leads = await prisma.lead.findMany({
      where: {
        OR: [
          { fullName: { contains: query, mode: "insensitive" } },
          { email: { contains: query, mode: "insensitive" } },
          { phone: { contains: query, mode: "insensitive" } },
          { company: { contains: query, mode: "insensitive" } },
        ],
      },
      take: 10,
      select: {
        id: true,
        fullName: true,
        company: true,
        email: true,
      },
    });

    // 2. Search Clients
    // Fields: contactPerson (Name), Email, Company
    const clients = await prisma.client.findMany({
      where: {
        OR: [
          { contactPerson: { contains: query, mode: "insensitive" } },
          { email: { contains: query, mode: "insensitive" } },
          { company: { contains: query, mode: "insensitive" } },
        ],
      },
      take: 10,
      select: {
        id: true,
        contactPerson: true,
        company: true,
        email: true,
      },
    });

    // 3. Search Projects
    // Fields: projectName, clientName, status
    const projects = await prisma.project.findMany({
      where: {
        OR: [
          { projectName: { contains: query, mode: "insensitive" } },
          { clientName: { contains: query, mode: "insensitive" } },
          { status: { contains: query, mode: "insensitive" } },
        ],
      },
      take: 10,
      select: {
        id: true,
        projectName: true,
        clientName: true,
        status: true,
      },
    });

    return NextResponse.json({
      success: true,
      leads,
      clients,
      projects,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Search failed" }, { status: 500 });
  }
}
