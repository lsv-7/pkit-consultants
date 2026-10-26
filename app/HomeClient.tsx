"use client";

import Image from "next/image";
import Link from "next/link";
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
  Sparkles,
  CheckCircle2,
  Server,
} from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";
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
          opacity: 0.45;
          pointer-events: none;
        }
        .glow-blue {
          position: absolute;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, var(--blue-soft) 0%, transparent 70%);
          pointer-events: none;
        }
        .badge-gold {
          background: var(--gold-soft);
          color: var(--gold);
          border: 1px solid rgba(200, 155, 60, 0.32);
        }
        .architectural-card {
          position: relative;
          border-radius: 18px;
          overflow: hidden;
          border: 1px solid rgba(200, 155, 60, 0.25);
          box-shadow: 0 20px 50px -10px rgba(0, 0, 0, 0.4);
          transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .architectural-card:hover {
          border-color: rgba(200, 155, 60, 0.45);
          transform: translateY(-2px);
          box-shadow: 0 24px 60px -8px rgba(0, 0, 0, 0.5);
        }
        .architectural-caption {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 22px 24px;
          background: linear-gradient(to top, rgba(7, 19, 33, 0.95) 0%, rgba(7, 19, 33, 0.75) 60%, transparent 100%);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }
        .process-line {
          background: linear-gradient(
            to bottom,
            var(--border) 0%,
            var(--blue) 50%,
            var(--border) 100%
          );
        }
      `}</style>

      {/* ─── HERO SECTION: DUBAI ARCHITECTURAL EXCELLENCE ─────────────────── */}
      <header className="section-pad" style={{ position: "relative", paddingTop: 88, paddingBottom: 72 }}>
        <div className="bg-grid" />
        <div className="glow-blue" style={{ top: -200, left: "50%", transform: "translateX(-50%)" }} />

        <div className="max-wrap" style={{ position: "relative" }}>
          <div className="hero-grid-cols">
            {/* Left Column: Typography & CTAs */}
            <div>
              <Reveal>
                <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 18 }}>
                  <span className="badge-gold font-mono" style={{ padding: "6px 14px", borderRadius: 999, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", display: "inline-flex", alignItems: "center", gap: 8 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--gold)" }} />
                    Dubai, UAE • DIFC & Downtown Tech Hub
                  </span>
                </div>
              </Reveal>

              <Reveal delay={80}>
                <h1
                  className="font-display"
                  style={{
                    fontSize: "clamp(34px, 5.5vw, 56px)",
                    lineHeight: 1.1,
                    fontWeight: 700,
                    letterSpacing: "-0.025em",
                  }}
                >
                  {heroContent.headingNormal}
                  <br />
                  with <span style={{ color: "var(--blue)" }}>{heroContent.headingHighlight}</span>
                </h1>
              </Reveal>

              <Reveal delay={160}>
                <p
                  style={{
                    color: "var(--muted)",
                    fontSize: 17,
                    lineHeight: 1.75,
                    marginTop: 22,
                    maxWidth: 530,
                  }}
                >
                  {heroContent.subheading}
                </p>
              </Reveal>

              <Reveal delay={240}>
                <div style={{ display: "flex", gap: 14, marginTop: 32, flexWrap: "wrap", alignItems: "center" }}>
                  <Link href="/contact" className="btn-primary" style={{ padding: "13px 26px" }}>
                    {heroContent.primaryCta} <ArrowRight size={16} />
                  </Link>
                  <Link href="/services" className="btn-secondary" style={{ padding: "13px 24px" }}>
                    {heroContent.secondaryCta}
                  </Link>
                </div>
              </Reveal>

              {/* Trust Indicators */}
              <Reveal delay={300}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: 16,
                    marginTop: 40,
                    paddingTop: 28,
                    borderTop: "1px solid var(--border-soft)",
                    maxWidth: 520,
                  }}
                >
                  <div>
                    <span className="font-display" style={{ fontSize: 20, fontWeight: 700, color: "var(--text)" }}>
                      100%
                    </span>
                    <p style={{ color: "var(--muted)", fontSize: 12, marginTop: 4, lineHeight: 1.4 }}>
                      Senior Architects & Engineers
                    </p>
                  </div>
                  <div>
                    <span className="font-display" style={{ fontSize: 20, fontWeight: 700, color: "var(--gold)" }}>
                      GCC
                    </span>
                    <p style={{ color: "var(--muted)", fontSize: 12, marginTop: 4, lineHeight: 1.4 }}>
                      Enterprise Compliance & Data Residency
                    </p>
                  </div>
                  <div>
                    <span className="font-display" style={{ fontSize: 20, fontWeight: 700, color: "var(--cyan)" }}>
                      Zero
                    </span>
                    <p style={{ color: "var(--muted)", fontSize: 12, marginTop: 4, lineHeight: 1.4 }}>
                      Legacy Technical Debt
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right Column: Authentic Dubai Architectural Showcase */}
            <Reveal delay={200}>
              <div className="architectural-card" style={{ width: "100%", maxWidth: 540, marginInline: "auto" }}>
                <div style={{ position: "relative", width: "100%", height: 420 }}>
                  <Image
                    src="/images/dubai/dubai-frame-sunset.png"
                    alt="Dubai Frame framing Burj Khalifa and the Downtown Dubai skyline at golden sunset"
                    fill
                    priority
                    sizes="(max-width: 900px) 100vw, 540px"
                    style={{
                      objectFit: "cover",
                      objectPosition: "center 40%",
                    }}
                  />
                  {/* Subtle lighting vignette */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "radial-gradient(ellipse at center, transparent 30%, rgba(7, 19, 33, 0.45) 80%, rgba(7, 19, 33, 0.85) 100%)",
                      pointerEvents: "none",
                    }}
                  />
                </div>

                {/* Overlaid Architecture Glassmorphism Telemetry */}
                <div className="architectural-caption">
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                    <span className="font-mono" style={{ fontSize: 11, color: "var(--gold)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                      HEADQUARTERS • DUBAI, UAE
                    </span>
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 600,
                        padding: "3px 8px",
                        borderRadius: 4,
                        background: "rgba(37, 99, 235, 0.2)",
                        color: "var(--cyan)",
                        border: "1px solid rgba(56, 189, 248, 0.3)",
                      }}
                    >
                      ENTERPRISE CONSULTING
                    </span>
                  </div>
                  <h3 className="font-display" style={{ fontSize: 17, fontWeight: 600, color: "#fff", lineHeight: 1.35 }}>
                    Framing the Future of Enterprise Systems
                  </h3>
                  <p style={{ color: "rgba(255, 255, 255, 0.72)", fontSize: 13, lineHeight: 1.5, marginTop: 4 }}>
                    Deploying sovereign AI models, resilient cloud architectures, and mission-critical software across the Middle East.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        <style>{`
          @media (min-width: 900px) {
            .hero-grid-cols {
              display: grid !important;
              grid-template-columns: 1.08fr 0.92fr;
              gap: 52px;
              align-items: center;
            }
          }
        `}</style>
      </header>

      {/* ─── ABOUT PK IT & DUBAI INNOVATION SECTION ──────────────────────── */}
      <section className="section-pad" style={{ borderTop: "1px solid var(--border-soft)", position: "relative" }}>
        <div className="max-wrap">
          <div className="about-summary-grid">
            {/* Story & Vision */}
            <Reveal>
              <div>
                <span className="eyebrow">Dubai Innovation Engine</span>
                <h2
                  className="font-display"
                  style={{
                    fontSize: "clamp(26px, 4vw, 36px)",
                    fontWeight: 700,
                    marginTop: 14,
                    letterSpacing: "-0.015em",
                    lineHeight: 1.2,
                  }}
                >
                  Dubai-Based Engineers Driving Digital Growth
                </h2>
                <p style={{ color: "var(--muted)", fontSize: 16, lineHeight: 1.8, marginTop: 18, maxWidth: 520 }}>
                  {aboutContent.storyParagraphs[0]}
                </p>

                <div
                  style={{
                    marginTop: 28,
                    background: "var(--surface)",
                    border: "1px solid var(--border-soft)",
                    borderRadius: 14,
                    padding: 24,
                    maxWidth: 520,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                    <div className="icon-box" style={{ width: 40, height: 40, flexShrink: 0 }}>
                      <Sparkles size={18} />
                    </div>
                    <div>
                      <h3 className="font-display" style={{ fontSize: 16, fontWeight: 600, color: "var(--text)" }}>
                        Founder & Leadership
                      </h3>
                      <p style={{ color: "var(--muted)", fontSize: 13.5, lineHeight: 1.6, marginTop: 4 }}>
                        Led by <strong style={{ fontWeight: 600, color: "var(--text)" }}>{aboutContent.founder.name}</strong>, Founder &amp; Managing Director, {companyInfo.name} operates on a transparent, senior-only engineering model for Middle East enterprises and global ventures.
                      </p>
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: 28 }}>
                  <Link href="/about" className="btn-secondary" style={{ paddingInline: 24 }}>
                    Read Our Full Story <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            </Reveal>

            {/* Museum of the Future Visual Card */}
            <Reveal delay={160}>
              <div className="architectural-card" style={{ width: "100%", maxWidth: 520, marginInline: "auto" }}>
                <div style={{ position: "relative", width: "100%", height: 440 }}>
                  <Image
                    src="/images/dubai/museum-of-the-future.png"
                    alt="Museum of the Future on Sheikh Zayed Road in Dubai with Arabic calligraphy"
                    fill
                    sizes="(max-width: 900px) 100vw, 520px"
                    style={{
                      objectFit: "cover",
                      objectPosition: "center 30%",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(to top, rgba(7, 19, 33, 0.95) 0%, rgba(7, 19, 33, 0.4) 60%, rgba(7, 19, 33, 0.2) 100%)",
                      pointerEvents: "none",
                    }}
                  />
                </div>

                <div className="architectural-caption">
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--cyan)" }} />
                    <span className="font-mono" style={{ fontSize: 11, color: "var(--cyan)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                      DUBAI FUTURE BLUEPRINT
                    </span>
                  </div>
                  <h3 className="font-display" style={{ fontSize: 18, fontWeight: 700, color: "#fff", lineHeight: 1.3 }}>
                    Pioneering Enterprise AI &amp; Software Systems
                  </h3>
                  <p style={{ color: "rgba(255, 255, 255, 0.72)", fontSize: 13, lineHeight: 1.55, marginTop: 4 }}>
                    Inspired by Dubai&apos;s relentless technological vision, we engineer software architectures engineered to scale from regional hubs to global footprints.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        <style>{`
          @media (min-width: 900px) {
            .about-summary-grid {
              display: grid !important;
              grid-template-columns: 1fr 1fr;
              gap: 60px;
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

      {/* ─── FULL-WIDTH ARCHITECTURAL INTERLUDE: PALM JUMEIRAH ─────────── */}
      <section
        style={{
          position: "relative",
          padding: "100px 24px",
          overflow: "hidden",
          borderTop: "1px solid rgba(200, 155, 60, 0.2)",
          borderBottom: "1px solid rgba(200, 155, 60, 0.2)",
        }}
      >
        {/* Cinematic Backdrop Image */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <Image
            src="/images/dubai/palm-jumeirah.png"
            alt="Aerial view of Palm Jumeirah and the Arabian Gulf in Dubai, UAE"
            fill
            sizes="100vw"
            style={{
              objectFit: "cover",
              objectPosition: "center 45%",
            }}
          />
          {/* Deep Navy Midnight Gradient Overlay for Absolute Text Legibility */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(180deg, rgba(7, 19, 33, 0.92) 0%, rgba(10, 37, 64, 0.82) 50%, rgba(7, 19, 33, 0.94) 100%)",
            }}
          />
          <div className="bg-blueprint" style={{ position: "absolute", inset: 0, opacity: 0.3, pointerEvents: "none" }} />
        </div>

        <div className="max-wrap" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <Reveal>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <span className="badge-gold font-mono" style={{ padding: "6px 14px", borderRadius: 999, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase" }}>
                SCALE &amp; PRECISION • 25.1124° N, 55.1390° E
              </span>
            </div>
            <h2
              className="font-display"
              style={{
                fontSize: "clamp(28px, 4.5vw, 44px)",
                fontWeight: 700,
                color: "#ffffff",
                letterSpacing: "-0.02em",
                maxWidth: 860,
                marginInline: "auto",
                lineHeight: 1.15,
              }}
            >
              Architected for Uncompromised Scale Across the Arabian Gulf &amp; Global Enterprises
            </h2>
            <p
              style={{
                color: "rgba(247, 248, 250, 0.8)",
                fontSize: 16.5,
                lineHeight: 1.75,
                marginTop: 18,
                maxWidth: 680,
                marginInline: "auto",
              }}
            >
              From Dubai Internet City and DIFC to international multi-region deployments, our architectures handle heavy throughput, strict regional data governance, and non-negotiable operational reliability.
            </p>
          </Reveal>

          {/* 4 Pillars of Engineering Assurance */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 20,
              marginTop: 48,
              textAlign: "left",
            }}
          >
            {[
              {
                icon: Shield,
                title: "GCC Data Sovereignty",
                desc: "Full compliance with UAE federal and regional data residency mandates, sovereign clouds, and enterprise security policies.",
              },
              {
                icon: Users,
                title: "100% Senior Squads",
                desc: "No junior handoffs. Every technical spec, architecture design, and database schema is authored by experienced practitioners.",
              },
              {
                icon: Server,
                title: "Zero-Legacy Modernity",
                desc: "Modern TypeScript, Next.js, and containerized backends designed to eliminate long-term technical debt from day one.",
              },
              {
                icon: CheckCircle2,
                title: "Executive Accountability",
                desc: "Direct engagement with leadership, transparent project milestones, and guaranteed delivery SLAs on every commercial contract.",
              },
            ].map((pillar, idx) => {
              const IconComp = pillar.icon;
              return (
                <Reveal key={pillar.title} delay={idx * 80}>
                  <div
                    style={{
                      background: "rgba(11, 23, 42, 0.65)",
                      backdropFilter: "blur(12px)",
                      WebkitBackdropFilter: "blur(12px)",
                      border: "1px solid rgba(200, 155, 60, 0.22)",
                      borderRadius: 14,
                      padding: "24px 22px",
                      height: "100%",
                      transition: "border-color 0.25s ease, transform 0.25s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "rgba(200, 155, 60, 0.5)";
                      e.currentTarget.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "rgba(200, 155, 60, 0.22)";
                      e.currentTarget.style.transform = "none";
                    }}
                  >
                    <div style={{ width: 38, height: 38, borderRadius: 8, background: "rgba(200, 155, 60, 0.12)", border: "1px solid rgba(200, 155, 60, 0.3)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--gold)", marginBottom: 14 }}>
                      <IconComp size={18} />
                    </div>
                    <h3 className="font-display" style={{ fontSize: 17, fontWeight: 600, color: "#ffffff" }}>
                      {pillar.title}
                    </h3>
                    <p style={{ color: "rgba(247, 248, 250, 0.7)", fontSize: 13.5, lineHeight: 1.6, marginTop: 8 }}>
                      {pillar.desc}
                    </p>
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

      {/* ─── BOOK CONSULTATION CTA: BURJ KHALIFA BACKDROP ────────────────── */}
      <section
        id="cta"
        style={{
          position: "relative",
          padding: "110px 24px",
          textAlign: "center",
          overflow: "hidden",
          borderTop: "1px solid rgba(200, 155, 60, 0.25)",
        }}
      >
        {/* Soaring Burj Khalifa Night Backdrop */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <Image
            src="/images/dubai/burj-khalifa.png"
            alt="Burj Khalifa towering over the Downtown Dubai skyline and fountains at dusk"
            fill
            sizes="100vw"
            style={{
              objectFit: "cover",
              objectPosition: "center 30%",
            }}
          />
          {/* Deep Navy/Black Vignette Mask for High Contrast Readability */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(180deg, rgba(7, 19, 33, 0.94) 0%, rgba(10, 37, 64, 0.88) 50%, rgba(7, 19, 33, 0.96) 100%)",
            }}
          />
          <div className="glow-blue" style={{ bottom: -200, left: "50%", transform: "translateX(-50%)" }} />
        </div>

        <div className="max-wrap" style={{ position: "relative", zIndex: 1 }}>
          <Reveal>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 18 }}>
              <span className="badge-gold font-mono" style={{ padding: "6px 14px", borderRadius: 999, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase" }}>
                START AN ENGAGEMENT • DUBAI &amp; WORLDWIDE
              </span>
            </div>
            <h2
              className="font-display"
              style={{
                fontSize: "clamp(28px, 5vw, 46px)",
                fontWeight: 700,
                color: "#ffffff",
                letterSpacing: "-0.02em",
                maxWidth: 720,
                margin: "0 auto",
                lineHeight: 1.15,
              }}
            >
              Ready to connect your business with the right technology?
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p
              style={{
                color: "rgba(247, 248, 250, 0.82)",
                fontSize: 16.5,
                lineHeight: 1.7,
                marginTop: 18,
                maxWidth: 520,
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              Book an initial architecture audit or scoping review. Our senior consultants will evaluate your infrastructure honestly.
            </p>
          </Reveal>
          <Reveal delay={180}>
            <div style={{ marginTop: 38, display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
              <Link href="/contact" className="btn-primary" style={{ padding: "14px 30px", fontSize: 15, background: "var(--blue)" }}>
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
                  background: "rgba(37, 211, 102, 0.12)",
                  border: "1px solid rgba(37, 211, 102, 0.35)",
                  color: "#25D366",
                  padding: "14px 28px",
                  borderRadius: 8,
                  fontSize: 15,
                  fontWeight: 600,
                  textDecoration: "none",
                  transition: "all 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(37, 211, 102, 0.22)";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(37, 211, 102, 0.12)";
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
                  background: "rgba(255, 255, 255, 0.08)",
                  border: "1px solid rgba(255, 255, 255, 0.16)",
                  color: "#ffffff",
                  padding: "14px 26px",
                  borderRadius: 8,
                  fontSize: 15,
                  fontWeight: 500,
                  textDecoration: "none",
                  backdropFilter: "blur(8px)",
                  transition: "all 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--blue)";
                  e.currentTarget.style.background = "rgba(37, 99, 235, 0.2)";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.16)";
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)";
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
                  background: "rgba(255, 255, 255, 0.08)",
                  border: "1px solid rgba(255, 255, 255, 0.16)",
                  color: "#ffffff",
                  padding: "14px 26px",
                  borderRadius: 8,
                  fontSize: 15,
                  fontWeight: 500,
                  textDecoration: "none",
                  backdropFilter: "blur(8px)",
                  transition: "all 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--blue)";
                  e.currentTarget.style.background = "rgba(37, 99, 235, 0.2)";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.16)";
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)";
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
