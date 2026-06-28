"use client";

import { useEffect, useState } from "react";
import {
  Brain,
  Code2,
  Network,
  Smartphone,
  Cloud,
  Shield,
  Zap,
  Globe,
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Activity,
  Award,
  Users,
  Compass,
  Cpu,
  Headphones,
  Layers,
  MessageSquare,
  RefreshCw,
  Mail,
  Phone,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";
import { useTheme } from "@/components/ThemeProvider";
import HeroConnectionGraphic from "@/components/sections/HeroConnectionGraphic";
import HomeFaqAccordion from "@/components/sections/HomeFaqAccordion";

// Dynamic Icon Maps for clean rendering
const iconMap: Record<string, any> = {
  Brain: Brain,
  Code2: Code2,
  Globe: Globe,
  Smartphone: Smartphone,
  Cloud: Cloud,
  Shield: Shield,
  Network: Network,
  Zap: Zap,
  Cpu: Cpu,
  Headphones: Headphones,
  Layers: Layers,
  MessageSquare: MessageSquare,
  RefreshCw: RefreshCw,
  
  // Industries mapping
  Heart: Activity,
  GraduationCap: Award,
  ShoppingBag: Users,
  Hammer: Compass,
  Factory: Network,
  Building: Globe,
  Building2: Shield,
  Rocket: Zap,
};



interface HomeClientProps {
  companyInfo: any;
  homepageData: any;
  services: any[];
  industries: any[];
  faqs: any[];
  aboutContent: any;
}

export default function HomeClient({
  companyInfo,
  homepageData,
  services,
  industries,
  faqs,
  aboutContent,
}: HomeClientProps) {


  const heroContent = {
    eyebrow: companyInfo.name,
    headingNormal: homepageData.heroTitleNormal,
    headingHighlight: homepageData.heroTitleHighlight,
    subheading: homepageData.heroSubtitle,
    primaryCta: homepageData.ctaText,
    secondaryCta: "Explore Services",
  };

  const whyChoosePkit = homepageData.whyChooseUs;
  const processStages = homepageData.devProcess;

  return (
    <div className="pkit-root">
      <style>{`
        .pkit-root {
          background: var(--bg);
          color: var(--text);
          font-family: 'Inter', sans-serif;
          min-height: 100vh;
          position: relative;
          overflow-x: hidden;
        }
        .pkit-root * { box-sizing: border-box; }
        .font-display { font-family: 'Space Grotesk', sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        
        .bg-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(to right, var(--border-soft) 1px, transparent 1px),
            linear-gradient(to bottom, var(--border-soft) 1px, transparent 1px);
          background-size: 64px 64px;
          mask-image: radial-gradient(ellipse 80% 50% at 50% 0%, black 40%, transparent 100%);
          opacity: 0.5;
          pointer-events: none;
        }
        .glow-blue {
          position: absolute;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, var(--blue-soft) 0%, transparent 70%);
          pointer-events: none;
        }
        .graphic-svg { width: 100%; height: auto; }
        .graphic-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.15em;
          fill: var(--muted);
        }
        .trace-line {
          animation: dash-travel 3.5s linear infinite;
        }
        @keyframes dash-travel {
          0% { stroke-dashoffset: 220; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { stroke-dashoffset: -220; opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .trace-line { animation: none; opacity: 0.6; }
        }
      `}</style>

      {/* ─── HERO SECTION ────────────────────────────────────────────────── */}
      <header className="section-pad" style={{ position: "relative", paddingTop: 88, paddingBottom: 64 }}>
        <div className="bg-grid" />
        <div className="glow-blue" style={{ top: -200, left: "50%", transform: "translateX(-50%)" }} />
        <div className="max-wrap" style={{ position: "relative", display: "grid", gridTemplateColumns: "1fr", gap: 48, alignItems: "center" }}>
          <div className="hero-grid-cols">
            <div>
              <Reveal>
                <span className="eyebrow">{heroContent.eyebrow}</span>
              </Reveal>
              <Reveal delay={80}>
                <h1 className="font-display" style={{ fontSize: "clamp(34px, 6vw, 58px)", lineHeight: 1.08, fontWeight: 700, marginTop: 18, letterSpacing: "-0.02em" }}>
                  {heroContent.headingNormal}
                  <br />
                  with <span style={{ color: "var(--blue)" }}>{heroContent.headingHighlight}</span>
                </h1>
              </Reveal>
              <Reveal delay={160}>
                <p style={{ color: "var(--muted)", fontSize: 17.5, lineHeight: 1.7, marginTop: 22, maxWidth: 520 }}>
                  {heroContent.subheading}
                </p>
              </Reveal>
              <Reveal delay={240}>
                <div style={{ display: "flex", gap: 14, marginTop: 32, flexWrap: "wrap" }}>
                  <Link href="/contact" className="btn-primary">
                    {heroContent.primaryCta} <ArrowRight size={16} />
                  </Link>
                  <Link href="/services" className="btn-secondary">
                    {heroContent.secondaryCta}
                  </Link>
                </div>
              </Reveal>
            </div>

            <Reveal delay={200}>
                <HeroConnectionGraphic />
            </Reveal>
          </div>
        </div>

        <style>{`
          @media (min-width: 900px) {
            .hero-grid-cols {
              display: grid !important;
              grid-template-columns: 1.1fr 0.9fr;
              gap: 48px;
              align-items: center;
            }
          }
        `}</style>
      </header>

      {/* ─── ABOUT PKIT SUMMARY ─────────────────────────────────────────── */}
      <section className="section-pad" style={{ borderTop: "1px solid var(--border-soft)" }}>
        <div className="max-wrap">
          <div className="about-summary-grid">
            <Reveal>
              <span className="eyebrow">About Our Firm</span>
              <h2 className="font-display" style={{ fontSize: "clamp(26px, 4vw, 36px)", fontWeight: 700, marginTop: 14, letterSpacing: "-0.01em" }}>
                Dubai-Based Engineers Driving Digital Growth
              </h2>
              <p style={{ color: "var(--muted)", fontSize: 16, lineHeight: 1.8, marginTop: 18, maxWidth: 520 }}>
                {aboutContent.storyParagraphs[0]}
              </p>
              <div style={{ marginTop: 28 }}>
                <Link href="/about" className="btn-secondary" style={{ paddingInline: 24 }}>
                  Read Our Story <ArrowRight size={15} />
                </Link>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border-soft)",
                  borderRadius: 16,
                  padding: 32,
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                }}
              >
                <div style={{ borderBottom: "1px solid var(--border-soft)", paddingBottom: 16 }}>
                  <h3 className="font-display" style={{ fontSize: 18, fontWeight: 600, color: "var(--text)" }}>
                    Our Core Vision
                  </h3>
                  <p style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.6, marginTop: 8 }}>
                    {aboutContent.vision}
                  </p>
                </div>
                <div>
                  <h3 className="font-display" style={{ fontSize: 18, fontWeight: 600, color: "var(--text)" }}>
                    Founder & Leadership
                  </h3>
                  <p style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.6, marginTop: 8 }}>
                    Led by <strong style={{ fontWeight: 600 }}>{aboutContent.founder.name}</strong>, {companyInfo.name} acts as a transparent tech-partner for Middle East enterprises and fast-growing ventures.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        <style>{`
          @media (min-width: 900px) {
            .about-summary-grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 64px;
              align-items: center;
            }
          }
        `}</style>
      </section>

      {/* ─── SERVICES OVERVIEW ───────────────────────────────────────────── */}
      <section id="services" className="section-pad" style={{ background: "var(--surface)", borderTop: "1px solid var(--border-soft)", borderBottom: "1px solid var(--border-soft)" }}>
        <div className="max-wrap">
          <SectionHeader
            eyebrow="What We Deliver"
            heading="Professional Disciplines Built for Business Outcomes"
            description="We deploy outcome-driven engineering squads, avoiding generic templates to build high-performance systems for your operations."
          />

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20, marginTop: 48 }}>
            {services.map((s, i) => {
              const IconComponent = iconMap[s.iconName] || Brain;
              return (
                <Reveal key={s.title} delay={i * 50}>
                  <div className="card" style={{ padding: 26, height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div>
                      <div className="icon-box" style={{ marginBottom: 16 }}>
                        <IconComponent size={20} />
                      </div>
                      <h3 className="font-display" style={{ fontSize: 18, fontWeight: 600 }}>
                        {s.title}
                      </h3>
                      <p style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.6, marginTop: 8 }}>
                        {s.desc}
                      </p>
                    </div>
                    <div style={{ marginTop: 18, paddingTop: 12, borderTop: "1px solid var(--border-soft)" }}>
                      <Link
                        href="/services"
                        style={{ fontSize: 13, fontWeight: 600, color: "var(--cyan)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 4 }}
                      >
                        Explore capabilities <ArrowUpRight size={13} />
                      </Link>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── INDUSTRIES WE SERVE ───────────────────────────────────────── */}
      <section id="industries" className="section-pad">
        <div className="max-wrap">
          <SectionHeader
            eyebrow="Sectors We Empower"
            heading="Engineered Around Specific Compliance & Workflows"
            description="Our architectures respect the regulatory residency, data-sovereignty, and operational security required by your specific field."
          />

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20, marginTop: 48 }}>
            {industries.map((ind, i) => {
              const IconComponent = iconMap[ind.iconName] || Zap;
              return (
                <Reveal key={ind.title} delay={i * 50}>
                  <div className="card" style={{ padding: 26, height: "100%" }}>
                    <div className="icon-box" style={{ marginBottom: 16 }}>
                      <IconComponent size={20} />
                    </div>
                    <h3 className="font-display" style={{ fontSize: 18, fontWeight: 600 }}>
                      {ind.title}
                    </h3>
                    <p style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.6, marginTop: 8 }}>
                      {ind.desc}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
          <div style={{ textAlign: "center", marginTop: 40 }}>
            <Link href="/industries" className="btn-secondary">
              View All Industry Details <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── WHY CHOOSE PKIT ────────────────────────────────────────────── */}
      <section id="why-us" className="section-pad" style={{ background: "var(--surface)", borderTop: "1px solid var(--border-soft)", borderBottom: "1px solid var(--border-soft)" }}>
        <div className="max-wrap">
          <SectionHeader
            eyebrow={"Why Choose " + companyInfo.name.split(" ")[0]}
            heading="Our Core Engineering Strengths"
            description="We deliver elite, high-performance systems with clear outcomes and Senior-only engineering squads."
          />

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24, marginTop: 48 }}>
            {whyChoosePkit.map((w: any, i: number) => {
              const IconComponent = iconMap[w.iconName] || Shield;
              return (
                <Reveal key={w.title} delay={i * 50}>
                  <div className="card" style={{ padding: 28, height: "100%", display: "flex", flexDirection: "column", gap: 16 }}>
                    <div className="icon-box" style={{ width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 10, background: "var(--blue-soft)", border: "1px solid rgba(47,111,237,0.3)", color: "var(--cyan)" }}>
                      <IconComponent size={20} />
                    </div>
                    <div>
                      <h3 className="font-display" style={{ fontSize: 18, fontWeight: 600, color: "var(--text)" }}>
                        {w.title}
                      </h3>
                      <p style={{ color: "var(--muted)", fontSize: 13.5, lineHeight: 1.6, marginTop: 8 }}>
                        {w.desc}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── OUR PROCESS ─────────────────────────────────────────────────── */}
      <section id="process" className="section-pad">
        <div className="max-wrap">
          <SectionHeader
            eyebrow="Delivery Pipeline"
            heading="Our 7-Stage Implementation Framework"
            description="From discovery through database scaling, our roadmap ensures transparency and predictability."
          />

          <div style={{ marginTop: 48, position: "relative" }}>
            {processStages.map((p: any, i: number) => (
              <Reveal key={p.num} delay={i * 80}>
                <div style={{ display: "flex", gap: 24, position: "relative", paddingBottom: i === processStages.length - 1 ? 0 : 36 }}>
                  {i !== processStages.length - 1 && (
                    <div
                      className="process-line"
                      style={{
                        position: "absolute",
                        left: 27,
                        top: 56,
                        width: 2,
                        height: "calc(100% - 36px)",
                      }}
                    />
                  )}
                  <div
                    style={{
                      flexShrink: 0,
                      width: 56,
                      height: 56,
                      borderRadius: 14,
                      background: "var(--surface-2)",
                      border: "1px solid var(--border)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                      zIndex: 1,
                    }}
                  >
                    <span className="font-mono" style={{ fontSize: 16, fontWeight: 600, color: "var(--blue)" }}>
                      {p.num}
                    </span>
                  </div>
                  <div style={{ paddingTop: 4 }}>
                    <h3 className="font-display" style={{ fontSize: 18, fontWeight: 600 }}>
                      {p.stepTitle}
                    </h3>
                    <p style={{ color: "var(--muted)", fontSize: 14.5, lineHeight: 1.65, marginTop: 6, maxWidth: 520 }}>
                      {p.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TECHNOLOGIES WE WORK WITH ────────────────────────────────────── */}
      <section id="tech-stack" className="section-pad" style={{ background: "var(--surface)", borderTop: "1px solid var(--border-soft)", borderBottom: "1px solid var(--border-soft)" }}>
        <div className="max-wrap">
          <SectionHeader
            eyebrow="Capabilities"
            heading="Technologies We Work With"
            description="We build with proven, modern, and reliable technologies that power world-class applications."
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: 16,
              marginTop: 48,
            }}
          >
            {[
              "React",
              "Next.js",
              "TypeScript",
              "Node.js",
              "Python",
              "Prisma",
              "PostgreSQL",
              "AWS",
              "Docker",
              "GitHub",
              "OpenAI",
              "Google Cloud",
            ].map((techName, i) => (
              <Reveal key={techName} delay={i * 40}>
                <div
                  className="card"
                  style={{
                    padding: "24px 16px",
                    textAlign: "center",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span
                    className="font-display"
                    style={{
                      fontSize: 17,
                      fontWeight: 600,
                      color: "var(--text)",
                    }}
                  >
                    {techName}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ SECTION ────────────────────────────────────────────────── */}
      <section id="faqs" className="section-pad">
        <div className="max-wrap">
          <SectionHeader
            eyebrow="FAQ"
            heading="Frequently Asked Questions"
            description="Clear answers regarding our engagement processes, engineering models, and security governance."
          />

          <HomeFaqAccordion faqs={faqs} />
        </div>
      </section>

      {/* ─── BOOK CONSULTATION CTA ──────────────────────────────────────── */}
      <section id="cta" className="section-pad" style={{ position: "relative", textAlign: "center" }}>
        <div className="glow-blue" style={{ bottom: -200, left: "50%", transform: "translateX(-50%)" }} />
        <div className="max-wrap" style={{ position: "relative" }}>
          <Reveal>
            <h2 className="font-display" style={{ fontSize: "clamp(28px, 5vw, 44px)", fontWeight: 700, letterSpacing: "-0.02em", maxWidth: 680, margin: "0 auto" }}>
              Ready to connect your business with the right technology?
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p style={{ color: "var(--muted)", fontSize: 16, marginTop: 16, maxWidth: 480, marginLeft: "auto", marginRight: "auto" }}>
              Book an initial architecture audit or scoping review. Our senior consultants will evaluate your infrastructure honestly.
            </p>
          </Reveal>
          <Reveal delay={180}>
            <div style={{ marginTop: 36, display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
              <Link href="/contact" className="btn-primary" style={{ padding: "13px 28px", fontSize: 15 }}>
                Book Consultation <ArrowRight size={16} />
              </Link>
              <a
                href={companyInfo.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  background: "rgba(37, 211, 102, 0.08)",
                  border: "1px solid rgba(37, 211, 102, 0.3)",
                  color: "#25D366",
                  padding: "13px 28px",
                  borderRadius: 8,
                  fontSize: 15,
                  fontWeight: 600,
                  textDecoration: "none",
                  transition: "all 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(37, 211, 102, 0.15)";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(37, 211, 102, 0.08)";
                  e.currentTarget.style.transform = "none";
                }}
              >
                <MessageCircle size={18} /> WhatsApp
              </a>
              <a
                href={`mailto:${companyInfo.email}`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  background: "rgba(255, 255, 255, 0.04)",
                  border: "1px solid var(--border-soft)",
                  color: "var(--text)",
                  padding: "13px 28px",
                  borderRadius: 8,
                  fontSize: 15,
                  fontWeight: 500,
                  textDecoration: "none",
                  transition: "all 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--blue)";
                  e.currentTarget.style.background = "var(--surface)";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border-soft)";
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.04)";
                  e.currentTarget.style.transform = "none";
                }}
              >
                <Mail size={18} /> Email Us
              </a>
              <a
                href={`tel:${companyInfo.phone.replace(/\s+/g, "")}`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  background: "rgba(255, 255, 255, 0.04)",
                  border: "1px solid var(--border-soft)",
                  color: "var(--text)",
                  padding: "13px 28px",
                  borderRadius: 8,
                  fontSize: 15,
                  fontWeight: 500,
                  textDecoration: "none",
                  transition: "all 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--blue)";
                  e.currentTarget.style.background = "var(--surface)";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border-soft)";
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.04)";
                  e.currentTarget.style.transform = "none";
                }}
              >
                <Phone size={18} /> Call Us
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
