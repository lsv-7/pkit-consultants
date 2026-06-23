import { getSettings } from "@/lib/services/settings";
import { getHomepageSection } from "@/lib/services/website";
import { getServices } from "@/lib/services/services";
import { getIndustries } from "@/lib/services/industries";
import { getFAQs } from "@/lib/services/faq";
import { getAboutContent } from "@/lib/content";
import HomeClient from "./HomeClient";

export default async function Home() {
  const settings = await getSettings();
  const homepageData = await getHomepageSection();
  const dbServices = await getServices(true);
  const dbIndustries = await getIndustries(true);
  const dbFaqs = await getFAQs(true);
  const aboutContent = getAboutContent();

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

  const services = dbServices.map(s => ({
    title: s.title,
    desc: s.shortDescription,
    iconName: s.icon,
    features: s.features,
    technologies: s.technologies,
  }));

  const industries = dbIndustries.map(ind => ({
    title: ind.name,
    desc: ind.description,
    iconName: ind.icon,
  }));

  const faqs = dbFaqs.map(f => ({
    id: f.id,
    question: f.question,
    answer: f.answer,
    category: f.category,
  }));

  return (
    <HomeClient
      companyInfo={companyInfo}
      homepageData={homepageData}
      services={services}
      industries={industries}
      faqs={faqs}
      aboutContent={aboutContent}
    />
  );
}