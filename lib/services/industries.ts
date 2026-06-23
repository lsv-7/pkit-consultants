import { prisma } from "@/lib/prisma";

export interface IndustryData {
  id?: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  displayOrder: number;
  active: boolean;
  solutions: string[];
}

export async function getIndustries(activeOnly = false): Promise<IndustryData[]> {
  try {
    const industries = await prisma.industry.findMany({
      where: activeOnly ? { active: true } : {},
      orderBy: { displayOrder: "asc" },
    });
    return industries;
  } catch (error) {
    console.error("Failed to fetch industries from DB", error);
    return [];
  }
}

export async function getIndustryById(id: string): Promise<IndustryData | null> {
  return prisma.industry.findUnique({
    where: { id },
  });
}

export async function createIndustry(data: Omit<IndustryData, "id">) {
  return prisma.industry.create({
    data,
  });
}

export async function updateIndustry(id: string, data: Partial<IndustryData>) {
  return prisma.industry.update({
    where: { id },
    data,
  });
}

export async function deleteIndustry(id: string) {
  return prisma.industry.delete({
    where: { id },
  });
}
