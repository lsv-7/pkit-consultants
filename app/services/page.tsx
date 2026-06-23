import { getServices } from "@/lib/services/services";
import { getSettings } from "@/lib/services/settings";
import ServicesClient from "./ServicesClient";

export const revalidate = 3600; // Cache for 1 hour

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
    tagline: settings.tagline || "Technology Consulting",
    whatsappLink: settings.whatsapp || "https://wa.me/971501164565",
  };

  return <ServicesClient services={servicesData} companyInfo={companyInfo} />;
}