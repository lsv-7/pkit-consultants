import type { MetadataRoute } from "next";
import { COMPANY } from "@/lib/company";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: COMPANY.name,
    short_name: "PKIT",
    description: COMPANY.defaultSeoDescription,
    start_url: "/",
    display: "standalone",
    background_color: "#020612",
    theme_color: "#0066FF",
    icons: [
      {
        src: "/icon",
        sizes: "32x32",
        type: "image/png",
      },
    ],
  };
}
