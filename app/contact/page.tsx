import { getSettings } from "@/lib/services/settings";
import ContactClient from "./ContactClient";

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