import { prisma } from "@/lib/prisma";
import { COMPANY, getAddressLine } from "@/lib/company";

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
  ceoName: string;
  ceoDesignation: string;
  ceoSignatureUrl: string;
}

export const DEFAULT_SETTINGS: SettingsData = {
  companyName: COMPANY.name,
  tagline: COMPANY.tagline,
  email: COMPANY.email,
  phone: COMPANY.phone,
  whatsapp: COMPANY.whatsappUrl,
  officeAddress: getAddressLine(),
  googleMapsLink: COMPANY.googleMapsEmbed,
  workingHours: COMPANY.workingHours,
  logoUrl: COMPANY.logoUrl,
  faviconUrl: COMPANY.faviconUrl,
  linkedin: "",
  instagram: "",
  facebook: "",
  twitter: "",
  youtube: "",
  defaultSeoTitle: COMPANY.defaultSeoTitle,
  defaultSeoDescription: COMPANY.defaultSeoDescription,
  ceoName: COMPANY.ceoName,
  ceoDesignation: COMPANY.ceoDesignation,
  ceoSignatureUrl: "",
};

export async function getSettings(): Promise<SettingsData> {
  try {
    const settings = await prisma.websiteSettings.findUnique({
      where: { id: "default" },
    });
    if (!settings) return DEFAULT_SETTINGS;
    return settings as unknown as SettingsData;
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
      ceoName: data.ceoName ?? DEFAULT_SETTINGS.ceoName,
      ceoDesignation: data.ceoDesignation ?? DEFAULT_SETTINGS.ceoDesignation,
      ceoSignatureUrl: data.ceoSignatureUrl ?? DEFAULT_SETTINGS.ceoSignatureUrl,
    },
    update: data,
  });
}
