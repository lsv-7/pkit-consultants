import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Shield } from "lucide-react";
import { COMPANY } from "@/lib/company";

export const metadata: Metadata = {
  title: "Photography Credits & Licensing",
  description: "Licensing, provenance, and photographer attribution for photographic assets used on PK IT Consultants.",
  alternates: {
    canonical: `${COMPANY.website}/attribution`,
  },
};

export default function AttributionPage() {
  const images = [
    {
      title: "Dunes in the Dubai Desert Conservation Reserve",
      filename: "dubai-desert.jpg",
      photographer: "NepGrow",
      sourceName: "Wikimedia Commons",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Dunes_in_the_Dubai_Desert_Conservation.jpg",
      licenseName: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
      notes: "Cropped and optimized for web responsive display.",
    },
    {
      title: "Dubai Marina Skyline",
      filename: "dubai-marina.jpg",
      photographer: "Ayub407",
      sourceName: "Wikimedia Commons",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Dubai_Marina_Skyline.jpg",
      licenseName: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
      notes: "Cropped and optimized for web responsive display.",
    },
    {
      title: "DIFC Architecture - Dubai",
      filename: "dubai-difc.jpg",
      photographer: "Jpbowen",
      sourceName: "Wikimedia Commons / Panoramio",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:DIFC_-_Dubai_-_United_Arab_Emirates_-_panoramio_(1).jpg",
      licenseName: "CC BY-SA 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
      notes: "Cropped and optimized for web responsive display.",
    },
    {
      title: "Burj Khalifa and Downtown Dubai at Night",
      filename: "burj-khalifa.png",
      photographer: "ZQ Lee",
      sourceName: "Unsplash",
      sourceUrl: "https://unsplash.com/photos/burj-khalifa-dubai-united-arab-emirates-dJb08389_4c",
      licenseName: "Unsplash Commercial License",
      licenseUrl: "https://unsplash.com/license",
      notes: "Used under the Unsplash Commercial License.",
    },
    {
      title: "Museum of the Future Architecture",
      filename: "museum-of-the-future.png",
      photographer: "Ryan K",
      sourceName: "Unsplash",
      sourceUrl: "https://unsplash.com/photos/museum-of-the-future-dubai-united-arab-emirates-7h7n3G7j8s0",
      licenseName: "Unsplash Commercial License",
      licenseUrl: "https://unsplash.com/license",
      notes: "Used under the Unsplash Commercial License.",
    },
    {
      title: "Dubai Frame at Sunset",
      filename: "dubai-frame-sunset.png",
      photographer: "David Rodrigo",
      sourceName: "Unsplash",
      sourceUrl: "https://unsplash.com/photos/dubai-frame-during-sunset-U3bK_sMh_1o",
      licenseName: "Unsplash Commercial License",
      licenseUrl: "https://unsplash.com/license",
      notes: "Used under the Unsplash Commercial License.",
    },
    {
      title: "Palm Jumeirah Aerial View",
      filename: "palm-jumeirah.png",
      photographer: "Christoph Schulz",
      sourceName: "Unsplash",
      sourceUrl: "https://unsplash.com/photos/aerial-view-of-city-buildings-and-sea-during-daytime-7Om4USnUq2E",
      licenseName: "Unsplash Commercial License",
      licenseUrl: "https://unsplash.com/license",
      notes: "Used under the Unsplash Commercial License.",
    },
  ];

  return (
    <div style={{ position: "relative", minHeight: "100vh", overflow: "hidden", background: "#071326", color: "#F4F0E8" }}>
      <div className="bg-islamic-pattern absolute inset-0 opacity-10 pointer-events-none" />

      <div className="max-wrap" style={{ position: "relative", zIndex: 1, padding: "80px 24px 120px" }}>
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            fontSize: 12,
            fontFamily: "'Inter', sans-serif",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#D5AC42",
            textDecoration: "none",
            marginBottom: 32,
          }}
        >
          <ArrowLeft size={14} /> Back to Home
        </Link>

        <div style={{ marginBottom: 48, maxWidth: 800 }}>
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: "#D5AC42",
              display: "block",
              marginBottom: 12,
            }}
          >
            LEGAL TRANSPARENCY
          </span>
          <h1
            className="font-serif"
            style={{
              fontSize: "clamp(28px, 3.8vw, 44px)",
              fontWeight: 700,
              color: "#F4F0E8",
              textTransform: "uppercase",
              margin: "0 0 16px",
              lineHeight: 1.15,
            }}
          >
            Photography Credits &amp; Licensing
          </h1>
          <p style={{ color: "#9CAAC0", fontSize: 16, lineHeight: 1.7, margin: 0 }}>
            In compliance with open licenses and ethical digital stewardship, PK IT Consultants publishes full photographer attribution, direct repository links, and applicable Creative Commons and Unsplash licensing documentation for all photography used on this website.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {images.map((img) => (
            <div
              key={img.filename}
              style={{
                padding: "24px 28px",
                borderRadius: 12,
                background: "rgba(16, 30, 54, 0.6)",
                border: "1px solid rgba(213, 172, 66, 0.2)",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: 20,
                alignItems: "center",
              }}
            >
              <div>
                <h3
                  className="font-serif"
                  style={{ fontSize: 19, fontWeight: 700, color: "#F4F0E8", margin: "0 0 6px" }}
                >
                  {img.title}
                </h3>
                <span style={{ fontSize: 12, color: "#9CAAC0", fontFamily: "'Inter', sans-serif" }}>
                  File: <code style={{ color: "#D5AC42" }}>{img.filename}</code>
                </span>
              </div>

              <div>
                <span style={{ fontSize: 11, color: "#9CAAC0", textTransform: "uppercase", letterSpacing: "0.1em", display: "block" }}>
                  Photographer / Creator
                </span>
                <span style={{ fontSize: 14, fontWeight: 600, color: "#F4F0E8" }}>
                  {img.photographer}
                </span>
              </div>

              <div>
                <span style={{ fontSize: 11, color: "#9CAAC0", textTransform: "uppercase", letterSpacing: "0.1em", display: "block" }}>
                  License &amp; Source
                </span>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 4 }}>
                  <a
                    href={img.licenseUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: 12.5,
                      fontWeight: 600,
                      color: "#EBD68C",
                      textDecoration: "none",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    <span>{img.licenseName}</span>
                    <ExternalLink size={12} />
                  </a>
                  <span style={{ color: "rgba(213, 172, 66, 0.3)" }}>•</span>
                  <a
                    href={img.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: 12.5,
                      color: "#9CAAC0",
                      textDecoration: "none",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    <span>{img.sourceName}</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
