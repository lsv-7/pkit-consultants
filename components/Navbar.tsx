"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Menu,
  X,
  ArrowRight,
  Sun,
  Moon,
  Shield,
  Phone,
  Mail,
} from "lucide-react";
import { getCompanyInfo } from "@/lib/content";
import { useTheme } from "@/components/ThemeProvider";

const NAV_LINKS = [
  { href: "/", label: "HOME" },
  { href: "/about", label: "ABOUT" },
  { href: "/services", label: "SERVICES" },
  { href: "/industries", label: "INDUSTRIES" },
  { href: "/contact", label: "CONTACT" },
];

interface NavbarProps {
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
}

export default function Navbar({ settings }: NavbarProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const companyInfo = settings || getCompanyInfo();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Prevent background scroll when mobile drawer is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [menuOpen]);

  if (pathname.startsWith("/admin")) return null;

  return (
    <>
      <header
        aria-label="Main navigation header"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          background: scrolled
            ? "rgba(7, 19, 38, 0.94)"
            : "rgba(7, 19, 38, 0.86)",
          borderBottom: "1px solid rgba(213, 172, 66, 0.2)",
          transition: "background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
          boxShadow: scrolled
            ? "0 10px 30px -10px rgba(0, 0, 0, 0.6)"
            : "0 2px 10px rgba(0, 0, 0, 0.2)",
        }}
      >
        <div
          className="max-wrap"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 28px",
            height: scrolled ? 64 : 76,
            transition: "height 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {/* ─── LEFT: Finalized PK IT Consultants Logo + Wordmark ─── */}
          <Link
            href="/"
            aria-label={`${companyInfo.name} — Home`}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              textDecoration: "none",
            }}
            className="group"
          >
            {/* Original Finalized Logo Asset with Tailored Architectural Bezel */}
            <div
              style={{
                position: "relative",
                width: scrolled ? 38 : 42,
                height: scrolled ? 38 : 42,
                borderRadius: 8,
                overflow: "hidden",
                border: "1px solid rgba(213, 172, 66, 0.28)",
                background: "#FFFFFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                boxShadow: "0 2px 8px -2px rgba(0, 0, 0, 0.3)",
                transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              <Image
                src="/logo.png"
                alt={`${companyInfo.name} logo`}
                width={56}
                height={56}
                priority
                style={{
                  width: "140%",
                  height: "140%",
                  maxWidth: "none",
                  objectFit: "contain",
                }}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: 18,
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  color: "#F4F0E8",
                  lineHeight: 1.15,
                }}
              >
                PK IT CONSULTANTS
              </span>
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 8.5,
                  fontWeight: 600,
                  letterSpacing: "0.24em",
                  textTransform: "uppercase",
                  color: "#D5AC42",
                  marginTop: 2,
                }}
              >
                TECHNOLOGY · CONSULTING · SOLUTIONS
              </span>
            </div>
          </Link>

          {/* ─── CENTRE: Navigation Links ─── */}
          <nav
            style={{
              display: "none",
              alignItems: "center",
              gap: 32,
            }}
            className="nav-desktop"
          >
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    position: "relative",
                    fontSize: 12,
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 500,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: active ? "#EBD68C" : "#9CAAC0",
                    textDecoration: "none",
                    padding: "8px 0",
                  }}
                  className={`nav-link-hover ${active ? "active" : ""}`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* ─── RIGHT: Theme Toggle + Portal + Book Consultation Pill ─── */}
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            {/* Client Portal Link */}
            <Link
              href="/portal/login"
              style={{
                display: "none",
                alignItems: "center",
                gap: 6,
                fontSize: 11,
                fontFamily: "'Inter', sans-serif",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#9CAAC0",
                textDecoration: "none",
                border: "1px solid rgba(213, 172, 66, 0.22)",
                padding: "6px 14px",
                borderRadius: 9999,
                background: "rgba(16, 30, 54, 0.5)",
                transition: "all 0.2s ease",
              }}
              className="portal-link-desktop hover:border-[#D5AC42] hover:text-[#F4F0E8]"
            >
              <Shield size={12} style={{ color: "#D5AC42" }} />
              <span>Client Portal</span>
            </Link>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                border: "1px solid rgba(213, 172, 66, 0.25)",
                background: "rgba(16, 30, 54, 0.5)",
                color: "#D5AC42",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              className="hover:border-[#D5AC42] hover:bg-[#D5AC42]/10"
            >
              {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
            </button>

            {/* Gold Pill CTA Button */}
            <Link
              href="/contact"
              className="btn-gold-pill group"
              style={{ display: "none" }}
            >
              <span>Book Consultation</span>
              <ArrowRight size={13} className="transition-transform duration-200 group-hover:translate-x-1" />
            </Link>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen}
              style={{
                width: 40,
                height: 40,
                borderRadius: 8,
                border: "1px solid rgba(213, 172, 66, 0.3)",
                background: "rgba(16, 30, 54, 0.7)",
                color: "#EBD68C",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
              className="mobile-toggle"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* ─── LUXURY MOBILE ARCHITECTURAL DRAWER ─────────────────────── */}
      {menuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "rgba(7, 19, 38, 0.98)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            display: "flex",
            flexDirection: "column",
            overflowY: "auto",
          }}
          className="bg-islamic-pattern"
        >
          {/* Drawer Top Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "20px 24px",
              borderBottom: "1px solid rgba(213, 172, 66, 0.2)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div
                style={{
                  position: "relative",
                  width: 34,
                  height: 34,
                  borderRadius: 6,
                  overflow: "hidden",
                  border: "1px solid rgba(213, 172, 66, 0.28)",
                  background: "#FFFFFF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
                }}
              >
                <Image
                  src="/logo.png"
                  alt={`${companyInfo.name} logo`}
                  width={46}
                  height={46}
                  priority
                  style={{
                    width: "140%",
                    height: "140%",
                    maxWidth: "none",
                    objectFit: "contain",
                  }}
                />
              </div>
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: 17,
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  color: "#F4F0E8",
                }}
              >
                PK IT CONSULTANTS
              </span>
            </div>

            <button
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              style={{
                width: 38,
                height: 38,
                borderRadius: "50%",
                border: "1px solid rgba(213, 172, 66, 0.3)",
                background: "rgba(16, 30, 54, 0.8)",
                color: "#EBD68C",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <X size={18} />
            </button>
          </div>

          {/* Drawer Navigation Links */}
          <div style={{ padding: "36px 28px", flex: 1, display: "flex", flexDirection: "column", gap: 20 }}>
            <span
              style={{
                fontSize: 10,
                fontFamily: "'Inter', sans-serif",
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                color: "#D5AC42",
              }}
            >
              NAVIGATION DIRECTORY
            </span>

            {NAV_LINKS.map((link, idx) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "12px 0",
                    borderBottom: "1px solid rgba(213, 172, 66, 0.1)",
                    textDecoration: "none",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      fontSize: 24,
                      fontWeight: 600,
                      letterSpacing: "0.08em",
                      color: active ? "#EBD68C" : "#F4F0E8",
                    }}
                  >
                    {link.label}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 11,
                      letterSpacing: "0.1em",
                      color: "#D5AC42",
                    }}
                  >
                    0{idx + 1}
                  </span>
                </Link>
              );
            })}

            {/* Mobile Actions */}
            <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 14 }}>
              <Link
                href="/contact"
                onClick={() => setMenuOpen(false)}
                className="btn-gold-pill"
                style={{ width: "100%", justifyContent: "center", padding: "14px 20px" }}
              >
                <span>Book Consultation</span>
                <ArrowRight size={14} />
              </Link>

              <Link
                href="/portal/login"
                onClick={() => setMenuOpen(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  fontSize: 12,
                  fontFamily: "'Inter', sans-serif",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#F4F0E8",
                  textDecoration: "none",
                  border: "1px solid rgba(213, 172, 66, 0.3)",
                  padding: "13px 20px",
                  borderRadius: 9999,
                  background: "rgba(16, 30, 54, 0.6)",
                }}
              >
                <Shield size={14} style={{ color: "#D5AC42" }} />
                <span>Client Portal Access</span>
              </Link>
            </div>

            {/* Mobile Direct Concierge Coordinates */}
            <div
              style={{
                marginTop: "auto",
                paddingTop: 28,
                borderTop: "1px solid rgba(213, 172, 66, 0.15)",
                display: "flex",
                flexDirection: "column",
                gap: 12,
                fontSize: 12,
                color: "#9CAAC0",
              }}
            >
              <a
                href={`mailto:${companyInfo.email}`}
                style={{ display: "flex", alignItems: "center", gap: 8, color: "#9CAAC0", textDecoration: "none" }}
              >
                <Mail size={13} style={{ color: "#D5AC42" }} />
                <span>{companyInfo.email}</span>
              </a>
              <a
                href={`tel:${companyInfo.phone.replace(/\s+/g, "")}`}
                style={{ display: "flex", alignItems: "center", gap: 8, color: "#9CAAC0", textDecoration: "none" }}
              >
                <Phone size={13} style={{ color: "#D5AC42" }} />
                <span>{companyInfo.phone}</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Responsive helper styles for header */}
      <style jsx global>{`
        @media (min-width: 1024px) {
          .nav-desktop {
            display: flex !important;
          }
          .portal-link-desktop {
            display: inline-flex !important;
          }
          .btn-gold-pill {
            display: inline-flex !important;
          }
          .mobile-toggle {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
