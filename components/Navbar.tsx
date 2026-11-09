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
  ChevronRight,
  MessageCircle,
} from "lucide-react";
import { getCompanyInfo } from "@/lib/content";
import { useTheme } from "@/components/ThemeProvider";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/industries", label: "Industries" },
  { href: "/contact", label: "Contact" },
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
    const onScroll = () => setScrolled(window.scrollY > 15);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Prevent background scroll when mobile menu is open
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
      {/* ─── ARCHITECTURAL TELEMETRY TOP BAR ─────────────────────────────── */}
      <div
        className="top-telemetry-bar"
        style={{
          background: "linear-gradient(90deg, #06111F 0%, #0A2540 50%, #06111F 100%)",
          borderBottom: "1px solid rgba(200, 155, 60, 0.2)",
          color: "var(--muted)",
          fontSize: 11,
          fontFamily: "'JetBrains Mono', monospace",
          letterSpacing: "0.06em",
          padding: "6px 24px",
          position: "relative",
          zIndex: 51,
        }}
      >
        <div
          className="max-wrap"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "var(--gold)" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--gold)", boxShadow: "0 0 6px var(--gold)" }} />
              DUBAI, UAE (GST / UTC+4)
            </span>
            <span className="telemetry-separator" style={{ color: "rgba(255, 255, 255, 0.2)" }}>•</span>
            <span className="telemetry-hide-sm" style={{ color: "rgba(255, 255, 255, 0.75)" }}>
              DIFC & DOWNTOWN TECH HUB
            </span>
            <span className="telemetry-separator telemetry-hide-sm" style={{ color: "rgba(255, 255, 255, 0.2)" }}>•</span>
            <span className="telemetry-hide-md" style={{ color: "var(--cyan)" }}>
              100% SENIOR ARCHITECTS
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <a
              href={`mailto:${companyInfo.email}`}
              style={{
                color: "rgba(255, 255, 255, 0.8)",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                transition: "color 0.2s ease",
              }}
              className="hover-gold"
            >
              <Mail size={12} style={{ color: "var(--gold)" }} />
              <span>{companyInfo.email}</span>
            </a>
            <span className="telemetry-separator telemetry-hide-sm" style={{ color: "rgba(255, 255, 255, 0.2)" }}>•</span>
            <a
              href={`tel:${companyInfo.phone.replace(/\s+/g, "")}`}
              style={{
                color: "rgba(255, 255, 255, 0.8)",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                transition: "color 0.2s ease",
              }}
              className="telemetry-hide-sm hover-gold"
            >
              <Phone size={12} style={{ color: "var(--gold)" }} />
              <span>{companyInfo.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* ─── MAIN STICKY NAVIGATION ───────────────────────────────────────── */}
      <nav
        aria-label="Main navigation"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          background: scrolled
            ? "var(--nav-bg-scroll)"
            : "var(--nav-bg-idle)",
          borderBottom: scrolled
            ? "1px solid rgba(200, 155, 60, 0.22)"
            : "1px solid rgba(37, 99, 235, 0.12)",
          boxShadow: scrolled
            ? "0 10px 30px -10px rgba(0, 0, 0, 0.45)"
            : "none",
          transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div
          className="max-wrap"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 24px",
            height: scrolled ? 72 : 82,
            transition: "height 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {/* Brand Logo & Editorial Typography */}
          <Link
            href="/"
            aria-label={`${companyInfo.name} — Home`}
            style={{ display: "flex", alignItems: "center", gap: 14, textDecoration: "none" }}
            className="navbar-brand"
          >
            <div
              style={{
                position: "relative",
                width: 44,
                height: 44,
                borderRadius: 10,
                border: "1px solid rgba(200, 155, 60, 0.35)",
                background: "radial-gradient(circle at top left, #0A2540, #06111F)",
                padding: 2,
                boxShadow: "0 4px 14px -2px rgba(0, 0, 0, 0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                src="/logo.png"
                alt={`${companyInfo.name} logo`}
                width={40}
                height={40}
                priority
                style={{
                  borderRadius: 8,
                  objectFit: "contain",
                }}
              />
              <span
                style={{
                  position: "absolute",
                  bottom: -2,
                  right: -2,
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "var(--gold)",
                  border: "2px solid #06111F",
                }}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                <span
                  className="font-display"
                  style={{
                    fontSize: 20,
                    fontWeight: 800,
                    color: "var(--text)",
                    letterSpacing: "-0.025em",
                    lineHeight: 1.1,
                  }}
                >
                  PK IT
                </span>
                <span
                  className="font-display brand-subword"
                  style={{
                    fontSize: 18,
                    fontWeight: 600,
                    color: "var(--blue)",
                    letterSpacing: "-0.015em",
                  }}
                >
                  Consultants
                </span>
              </div>
              <span
                className="font-mono brand-tagline-text"
                style={{
                  fontSize: 10,
                  color: "var(--muted)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  marginTop: 3,
                }}
              >
                Dubai Technology Consultancy
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div
            style={{ display: "flex", alignItems: "center", gap: 32 }}
            className="nav-desktop"
          >
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`nav-link-item ${isActive ? "active" : ""}`}
                  style={{
                    fontSize: 14,
                    fontWeight: isActive ? 600 : 500,
                    color: isActive ? "var(--text)" : "var(--muted)",
                    textDecoration: "none",
                    position: "relative",
                    padding: "8px 0",
                    transition: "color 0.25s ease",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  {isActive && (
                    <span
                      style={{
                        width: 5,
                        height: 5,
                        borderRadius: "50%",
                        background: "var(--gold)",
                        boxShadow: "0 0 6px var(--gold)",
                      }}
                    />
                  )}
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Desktop Controls: Theme Toggle + Client Portal + CTA */}
          <div style={{ display: "flex", alignItems: "center", gap: 14 }} className="nav-desktop">
            <button
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              style={{
                background: "var(--surface-2)",
                border: "1px solid var(--border-soft)",
                borderRadius: 8,
                color: "var(--text)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 36,
                height: 36,
                transition: "all 0.25s ease",
              }}
              className="theme-btn"
            >
              {theme === "dark" ? <Sun size={17} style={{ color: "var(--gold)" }} /> : <Moon size={17} style={{ color: "var(--blue)" }} />}
            </button>

            <Link
              href="/portal/login"
              style={{
                fontSize: 13,
                fontWeight: 500,
                color: "var(--muted)",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "8px 12px",
                borderRadius: 6,
                border: "1px solid transparent",
                transition: "all 0.2s ease",
              }}
              className="portal-login-ghost"
            >
              <Shield size={14} style={{ color: "var(--cyan)" }} />
              <span>Portal</span>
            </Link>

            <Link
              href="/contact"
              className="btn-primary"
              style={{
                fontSize: 13,
                fontWeight: 600,
                padding: "10px 18px",
                borderRadius: 8,
                background: "linear-gradient(135deg, var(--blue) 0%, #1D4ED8 100%)",
                boxShadow: "0 4px 16px -4px rgba(37, 99, 235, 0.5)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <span>Consultation</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* Mobile Actions: Theme Toggle + Menu Toggle */}
          <div style={{ display: "none", alignItems: "center", gap: 10 }} className="nav-mobile-actions">
            <button
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              style={{
                background: "var(--surface-2)",
                border: "1px solid var(--border-soft)",
                borderRadius: 8,
                color: "var(--text)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 36,
                height: 36,
              }}
            >
              {theme === "dark" ? <Sun size={16} style={{ color: "var(--gold)" }} /> : <Moon size={16} style={{ color: "var(--blue)" }} />}
            </button>

            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              style={{
                background: menuOpen ? "var(--surface-2)" : "transparent",
                border: "1px solid var(--border-soft)",
                borderRadius: 8,
                color: "var(--text)",
                cursor: "pointer",
                padding: 6,
                width: 36,
                height: 36,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s ease",
              }}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* ─── FULL-SCREEN ARCHITECTURAL MOBILE DRAWER ─────────────────────── */}
        {menuOpen && (
          <div
            className="mobile-drawer-overlay"
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              height: "100vh",
              background: "rgba(6, 17, 31, 0.98)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              zIndex: 9999,
              display: "flex",
              flexDirection: "column",
              padding: "24px",
              overflowY: "auto",
              animation: "drawerFadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards",
            }}
          >
            {/* Drawer Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                paddingBottom: 20,
                borderBottom: "1px solid rgba(200, 155, 60, 0.2)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Image src="/logo.png" alt={companyInfo.name} width={34} height={34} style={{ borderRadius: 6 }} />
                <div>
                  <span className="font-display" style={{ fontSize: 17, fontWeight: 700, color: "var(--text)" }}>
                    PK IT <span style={{ color: "var(--blue)" }}>Consultants</span>
                  </span>
                  <p className="font-mono" style={{ fontSize: 10, color: "var(--gold)", letterSpacing: "0.08em" }}>
                    DUBAI, UAE
                  </p>
                </div>
              </div>

              <button
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                style={{
                  background: "var(--surface-2)",
                  border: "1px solid var(--border-soft)",
                  borderRadius: 8,
                  color: "var(--text)",
                  width: 36,
                  height: 36,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Navigation Links */}
            <div style={{ display: "flex", flexDirection: "column", gap: 6, margin: "24px 0" }}>
              <span className="font-mono" style={{ fontSize: 11, color: "var(--gold)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>
                NAVIGATION
              </span>
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "14px 16px",
                      borderRadius: 10,
                      background: isActive ? "rgba(37, 99, 235, 0.12)" : "transparent",
                      border: isActive ? "1px solid rgba(37, 99, 235, 0.3)" : "1px solid transparent",
                      color: isActive ? "#ffffff" : "var(--muted)",
                      fontSize: 16,
                      fontWeight: isActive ? 600 : 500,
                      textDecoration: "none",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      {isActive && <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--gold)" }} />}
                      {link.label}
                    </span>
                    <ChevronRight size={16} style={{ color: isActive ? "var(--gold)" : "var(--muted-2)" }} />
                  </Link>
                );
              })}
            </div>

            {/* Quick Consultation CTAs */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: "auto", paddingTop: 18, borderTop: "1px solid rgba(255, 255, 255, 0.08)" }}>
              <Link
                href="/contact"
                onClick={() => setMenuOpen(false)}
                className="btn-primary"
                style={{
                  justifyContent: "center",
                  padding: "14px",
                  fontSize: 15,
                  fontWeight: 600,
                  borderRadius: 10,
                  background: "linear-gradient(135deg, var(--blue) 0%, #1D4ED8 100%)",
                }}
              >
                Book Technical Consultation <ArrowRight size={16} />
              </Link>

              <Link
                href="/portal/login"
                onClick={() => setMenuOpen(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  padding: "12px",
                  borderRadius: 10,
                  background: "var(--surface-2)",
                  border: "1px solid var(--border-soft)",
                  color: "var(--text)",
                  fontSize: 14,
                  fontWeight: 500,
                  textDecoration: "none",
                }}
              >
                <Shield size={16} style={{ color: "var(--cyan)" }} />
                <span>Client Portal Access</span>
              </Link>

              {/* Direct Dubai Office Channels */}
              <div
                style={{
                  background: "rgba(10, 37, 64, 0.5)",
                  border: "1px solid rgba(200, 155, 60, 0.25)",
                  borderRadius: 12,
                  padding: "16px",
                  marginTop: 6,
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                <span className="font-mono" style={{ fontSize: 10, color: "var(--gold)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                  DUBAI CONCIERGE DESK
                </span>
                <a
                  href={`mailto:${companyInfo.email}`}
                  style={{ display: "flex", alignItems: "center", gap: 10, color: "#ffffff", fontSize: 13, textDecoration: "none" }}
                >
                  <Mail size={14} style={{ color: "var(--gold)" }} />
                  <span>{companyInfo.email}</span>
                </a>
                <a
                  href={companyInfo.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: "flex", alignItems: "center", gap: 10, color: "#25D366", fontSize: 13, textDecoration: "none" }}
                >
                  <MessageCircle size={14} />
                  <span>WhatsApp Business Direct</span>
                </a>
                <a
                  href={`tel:${companyInfo.phone.replace(/\s+/g, "")}`}
                  style={{ display: "flex", alignItems: "center", gap: 10, color: "var(--muted)", fontSize: 13, textDecoration: "none" }}
                >
                  <Phone size={14} style={{ color: "var(--cyan)" }} />
                  <span>{companyInfo.phone}</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>

      <style>{`
        .top-telemetry-bar a:hover {
          color: var(--gold) !important;
        }
        .portal-login-ghost:hover {
          color: var(--text) !important;
          background: var(--surface-2) !important;
          border-color: var(--border-soft) !important;
        }
        .nav-link-item:hover {
          color: var(--text) !important;
        }
        .nav-link-item::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, var(--gold), var(--blue));
          transform: scaleX(0);
          transform-origin: right;
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .nav-link-item:hover::after {
          transform: scaleX(1);
          transform-origin: left;
        }
        .nav-link-item.active::after {
          transform: scaleX(1);
        }

        @keyframes drawerFadeIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 900px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-actions { display: flex !important; }
          .telemetry-hide-sm { display: none !important; }
        }
        @media (max-width: 600px) {
          .telemetry-hide-md { display: none !important; }
          .brand-tagline-text { display: none !important; }
        }
      `}</style>
    </>
  );
}
