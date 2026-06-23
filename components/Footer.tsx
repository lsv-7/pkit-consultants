"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { getCompanyInfo, getServices } from "@/lib/content";

const COMPANY = [
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/industries", label: "Industries" },
  { href: "/contact", label: "Contact" },
  { href: "/login", label: "Client Login" },
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

export default function Footer({ settings, services }: FooterProps) {
  const pathname = usePathname();
  const companyInfo = settings || getCompanyInfo();
  const serviceList = services || getServices();


  if (pathname.startsWith("/admin")) return null;

  return (
    <footer
      style={{
        background: "var(--surface)",
        borderTop: "1px solid var(--border-soft)",
      }}
      aria-label="Site footer"
    >
      {/* Main footer grid */}
      <div
        className="max-wrap"
        style={{ padding: "64px 24px 48px" }}
      >
        <div className="footer-grid">
          {/* Brand column */}
          <div style={{ gridColumn: "span 2" }} className="footer-brand-col">
            <Link
              href="/"
              style={{ display: "inline-flex", alignItems: "center", gap: 12, textDecoration: "none", marginBottom: 20 }}
            >
              <Image src="/logo.png" alt={companyInfo.name} width={36} height={36} style={{ borderRadius: 8 }} />
              <span className="font-display" style={{ fontSize: 18, fontWeight: 700, color: "var(--text)" }}>
                PKIT<span style={{ color: "var(--blue)" }}>.</span>
              </span>
            </Link>
            <p style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.75, maxWidth: 280 }}>
              {companyInfo.tagline}. Premium IT consultancy, AI solutions, and software development based in {companyInfo.address}.
            </p>
            <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 10 }}>
              <a
                href={`mailto:${companyInfo.email}`}
                style={{ display: "flex", alignItems: "center", gap: 10, color: "var(--muted)", fontSize: 13, textDecoration: "none", transition: "color 0.2s" }}
              >
                <Mail size={14} style={{ color: "var(--blue)", flexShrink: 0 }} />
                {companyInfo.email}
              </a>
              <a
                href={`tel:${companyInfo.phone.replace(/\s+/g, "")}`}
                style={{ display: "flex", alignItems: "center", gap: 10, color: "var(--muted)", fontSize: 13, textDecoration: "none" }}
              >
                <Phone size={14} style={{ color: "var(--blue)", flexShrink: 0 }} />
                {companyInfo.phone}
              </a>
              <span style={{ display: "flex", alignItems: "flex-start", gap: 10, color: "var(--muted)", fontSize: 13 }}>
                <MapPin size={14} style={{ color: "var(--blue)", flexShrink: 0, marginTop: 2 }} />
                {companyInfo.address}
              </span>
            </div>
          </div>

          {/* Company links */}
          <div>
            <h3
              className="font-display"
              style={{ fontSize: 13, fontWeight: 600, color: "var(--text)", letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 20 }}
            >
              Company
            </h3>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 12 }}>
              {COMPANY.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    style={{ color: "var(--muted)", fontSize: 14, textDecoration: "none", transition: "color 0.2s ease" }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services links */}
          <div>
            <h3
              className="font-display"
              style={{ fontSize: 13, fontWeight: 600, color: "var(--text)", letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 20 }}
            >
              Services
            </h3>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 12 }}>
              {serviceList.map((s) => (
                <li key={s.id}>
                  <Link
                    href="/services"
                    style={{ color: "var(--muted)", fontSize: 14, textDecoration: "none", transition: "color 0.2s ease" }}
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA column */}
          <div>
            <h3
              className="font-display"
              style={{ fontSize: 13, fontWeight: 600, color: "var(--text)", letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 20 }}
            >
              Get Started
            </h3>
            <p style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>
              Ready to build something great? Let&apos;s start with a free consultation.
            </p>
            <Link href="/contact" className="btn-primary" style={{ fontSize: 13 }}>
              Book Consultation <ArrowUpRight size={14} />
            </Link>
            <div style={{ marginTop: 28 }}>
              <a
                href={companyInfo.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  color: "#25D366",
                  fontSize: 13,
                  fontWeight: 500,
                  textDecoration: "none",
                  border: "1px solid rgba(37,211,102,0.3)",
                  borderRadius: 8,
                  padding: "8px 14px",
                  transition: "background 0.2s ease",
                }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="#25D366" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{ borderTop: "1px solid var(--border-soft)", padding: "20px 24px" }}
      >
        <div
          className="max-wrap"
          style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center", justifyContent: "space-between" }}
        >
          <p style={{ color: "var(--muted-2)", fontSize: 13 }}>
            © {new Date().getFullYear()} {companyInfo.name}. All rights reserved.
          </p>
          <p style={{ color: "var(--muted-2)", fontSize: 13 }}>
            {companyInfo.address}
          </p>
        </div>
      </div>

      <style>{`
        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 48px 40px;
        }
        .footer-brand-col {
          grid-column: span 1 !important;
        }
        @media (max-width: 900px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
          }
          .footer-brand-col {
            grid-column: span 2 !important;
          }
        }
        @media (max-width: 540px) {
          .footer-grid {
            grid-template-columns: 1fr;
          }
          .footer-brand-col {
            grid-column: span 1 !important;
          }
        }
        footer a:hover { color: var(--text) !important; }
      `}</style>
    </footer>
  );
}
