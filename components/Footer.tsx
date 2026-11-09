"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, ArrowUpRight, Shield, MessageCircle, Clock, CheckCircle2 } from "lucide-react";
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
        background: "linear-gradient(180deg, #06111F 0%, #0A2540 100%)",
        borderTop: "1px solid rgba(200, 155, 60, 0.28)",
        position: "relative",
        overflow: "hidden",
      }}
      aria-label="Site footer"
    >
      {/* Subtle blueprint grid overlay */}
      <div
        className="bg-blueprint"
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.2,
          pointerEvents: "none",
        }}
      />

      {/* Main footer grid */}
      <div
        className="max-wrap"
        style={{
          padding: "80px 24px 48px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div className="footer-layout-grid">
          {/* Brand Column */}
          <div className="footer-col-brand">
            <Link
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 12,
                textDecoration: "none",
                marginBottom: 20,
              }}
            >
              <div
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 10,
                  border: "1px solid rgba(200, 155, 60, 0.4)",
                  background: "#06111F",
                  padding: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image src="/logo.png" alt={companyInfo.name} width={38} height={38} style={{ borderRadius: 8 }} />
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span className="font-display" style={{ fontSize: 19, fontWeight: 700, color: "#ffffff", letterSpacing: "-0.02em" }}>
                  PK IT <span style={{ color: "var(--blue)" }}>Consultants</span>
                </span>
                <span className="font-mono" style={{ fontSize: 10, color: "var(--gold)", letterSpacing: "0.1em" }}>
                  DUBAI, UNITED ARAB EMIRATES
                </span>
              </div>
            </Link>

            <p style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.8, maxWidth: 320 }}>
              Connecting Business with Technology. We architect mission-critical software, custom AI solutions, and high-performance cloud systems for startups, SMBs, and enterprises across the Arabian Gulf and internationally.
            </p>

            <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 12 }}>
              <a
                href={`mailto:${companyInfo.email}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  color: "#ffffff",
                  fontSize: 13.5,
                  textDecoration: "none",
                  transition: "color 0.2s ease",
                }}
                className="footer-contact-link"
              >
                <div style={{ width: 28, height: 28, borderRadius: 6, background: "rgba(200, 155, 60, 0.12)", border: "1px solid rgba(200, 155, 60, 0.25)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Mail size={13} style={{ color: "var(--gold)" }} />
                </div>
                <span>{companyInfo.email}</span>
              </a>

              <a
                href={`tel:${companyInfo.phone.replace(/\s+/g, "")}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  color: "var(--muted)",
                  fontSize: 13.5,
                  textDecoration: "none",
                  transition: "color 0.2s ease",
                }}
                className="footer-contact-link"
              >
                <div style={{ width: 28, height: 28, borderRadius: 6, background: "rgba(37, 99, 235, 0.12)", border: "1px solid rgba(37, 99, 235, 0.25)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Phone size={13} style={{ color: "var(--cyan)" }} />
                </div>
                <span>{companyInfo.phone}</span>
              </a>

              <div style={{ display: "flex", alignItems: "flex-start", gap: 10, color: "var(--muted)", fontSize: 13.5 }}>
                <div style={{ width: 28, height: 28, borderRadius: 6, background: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(255, 255, 255, 0.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                  <MapPin size={13} style={{ color: "var(--muted)" }} />
                </div>
                <span>{companyInfo.address}</span>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 10, color: "var(--muted)", fontSize: 13 }}>
                <div style={{ width: 28, height: 28, borderRadius: 6, background: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(255, 255, 255, 0.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Clock size={13} style={{ color: "var(--gold)" }} />
                </div>
                <span>{companyInfo.hours || "Mon - Fri: 9:00 AM - 6:00 PM GST"}</span>
              </div>
            </div>
          </div>

          {/* Disciplines Column */}
          <div>
            <h3
              className="font-mono"
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: "var(--gold)",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: 22,
              }}
            >
              DISCIPLINES
            </h3>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                { title: "AI Solutions & Enterprise LLMs", href: "/services#ai-solutions" },
                { title: "Custom Software Engineering", href: "/services#software-dev" },
                { title: "Strategic IT Consultancy", href: "/services#it-consulting" },
                { title: "Mobile Application Systems", href: "/services#mobile-apps" },
                { title: "Cloud Architecture & DevOps", href: "/services#cloud-solutions" },
                { title: "Cybersecurity & Governance", href: "/services#cybersecurity" },
              ].map((s) => (
                <li key={s.title}>
                  <Link
                    href={s.href}
                    style={{
                      color: "var(--muted)",
                      fontSize: 14,
                      textDecoration: "none",
                      transition: "all 0.2s ease",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                    className="footer-sub-link"
                  >
                    <span>{s.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company & Client Access Column */}
          <div>
            <h3
              className="font-mono"
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: "var(--gold)",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: 22,
              }}
            >
              COMPANY
            </h3>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 14 }}>
              {COMPANY_LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    style={{
                      color: "var(--muted)",
                      fontSize: 14,
                      textDecoration: "none",
                      transition: "all 0.2s ease",
                    }}
                    className="footer-sub-link"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div style={{ marginTop: 28, paddingTop: 18, borderTop: "1px solid rgba(255, 255, 255, 0.08)" }}>
              <span className="font-mono" style={{ fontSize: 11, color: "var(--muted-2)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                CLIENT ECOSYSTEM
              </span>
              <div style={{ marginTop: 10 }}>
                <Link
                  href="/portal/login"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    fontSize: 13,
                    fontWeight: 600,
                    color: "var(--cyan)",
                    textDecoration: "none",
                    background: "rgba(37, 99, 235, 0.12)",
                    border: "1px solid rgba(37, 99, 235, 0.3)",
                    padding: "8px 14px",
                    borderRadius: 8,
                    transition: "all 0.2s ease",
                  }}
                  className="portal-badge-link"
                >
                  <Shield size={14} /> Client Portal Login
                </Link>
              </div>
            </div>
          </div>

          {/* Dubai Scoping Column */}
          <div>
            <h3
              className="font-mono"
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: "var(--gold)",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: 22,
              }}
            >
              ENGAGE OUR ARCHITECTS
            </h3>
            <p style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>
              Initiate an architecture audit or technical scoping session with our senior engineers in Dubai.
            </p>

            <Link
              href="/contact"
              className="btn-primary"
              style={{
                fontSize: 13,
                fontWeight: 600,
                padding: "11px 18px",
                borderRadius: 8,
                width: "100%",
                justifyContent: "center",
                background: "linear-gradient(135deg, var(--blue) 0%, #1D4ED8 100%)",
                boxShadow: "0 6px 20px -6px rgba(37, 99, 235, 0.5)",
              }}
            >
              Book Consultation <ArrowUpRight size={14} />
            </Link>

            <div style={{ marginTop: 14 }}>
              <a
                href={companyInfo.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  color: "#25D366",
                  fontSize: 13,
                  fontWeight: 600,
                  textDecoration: "none",
                  border: "1px solid rgba(37, 211, 102, 0.35)",
                  background: "rgba(37, 211, 102, 0.08)",
                  borderRadius: 8,
                  padding: "11px 16px",
                  transition: "all 0.2s ease",
                }}
                className="whatsapp-footer-btn"
              >
                <MessageCircle size={15} /> WhatsApp Concierge
              </a>
            </div>

            <div
              style={{
                marginTop: 22,
                padding: "12px 14px",
                background: "rgba(6, 17, 31, 0.7)",
                border: "1px solid rgba(200, 155, 60, 0.2)",
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <CheckCircle2 size={15} style={{ color: "var(--gold)", flexShrink: 0 }} />
              <span style={{ fontSize: 11.5, color: "var(--muted)", lineHeight: 1.4 }}>
                UAE Federal Data Sovereignty Compliant
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal & Regulatory Bar */}
      <div
        style={{
          borderTop: "1px solid rgba(255, 255, 255, 0.08)",
          background: "#040B15",
          padding: "22px 24px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          className="max-wrap"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 16,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <p style={{ color: "var(--muted-2)", fontSize: 13, margin: 0 }}>
              © {new Date().getFullYear()} {companyInfo.name}. All rights reserved.
            </p>
            <span style={{ color: "var(--muted-2)" }}>•</span>
            <span className="font-mono" style={{ color: "var(--muted-2)", fontSize: 12 }}>
              Dubai, United Arab Emirates
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap" }}>
            <span style={{ color: "var(--muted-2)", fontSize: 12 }}>
              Connecting Business with Technology
            </span>
            <span style={{ color: "var(--muted-2)" }}>•</span>
            <a
              href={`mailto:${companyInfo.email}`}
              style={{ color: "var(--gold)", fontSize: 12, textDecoration: "none" }}
            >
              {companyInfo.email}
            </a>
          </div>
        </div>
      </div>

      <style>{`
        .footer-layout-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr 1.2fr;
          gap: 48px 36px;
        }
        .footer-contact-link:hover {
          color: var(--gold) !important;
        }
        .footer-sub-link:hover {
          color: #ffffff !important;
          transform: translateX(3px);
        }
        .portal-badge-link:hover {
          background: rgba(37, 99, 235, 0.22) !important;
          border-color: var(--blue) !important;
        }
        .whatsapp-footer-btn:hover {
          background: rgba(37, 211, 102, 0.18) !important;
        }

        @media (max-width: 1024px) {
          .footer-layout-grid {
            grid-template-columns: 1fr 1fr;
            gap: 40px 32px;
          }
        }
        @media (max-width: 640px) {
          .footer-layout-grid {
            grid-template-columns: 1fr;
            gap: 36px;
          }
        }
      `}</style>
    </footer>
  );
}
