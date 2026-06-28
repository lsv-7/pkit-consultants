import type { Metadata } from "next";
import { getSettings } from "@/lib/services/settings";
import { COMPANY } from "@/lib/company";
import ContactClient from "./ContactClient";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  return {
    title: "Book a Consultation | " + settings.companyName,
    description: "Connect with our senior engineering team to scope your software, mobile application, database scaling, or generative AI requirements.",
    alternates: {
      canonical: `${COMPANY.website}/contact`,
    },
  };
}

export default async function Contact() {
  const settings = await getSettings();
  
  const companyInfo = {
    name: settings.companyName,
    tagline: settings.tagline,
    email: settings.email,
    phone: settings.phone,
    whatsappLink: settings.whatsapp,
    address: settings.officeAddress,
    hours: settings.workingHours,
    mapEmbedUrl: settings.googleMapsLink,
  };

  return <ContactClient companyInfo={companyInfo} />;
}