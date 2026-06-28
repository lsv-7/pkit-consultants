import { MetadataRoute } from "next";
import { getServices } from "@/lib/services/services";
import { getIndustries } from "@/lib/services/industries";
import { COMPANY } from "@/lib/company";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = COMPANY.website;

  // Fetch dynamic listings from the database
  const services = await getServices(true);
  const industries = await getIndustries(true);

  // Static routes
  const staticRoutes = ["", "/about", "/services", "/industries", "/contact", "/login"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Dynamic service subpages (if dynamic details exist)
  const serviceRoutes = services.map((s) => ({
    url: `${baseUrl}/services#section-${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // Dynamic industry subpages (if dynamic details exist)
  const industryRoutes = industries.map((ind) => ({
    url: `${baseUrl}/industries#section-${ind.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...serviceRoutes, ...industryRoutes];
}
