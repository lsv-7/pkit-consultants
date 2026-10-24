import type { MetadataRoute } from "next";
import { COMPANY } from "@/lib/company";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: COMPANY.name,
    short_name: "PK IT",
    description: COMPANY.defaultSeoDescription,
    start_url: "/",
    display: "standalone",
    background_color: "#08111F",
    theme_color: "#2563EB",
    icons: [
      {
        src: "/icon",
        sizes: "32x32",
        type: "image/png",
      },
    ],
  };
}
