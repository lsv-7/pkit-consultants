import { prisma } from "@/lib/prisma";

export interface SettingsData {
  companyName: string;
  tagline: string;
  email: string;
  phone: string;
  whatsapp: string;
  officeAddress: string;
  googleMapsLink: string;
  workingHours: string;
  logoUrl: string;
  faviconUrl: string;
  linkedin?: string | null;
  instagram?: string | null;
  facebook?: string | null;
  twitter?: string | null;
  youtube?: string | null;
  defaultSeoTitle: string;
  defaultSeoDescription: string;
}

export const DEFAULT_SETTINGS: SettingsData = {
  companyName: "PKIT Consultants",
  tagline: "Technology Consulting",
  email: "pkitconsultants@gmail.com",
  phone: "+971 50 116 4565",
  whatsapp: "https://wa.me/971501164565",
  officeAddress: "Dubai, United Arab Emirates",
  googleMapsLink: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115494.39860649718!2d55.19799863481267!3d25.194849313063546!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43348a6d489b%3A0x2f6cf9cf0c9a44c!2sDubai!5e0!3m2!1sen!2sae!4v1700000000000",
  workingHours: "Monday - Friday: 9:00 AM - 6:00 PM (GST)",
  logoUrl: "/logo.png",
  faviconUrl: "/favicon.ico",
  linkedin: "",
  instagram: "",
  facebook: "",
  twitter: "",
  youtube: "",
  defaultSeoTitle: "PKIT Consultants — Enterprise Software & AI Solutions in Dubai",
  defaultSeoDescription: "Professional technology consultancy in Dubai. AI solutions, custom software engineering, cloud architectures, and dedicated IT support.",
};

export async function getSettings(): Promise<SettingsData> {
  try {
    const settings = await prisma.websiteSettings.findUnique({
      where: { id: "default" },
    });
    if (!settings) return DEFAULT_SETTINGS;
    return settings;
  } catch (error) {
    console.error("Failed to fetch settings from DB, using fallback", error);
    return DEFAULT_SETTINGS;
  }
}

export async function updateSettings(data: Partial<SettingsData>) {
  return prisma.websiteSettings.upsert({
    where: { id: "default" },
    create: {
      id: "default",
      companyName: data.companyName ?? DEFAULT_SETTINGS.companyName,
      tagline: data.tagline ?? DEFAULT_SETTINGS.tagline,
      email: data.email ?? DEFAULT_SETTINGS.email,
      phone: data.phone ?? DEFAULT_SETTINGS.phone,
      whatsapp: data.whatsapp ?? DEFAULT_SETTINGS.whatsapp,
      officeAddress: data.officeAddress ?? DEFAULT_SETTINGS.officeAddress,
      googleMapsLink: data.googleMapsLink ?? DEFAULT_SETTINGS.googleMapsLink,
      workingHours: data.workingHours ?? DEFAULT_SETTINGS.workingHours,
      logoUrl: data.logoUrl ?? DEFAULT_SETTINGS.logoUrl,
      faviconUrl: data.faviconUrl ?? DEFAULT_SETTINGS.faviconUrl,
      linkedin: data.linkedin ?? "",
      instagram: data.instagram ?? "",
      facebook: data.facebook ?? "",
      twitter: data.twitter ?? "",
      youtube: data.youtube ?? "",
      defaultSeoTitle: data.defaultSeoTitle ?? DEFAULT_SETTINGS.defaultSeoTitle,
      defaultSeoDescription: data.defaultSeoDescription ?? DEFAULT_SETTINGS.defaultSeoDescription,
    },
    update: data,
  });
}
