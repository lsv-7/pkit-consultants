import { MetadataRoute } from "next";
import { COMPANY } from "@/lib/company";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/portal/", "/api/", "/_next/"],
    },
    sitemap: `${COMPANY.website}/sitemap.xml`,
  };
}
