import { prisma } from "@/lib/prisma";

export interface TechnologyData {
  id?: string;
  name: string;
  logo?: string | null;
  category: string;
  displayOrder: number;
}

export async function getTechnologies(): Promise<TechnologyData[]> {
  try {
    const technologies = await prisma.technology.findMany({
      orderBy: { displayOrder: "asc" },
    });
    return technologies;
  } catch (error) {
    console.error("Failed to fetch technologies from DB", error);
    return [];
  }
}

export async function getTechnologyById(id: string): Promise<TechnologyData | null> {
  return prisma.technology.findUnique({
    where: { id },
  });
}

export async function createTechnology(data: Omit<TechnologyData, "id">) {
  return prisma.technology.create({
    data,
  });
}

export async function updateTechnology(id: string, data: Partial<TechnologyData>) {
  return prisma.technology.update({
    where: { id },
    data,
  });
}

export async function deleteTechnology(id: string) {
  return prisma.technology.delete({
    where: { id },
  });
}
