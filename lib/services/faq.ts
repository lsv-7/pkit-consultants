import { prisma } from "@/lib/prisma";

export interface FAQData {
  id?: string;
  question: string;
  answer: string;
  category: string;
  displayOrder: number;
  active: boolean;
}

export async function getFAQs(activeOnly = false): Promise<FAQData[]> {
  try {
    const faqs = await prisma.fAQ.findMany({
      where: activeOnly ? { active: true } : {},
      orderBy: { displayOrder: "asc" },
    });
    return faqs;
  } catch (error) {
    console.error("Failed to fetch FAQs from DB", error);
    return [];
  }
}

export async function getFAQById(id: string): Promise<FAQData | null> {
  return prisma.fAQ.findUnique({
    where: { id },
  });
}

export async function createFAQ(data: Omit<FAQData, "id">) {
  return prisma.fAQ.create({
    data,
  });
}

export async function updateFAQ(id: string, data: Partial<FAQData>) {
  return prisma.fAQ.update({
    where: { id },
    data,
  });
}

export async function deleteFAQ(id: string) {
  return prisma.fAQ.delete({
    where: { id },
  });
}
