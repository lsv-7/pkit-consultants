import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "";

    const leads = await prisma.lead.findMany({
      where: {
        AND: [
          status
            ? {
                status,
              }
            : {},

          search
            ? {
                OR: [
                  {
                    fullName: {
                      contains: search,
                      mode: "insensitive",
                    },
                  },
                  {
                    email: {
                      contains: search,
                      mode: "insensitive",
                    },
                  },
                  {
                    company: {
                      contains: search,
                      mode: "insensitive",
                    },
                  },
                  {
                    phone: {
                      contains: search,
                    },
                  },
                ],
              }
            : {},
        ],
      },

      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(leads);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to fetch leads",
      },
      {
        status: 500,
      }
    );
  }
}