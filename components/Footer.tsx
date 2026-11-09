"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Mail, Phone, MapPin, ArrowRight, Shield } from "lucide-react";
import { getCompanyInfo } from "@/lib/content";

const COMPANY_LINKS = [
  { href: "/about", label: "About Our Firm" },
  { href: "/services", label: "Engineering Disciplines" },
  { href: "/industries", label: "Enterprise Sectors" },
  { href: "/contact", label: "Book Consultation" },
  { href: "/portal/login", label: "Client Portal Access" },
];

interface FooterProps {
  settings?: {
    name: string;
    tagline: string;
    email: string;
    phone: string;
    whatsappLink: string;
    address: string;
    hours: string;
    mapEmbedUrl: string;
  };
  services?: any[];
}

export default function Footer({ settings }: FooterProps) {
  const pathname = usePathname();
  const companyInfo = settings || getCompanyInfo();

  if (pathname.startsWith("/admin")) return null;

  return (
    <footer
      style={{
        background: "#071326",
        borderTop: "1px solid rgba(213, 172, 66, 0.22)",
        position: "relative",
        overflow: "hidden",
      }}
      aria-label="Site footer"
    >
      {/* Subtle Geometric Background Pattern */}
      <div
        className="bg-islamic-pattern"
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.1,
          pointerEvents: "none",
        }}
      />

      <div
        className="max-wrap"
        style={{
          padding: "80px 28px 40px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 48,
            marginBottom: 60,
          }}
        >
          {/* Brand Column */}
          <div style={{ maxWidth: 360 }}>
            <Link
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 14,
                textDecoration: "none",
                marginBottom: 20,
              }}
            >
              {/* PK Monogram */}
              <div
                style={{
                  width: 36,
                  height: 36,
                  transform: "rotate(45deg)",
                  border: "1px solid rgba(213, 172, 66, 0.7)",
                  background: "linear-gradient(135deg, #101E36 0%, #071326 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    transform: "rotate(-45deg)",
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontWeight: 700,
                    fontSize: 13,
                    color: "#EBD68C",
                  }}
                >
                  PK
                </span>
              </div>

              <div style={{ display: "flex", flexDirection: "column" }}>
                <span
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: 18,
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                    color: "#F4F0E8",
                  }}
                >
                  PK IT CONSULTANTS
                </span>
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 8.5,
                    fontWeight: 600,
                    letterSpacing: "0.26em",
                    textTransform: "uppercase",
                    color: "#D5AC42",
                    marginTop: 2,
                  }}
                >
                  TECHNOLOGY · CONSULTING · SOLUTIONS
                </span>
              </div>
            </Link>

            <p style={{ color: "#9CAAC0", fontSize: 14, lineHeight: 1.7, marginBottom: 24 }}>
              Connecting Business with Technology. We architect high-concurrency software, custom AI solutions, and high-performance mobile systems for startups, SMBs, and enterprises.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <a
                href={`mailto:${companyInfo.email}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  color: "#F4F0E8",
                  fontSize: 13.5,
                  textDecoration: "none",
                }}
                className="hover-gold"
              >
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 6,
                    background: "rgba(213, 172, 66, 0.12)",
                    border: "1px solid rgba(213, 172, 66, 0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Mail size={13} style={{ color: "#D5AC42" }} />
                </div>
                <span>{companyInfo.email}</span>
              </a>

              <a
                href={`tel:${companyInfo.phone.replace(/\s+/g, "")}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  color: "#9CAAC0",
                  fontSize: 13.5,
                  textDecoration: "none",
                }}
                className="hover-gold"
              >
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 6,
                    background: "rgba(16, 30, 54, 0.8)",
                    border: "1px solid rgba(213, 172, 66, 0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Phone size={13} style={{ color: "#D5AC42" }} />
                </div>
                <span>{companyInfo.phone}</span>
              </a>

              <div style={{ display: "flex", alignItems: "flex-start", gap: 10, color: "#9CAAC0", fontSize: 13 }}>
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 6,
                    background: "rgba(16, 30, 54, 0.8)",
                    border: "1px solid rgba(213, 172, 66, 0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    marginTop: 2,
                  }}
                >
                  <MapPin size={13} style={{ color: "#D5AC42" }} />
                </div>
                <span>{companyInfo.address}</span>
              </div>
            </div>
          </div>

          {/* Core Disciplines */}
          <div>
            <h4
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#D5AC42",
                marginBottom: 20,
              }}
            >
              DISCIPLINES
            </h4>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { label: "AI Solutions & Agent Swarms", href: "/services" },
                { label: "Custom Software Development", href: "/services" },
                { label: "Strategic IT Consultancy", href: "/services" },
                { label: "Mobile Application Systems", href: "/services" },
                { label: "Enterprise Cloud Architecture", href: "/services" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    style={{
                      color: "#9CAAC0",
                      fontSize: 13.5,
                      textDecoration: "none",
                      transition: "color 0.2s ease",
                    }}
                    className="hover-gold"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#D5AC42",
                marginBottom: 20,
              }}
            >
              COMPANY
            </h4>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 12 }}>
              {COMPANY_LINKS.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    style={{
                      color: "#9CAAC0",
                      fontSize: 13.5,
                      textDecoration: "none",
                      transition: "color 0.2s ease",
                    }}
                    className="hover-gold"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Client Portal & Compliance */}
          <div>
            <h4
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#D5AC42",
                marginBottom: 20,
              }}
            >
              CLIENT ECOSYSTEM
            </h4>

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <Link
                href="/portal/login"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "12px 18px",
                  borderRadius: 8,
                  background: "rgba(16, 30, 54, 0.8)",
                  border: "1px solid rgba(213, 172, 66, 0.25)",
                  color: "#F4F0E8",
                  fontSize: 12.5,
                  textDecoration: "none",
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                }}
                className="hover:border-[#D5AC42]"
              >
                <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <Shield size={14} style={{ color: "#D5AC42" }} />
                  <span>Client Portal</span>
                </span>
                <ArrowRight size={13} style={{ color: "#D5AC42" }} />
              </Link>

              <div
                style={{
                  padding: "14px 16px",
                  borderRadius: 8,
                  border: "1px solid rgba(213, 172, 66, 0.15)",
                  background: "rgba(10, 23, 48, 0.4)",
                  fontSize: 11.5,
                  color: "#9CAAC0",
                  lineHeight: 1.5,
                }}
              >
                <strong style={{ color: "#D5AC42", display: "block", marginBottom: 2 }}>
                  ENTERPRISE DATA PRIVACY
                </strong>
                Architecting secure digital platforms aligned with regional standards and enterprise SLAs.
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal / Regulatory Bar */}
        <div
          style={{
            paddingTop: 28,
            borderTop: "1px solid rgba(213, 172, 66, 0.14)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 16,
            fontSize: 11.5,
            color: "#6B7B96",
          }}
        >
          <div>
            © {new Date().getFullYear()} PK IT Consultants. All rights reserved.
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap" }}>
            <Link
              href="/attribution"
              style={{ color: "#9CAAC0", textDecoration: "none", transition: "color 0.2s" }}
              className="hover-gold"
            >
              Photography Credits &amp; Licensing
            </Link>
            <span>•</span>
            <span style={{ color: "#D5AC42" }}>Connecting Business with Technology</span>
            <span>•</span>
            <span>Deira, Dubai, UAE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
