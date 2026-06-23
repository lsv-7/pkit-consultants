import { prisma } from "@/lib/prisma";

export interface ServiceData {
  id?: string;
  title: string;
  slug: string;
  shortDescription: string;
  longDescription: string;
  icon: string;
  displayOrder: number;
  active: boolean;
  features: string[];
  technologies: string[];
}

export async function getServices(activeOnly = false): Promise<ServiceData[]> {
  try {
    const services = await prisma.service.findMany({
      where: activeOnly ? { active: true } : {},
      orderBy: { displayOrder: "asc" },
    });
    return services;
  } catch (error) {
    console.error("Failed to fetch services from DB", error);
    return [];
  }
}

export async function getServiceById(id: string): Promise<ServiceData | null> {
  return prisma.service.findUnique({
    where: { id },
  });
}

export async function createService(data: Omit<ServiceData, "id">) {
  return prisma.service.create({
    data,
  });
}

export async function updateService(id: string, data: Partial<ServiceData>) {
  return prisma.service.update({
    where: { id },
    data,
  });
}

export async function deleteService(id: string) {
  return prisma.service.delete({
    where: { id },
  });
}
