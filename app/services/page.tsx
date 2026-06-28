import type { Metadata } from "next";
import { getServices } from "@/lib/services/services";
import { getSettings } from "@/lib/services/settings";
import { COMPANY } from "@/lib/company";
import ServicesClient from "./ServicesClient";

export const revalidate = 3600; // Cache for 1 hour

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  return {
    title: "Our Services | " + settings.companyName,
    description: "Explore " + settings.companyName + "'s core competencies: custom AI integrations, custom software platforms, web systems, mobile solutions, cloud optimization, and zero-trust security.",
    alternates: {
      canonical: `${COMPANY.website}/services`,
    },
  };
}

export default async function ServicesPage() {
  const dbServices = await getServices(true);
  const settings = await getSettings();

  // Map database entries to match the client component specifications
  const servicesData = dbServices.map((s) => ({
    title: s.title,
    slug: s.slug,
    shortDescription: s.shortDescription,
    longDescription: s.longDescription,
    icon: s.icon,
    features: s.features,
    technologies: s.technologies,
  }));

  const companyInfo = {
    name: settings.companyName || "PKIT Consultants",
    tagline: settings.tagline || "Technology. Consulting. Solutions.",
    whatsappLink: settings.whatsapp || COMPANY.whatsappUrl,
  };

  return <ServicesClient services={servicesData} companyInfo={companyInfo} />;
}