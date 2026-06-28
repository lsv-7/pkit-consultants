"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ArrowRight, Sun, Moon } from "lucide-react";
import { getCompanyInfo } from "@/lib/content";
import { useTheme } from "@/components/ThemeProvider";
import { COMPANY } from "@/lib/company";

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
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  if (pathname.startsWith("/admin")) return null;

  return (
    <>
      <nav
        aria-label="Main navigation"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          background: scrolled
            ? "var(--nav-bg-scroll)"
            : "var(--nav-bg-idle)",
          borderBottom: `1px solid ${scrolled ? "var(--nav-border-scroll)" : "transparent"}`,
          transition: "background-color 0.3s ease, border-color 0.3s ease",
        }}
      >
        <div
          className="max-wrap"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 24px",
            height: 80,
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            aria-label={`${companyInfo.name} — Home`}
            style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}
            className="navbar-brand"
          >
            <Image
              src="/logo.png"
              alt={`${companyInfo.name} logo`}
              width={46}
              height={46}
              priority
              style={{
                borderRadius: 8,
                border: "1px solid var(--border-soft)",
                background: "var(--surface-2)",
                padding: 1,
              }}
            />
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", lineHeight: 1.1 }}>
              <span
                className="brand-name font-display"
                style={{
                  fontWeight: 800,
                  color: "var(--text)",
                  letterSpacing: "-0.03em",
                }}
              >
                <span className="brand-name-full">{companyInfo.name || COMPANY.name}</span>
                <span className="brand-name-abbr">{COMPANY.name.split(" ")[0]}</span>
              </span>
              <span
                className="brand-tagline"
                style={{
                  color: "var(--muted)",
                  fontWeight: 400,
                  letterSpacing: "-0.01em",
                  marginTop: 2,
                }}
              >
                {companyInfo.tagline || COMPANY.tagline}
              </span>
            </div>
          </Link>

          {/* Desktop links */}
          <div
            style={{ display: "flex", alignItems: "center", gap: 28 }}
            className="nav-desktop"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link-custom ${pathname === link.href ? "active" : ""}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA group */}
          <div style={{ display: "flex", alignItems: "center", gap: 16 }} className="nav-desktop">
            <button
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              style={{
                background: "none",
                border: "1px solid var(--border-soft)",
                borderRadius: 8,
                padding: 8,
                color: "var(--text)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 36,
                height: 36,
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--blue)";
                e.currentTarget.style.background = "var(--surface-2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border-soft)";
                e.currentTarget.style.background = "none";
              }}
            >
              <div style={{ position: "relative", width: 18, height: 18, overflow: "hidden" }}>
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    transform: theme === "dark" ? "rotate(0deg) scale(1)" : "rotate(90deg) scale(0)",
                    opacity: theme === "dark" ? 1 : 0,
                    transition: "transform 0.3s ease, opacity 0.2s ease",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Sun size={18} />
                </div>
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    transform: theme === "light" ? "rotate(0deg) scale(1)" : "rotate(-90deg) scale(0)",
                    opacity: theme === "light" ? 1 : 0,
                    transition: "transform 0.3s ease, opacity 0.2s ease",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Moon size={18} />
                </div>
              </div>
            </button>
            <Link
              href="/portal/login"
              style={{
                fontSize: 13.5,
                fontWeight: 500,
                color: "var(--muted)",
                textDecoration: "none",
                transition: "color 0.2s ease",
              }}
              className="client-login-link"
            >
              Client Login
            </Link>
            <Link
              href="/contact"
              className="btn-primary"
              style={{ fontSize: 13, padding: "8px 16px", borderRadius: 6, fontWeight: 600 }}
            >
              Book Consultation <ArrowRight size={14} />
            </Link>
          </div>

          {/* Mobile controls group (Theme Toggle + Hamburger) */}
          <div style={{ display: "none", alignItems: "center", gap: 12 }} className="nav-mobile-actions">
            <button
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              style={{
                background: "none",
                border: "1px solid var(--border-soft)",
                borderRadius: 8,
                padding: 6,
                color: "var(--text)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 32,
                height: 32,
                transition: "all 0.25s ease",
              }}
            >
              <div style={{ position: "relative", width: 16, height: 16, overflow: "hidden" }}>
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    transform: theme === "dark" ? "rotate(0deg) scale(1)" : "rotate(90deg) scale(0)",
                    opacity: theme === "dark" ? 1 : 0,
                    transition: "transform 0.3s ease, opacity 0.2s ease",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Sun size={16} />
                </div>
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    transform: theme === "light" ? "rotate(0deg) scale(1)" : "rotate(-90deg) scale(0)",
                    opacity: theme === "light" ? 1 : 0,
                    transition: "transform 0.3s ease, opacity 0.2s ease",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Moon size={16} />
                </div>
              </div>
            </button>

            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              style={{
                background: "none",
                border: "none",
                color: "var(--text)",
                cursor: "pointer",
                padding: 4,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              className="hamburger-btn"
            >
              {menuOpen ? <X size={22} className="rotate-icon" /> : <Menu size={22} className="rotate-icon" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="nav-mobile-menu">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  display: "block",
                  padding: "14px 0",
                  fontSize: 15,
                  fontWeight: 500,
                  color: pathname === link.href ? "var(--text)" : "var(--muted)",
                  textDecoration: "none",
                  borderBottom: "1px solid var(--border-soft)",
                }}
              >
                {link.label}
              </Link>
            ))}
            <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 10 }}>
              <Link
                href="/portal/login"
                style={{
                  display: "block",
                  padding: "10px 0",
                  fontSize: 14,
                  color: "var(--muted)",
                  textDecoration: "none",
                }}
              >
                Client Login
              </Link>
              <Link
                href="/contact"
                className="btn-primary"
                style={{ justifyContent: "center", padding: "10px 18px", borderRadius: 6 }}
              >
                Book Consultation <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        )}
      </nav>

      <style>{`
        .nav-link-custom {
          font-size: 14px;
          font-weight: 500;
          color: var(--muted);
          text-decoration: none;
          transition: color 0.2s ease;
          padding: 8px 0;
          position: relative;
        }
        .nav-link-custom:hover {
          color: var(--text);
        }
        .nav-link-custom::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background: var(--blue);
          transform: scaleX(0);
          transform-origin: right;
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .nav-link-custom:hover::after {
          transform: scaleX(1);
          transform-origin: left;
        }
        .nav-link-custom.active {
          color: var(--text);
        }
        .nav-link-custom.active::after {
          transform: scaleX(1);
          background: var(--blue);
        }
        
        .client-login-link:hover {
          color: var(--text) !important;
        }

        .rotate-icon {
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .hamburger-btn[aria-expanded="true"] .rotate-icon {
          transform: rotate(90deg);
        }

        .nav-mobile-menu {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: var(--surface);
          border-bottom: 1px solid var(--border-soft);
          padding: 16px 24px 24px;
          display: flex;
          flex-direction: column;
          z-index: 49;
          box-shadow: var(--shadow-premium);
          backdrop-filter: blur(16px);
          WebkitBackdropFilter: blur(16px);
          animation: slideDown 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        
        @keyframes slideDown {
          from { transform: translateY(-8px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .brand-name {
          font-size: 18px;
        }
        .brand-name-full {
          display: none;
        }
        .brand-name-abbr {
          display: inline;
        }
        .brand-tagline {
          display: none;
        }

        @media (min-width: 380px) {
          .brand-name-full {
            display: inline;
          }
          .brand-name-abbr {
            display: none;
          }
        }

        @media (min-width: 768px) {
          .brand-name {
            font-size: 22px;
          }
          .brand-tagline {
            display: none;
          }
        }

        @media (min-width: 900px) {
          .nav-desktop { display: flex !important; }
          .nav-mobile-actions { display: none !important; }
          .brand-name {
            font-size: 23px;
          }
          .brand-tagline {
            display: none;
          }
        }

        @media (min-width: 1100px) {
          .brand-name {
            font-size: 26px;
          }
          .brand-tagline {
            display: block;
            font-size: 13px;
          }
        }

        @media (min-width: 1440px) {
          .brand-name {
            font-size: 28px;
          }
        }
        @media (max-width: 899px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-actions { display: flex !important; }
        }
      `}</style>
    </>
  );
}
