"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Brain,
  Code2,
  Network,
  Smartphone,
  Shield,
  ArrowRight,
  Users,
  Mail,
  MessageCircle,
  Sparkles,
  CheckCircle2,
  Server,
  Building2,
  Briefcase,
  Rocket,
  ShoppingBag,
  Database,
  Lock,
  Workflow,
  Terminal,
} from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";
import HomeFaqAccordion from "@/components/sections/HomeFaqAccordion";

interface HomeClientProps {
  companyInfo: any;
  homepageData: any;
  services?: any[];
  industries?: any[];
  faqs: any[];
  aboutContent: any;
}

export default function HomeClient({
  companyInfo,
  homepageData,
  faqs,
  aboutContent,
}: HomeClientProps) {
  const heroContent = {
    eyebrow: companyInfo.name,
    headingNormal: homepageData.heroTitleNormal || "Connecting Business",
    headingHighlight: homepageData.heroTitleHighlight || "Technology",
    subheading: homepageData.heroSubtitle || "PK IT Consultants helps startups, SMBs, enterprises, and e-commerce leaders architect sovereign AI solutions, custom software platforms, and resilient mobile applications.",
    primaryCta: homepageData.ctaText || "Book Architecture Scoping",
    secondaryCta: "Explore Engineering Disciplines",
  };

  return (
    <div className="pkit-root">
      <style>{`
        .pkit-root {
          background: var(--bg);
          color: var(--text);
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          min-height: 100vh;
          position: relative;
          overflow-x: hidden;
        }
        .pkit-root * { box-sizing: border-box; }
        .font-display { font-family: 'Space Grotesk', system-ui, sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }

        .bg-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(to right, rgba(37, 99, 235, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(37, 99, 235, 0.08) 1px, transparent 1px);
          background-size: 64px 64px;
          mask-image: radial-gradient(ellipse 80% 50% at 50% 0%, black 40%, transparent 100%);
          opacity: 0.45;
          pointer-events: none;
        }

        .hero-backdrop-container {
          position: absolute;
          inset: 0;
          height: 100%;
          overflow: hidden;
          z-index: 0;
        }

        .hero-vignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 75% 30%, rgba(10, 37, 64, 0.4) 0%, rgba(6, 17, 31, 0.85) 60%, rgba(6, 17, 31, 0.98) 100%),
                      linear-gradient(180deg, rgba(6, 17, 31, 0.7) 0%, rgba(6, 17, 31, 0.95) 75%, #06111F 100%);
        }

        .badge-gold {
          background: rgba(200, 155, 60, 0.12);
          color: var(--gold);
          border: 1px solid rgba(200, 155, 60, 0.35);
        }

        .architectural-panel {
          background: linear-gradient(135deg, rgba(10, 37, 64, 0.75) 0%, rgba(6, 17, 31, 0.9) 100%);
          border: 1px solid rgba(200, 155, 60, 0.28);
          border-radius: 16px;
          box-shadow: 0 20px 50px -10px rgba(0, 0, 0, 0.5);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .architectural-panel:hover {
          border-color: rgba(200, 155, 60, 0.55);
          transform: translateY(-3px);
          box-shadow: 0 26px 60px -8px rgba(0, 0, 0, 0.65);
        }

        .discipline-card {
          position: relative;
          background: linear-gradient(180deg, #0A2540 0%, #06111F 100%);
          border: 1px solid rgba(37, 99, 235, 0.22);
          border-radius: 18px;
          padding: 32px 28px;
          display: flex;
          flex-direction: column;
          justifyContent: space-between;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          overflow: hidden;
        }
        .discipline-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, var(--gold), var(--blue));
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .discipline-card:hover {
          border-color: rgba(200, 155, 60, 0.45);
          transform: translateY(-4px);
          box-shadow: 0 22px 50px -10px rgba(0, 0, 0, 0.5);
        }
        .discipline-card:hover::before {
          opacity: 1;
        }

        .customer-card {
          background: rgba(10, 37, 64, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 14px;
          padding: 26px;
          transition: all 0.25s ease;
        }
        .customer-card:hover {
          border-color: var(--blue);
          background: rgba(10, 37, 64, 0.85);
          transform: translateY(-2px);
        }

        .process-node {
          background: #0A2540;
          border: 1px solid rgba(200, 155, 60, 0.3);
          border-radius: 12px;
          width: 52px;
          height: 52px;
          display: flex;
          align-items: center;
          justifyContent: center;
          color: var(--gold);
          font-family: 'JetBrains Mono', monospace;
          font-weight: 700;
          flex-shrink: 0;
        }

        @media (max-width: 900px) {
          .hero-split-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .hero-architecture-window {
            height: 340px !important;
          }
        }
      `}</style>

      {/* ─── 1. CINEMATIC HERO: DUBAI SKYLINE & ARCHITECTURAL PRECISION ──── */}
      <header
        style={{
          position: "relative",
          minHeight: "88vh",
          display: "flex",
          alignItems: "center",
          paddingTop: 80,
          paddingBottom: 72,
          overflow: "hidden",
        }}
      >
        {/* Full-bleed Dubai Architecture Photography Background */}
        <div className="hero-backdrop-container">
          <Image
            src="/images/dubai/dubai-frame-sunset.png"
            alt="Dubai Frame architectural sunset framing the Downtown Dubai skyline"
            fill
            priority
            sizes="100vw"
            style={{
              objectFit: "cover",
              objectPosition: "center 38%",
              filter: "brightness(0.85) contrast(1.1)",
            }}
          />
          <div className="hero-vignette" />
          <div className="bg-grid" />
        </div>

        <div className="max-wrap" style={{ position: "relative", zIndex: 1, width: "100%", padding: "0 24px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.15fr 0.85fr",
              gap: 48,
              alignItems: "center",
            }}
            className="hero-split-grid"
          >
            {/* Left Column: Editorial Brand Typography */}
            <div>
              <Reveal>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                  <span className="badge-gold font-mono" style={{ padding: "6px 14px", borderRadius: 999, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", display: "inline-flex", alignItems: "center", gap: 8 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--gold)", boxShadow: "0 0 6px var(--gold)" }} />
                    DUBAI, UAE • 25.2048° N, 55.2708° E • DIFC TECH HUB
                  </span>
                </div>
              </Reveal>

              <Reveal delay={80}>
                <h1
                  className="font-display"
                  style={{
                    fontSize: "clamp(34px, 5.2vw, 58px)",
                    lineHeight: 1.08,
                    fontWeight: 800,
                    letterSpacing: "-0.03em",
                    color: "#ffffff",
                  }}
                >
                  {heroContent.headingNormal}
                  <br />
                  with <span style={{ color: "var(--blue)" }}>{heroContent.headingHighlight}</span>.
                </h1>
              </Reveal>

              <Reveal delay={150}>
                <p
                  style={{
                    color: "var(--muted)",
                    fontSize: "clamp(16px, 1.8vw, 18px)",
                    lineHeight: 1.75,
                    marginTop: 22,
                    maxWidth: 560,
                  }}
                >
                  Headquartered in Dubai, PK IT Consultants designs and delivers high-performance sovereign AI platforms, custom software architectures, and scalable mobile systems with a strict senior-engineers-only delivery model.
                </p>
              </Reveal>

              <Reveal delay={220}>
                <div style={{ display: "flex", gap: 14, marginTop: 32, flexWrap: "wrap", alignItems: "center" }}>
                  <Link
                    href="/contact"
                    className="btn-primary"
                    style={{
                      padding: "14px 28px",
                      fontSize: 15,
                      fontWeight: 600,
                      borderRadius: 10,
                      background: "linear-gradient(135deg, var(--blue) 0%, #1D4ED8 100%)",
                      boxShadow: "0 8px 24px -6px rgba(37, 99, 235, 0.6)",
                      border: "1px solid rgba(255, 255, 255, 0.15)",
                    }}
                  >
                    {heroContent.primaryCta} <ArrowRight size={16} />
                  </Link>

                  <Link
                    href="/services"
                    className="btn-secondary"
                    style={{
                      padding: "14px 26px",
                      fontSize: 15,
                      borderRadius: 10,
                      border: "1px solid rgba(200, 155, 60, 0.35)",
                      background: "rgba(6, 17, 31, 0.6)",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    {heroContent.secondaryCta}
                  </Link>
                </div>
              </Reveal>

              {/* Verified Trust & Operational Standards */}
              <Reveal delay={300}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: 18,
                    marginTop: 44,
                    paddingTop: 28,
                    borderTop: "1px solid rgba(200, 155, 60, 0.2)",
                    maxWidth: 560,
                  }}
                >
                  <div>
                    <span className="font-display" style={{ fontSize: 22, fontWeight: 800, color: "#ffffff" }}>
                      100%
                    </span>
                    <p style={{ color: "var(--muted)", fontSize: 12, marginTop: 4, lineHeight: 1.4 }}>
                      Senior Architects &amp; Engineers (Zero Outsourcing)
                    </p>
                  </div>
                  <div>
                    <span className="font-display" style={{ fontSize: 22, fontWeight: 800, color: "var(--gold)" }}>
                      GCC
                    </span>
                    <p style={{ color: "var(--muted)", fontSize: 12, marginTop: 4, lineHeight: 1.4 }}>
                      UAE Data Sovereignty &amp; Sovereign Cloud
                    </p>
                  </div>
                  <div>
                    <span className="font-display" style={{ fontSize: 22, fontWeight: 800, color: "var(--cyan)" }}>
                      99.9%
                    </span>
                    <p style={{ color: "var(--muted)", fontSize: 12, marginTop: 4, lineHeight: 1.4 }}>
                      Mission-Critical Architecture Reliability
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right Column: Architectural Telemetry Capsule */}
            <Reveal delay={180}>
              <div className="architectural-panel" style={{ padding: 28, position: "relative" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18, borderBottom: "1px solid rgba(255, 255, 255, 0.08)", paddingBottom: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--gold)", boxShadow: "0 0 8px var(--gold)" }} />
                    <span className="font-mono" style={{ fontSize: 11, color: "var(--gold)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                      DUBAI SYSTEM DISPATCH
                    </span>
                  </div>
                  <span className="badge-gold font-mono" style={{ fontSize: 10, padding: "3px 8px", borderRadius: 4 }}>
                    PRODUCTION
                  </span>
                </div>

                <div className="hero-architecture-window" style={{ position: "relative", width: "100%", height: 260, borderRadius: 12, overflow: "hidden", marginBottom: 20 }}>
                  <Image
                    src="/images/dubai/burj-khalifa.png"
                    alt="Burj Khalifa towering above the Downtown Dubai fountains"
                    fill
                    sizes="(max-width: 900px) 100vw, 480px"
                    style={{
                      objectFit: "cover",
                      objectPosition: "center 25%",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(to top, rgba(6, 17, 31, 0.95) 0%, rgba(6, 17, 31, 0.2) 60%, transparent 100%)",
                    }}
                  />
                  <div style={{ position: "absolute", bottom: 14, left: 16, right: 16 }}>
                    <p className="font-mono" style={{ fontSize: 11, color: "var(--gold)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                      Downtown Dubai Skyline
                    </p>
                    <h3 className="font-display" style={{ fontSize: 16, fontWeight: 700, color: "#ffffff", marginTop: 2 }}>
                      Engineered for Peak Concurrency
                    </h3>
                  </div>
                </div>

                {/* Technical Bulletins */}
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {[
                    { label: "Sovereign AI Models", desc: "Private on-premise & UAE cloud LLM fine-tuning" },
                    { label: "Direct Senior Delivery", desc: "Scoping architects write production code" },
                    { label: "Official Communications", desc: "M365 Enterprise Gateway: info@pkitconsultants.com" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 12,
                        padding: "10px 12px",
                        borderRadius: 8,
                        background: "rgba(6, 17, 31, 0.6)",
                        border: "1px solid rgba(255, 255, 255, 0.06)",
                      }}
                    >
                      <CheckCircle2 size={16} style={{ color: "var(--gold)", flexShrink: 0, marginTop: 2 }} />
                      <div>
                        <span style={{ fontSize: 13, fontWeight: 600, color: "#ffffff" }}>{item.label}</span>
                        <p style={{ fontSize: 12, color: "var(--muted)", margin: 0, marginTop: 2 }}>{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </header>

      {/* ─── 2. THE 4 CORE ENGINEERING DISCIPLINES (ARCHITECTURAL DOSSIER) ── */}
      <section id="services" className="section-pad" style={{ background: "#06111F", position: "relative", borderTop: "1px solid rgba(200, 155, 60, 0.2)" }}>
        <div className="max-wrap">
          <SectionHeader
            eyebrow="Core Disciplines"
            heading="Specialized Technology Capabilities for Dubai & Global Ventures"
            description="We avoid generic SaaS templates. Every platform, machine learning pipeline, and mobile tool is custom-authored by senior practitioners for your specific operational scale."
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 24,
              marginTop: 52,
            }}
          >
            {[
              {
                id: "ai-solutions",
                title: "AI Solutions",
                icon: Brain,
                eyebrow: "INTELLIGENT SYSTEMS",
                desc: "Enterprise LLM integration, autonomous business agents, private document RAG, and custom machine learning pipelines tuned to automate complex operations and reduce overhead.",
                bullets: [
                  "Private LLM deployment & sovereign fine-tuning",
                  "Agentic workflow automations with human-in-the-loop",
                  "Document intelligence & semantic search",
                  "Predictive analytics & automated dispatch engines",
                ],
                tech: ["Python", "PyTorch", "OpenAI", "LangChain", "HuggingFace"],
                href: "/services#ai-solutions",
              },
              {
                id: "software-dev",
                title: "Custom Software Development",
                icon: Code2,
                eyebrow: "MISSION-CRITICAL PLATFORMS",
                desc: "High-performance distributed systems, bespoke CRM & ERP platforms, and resilient web applications designed around your exact business logic with zero unnecessary bloat.",
                bullets: [
                  "Bespoke SaaS & multi-tenant cloud platforms",
                  "Internal operations & ERP/CRM workflow engines",
                  "High-concurrency transactional databases",
                  "Legacy modernization & monolithic decoupling",
                ],
                tech: ["TypeScript", "Next.js", "Node.js", "PostgreSQL", "Prisma"],
                href: "/services#software-dev",
              },
              {
                id: "it-consultancy",
                title: "IT Consultancy",
                icon: Network,
                eyebrow: "ARCHITECTURAL STRATEGY",
                desc: "Independent technical audits, database optimization, cloud migration strategies, and technical due diligence to ensure your systems withstand massive scale without crashing.",
                bullets: [
                  "Software architecture & database query audits",
                  "AWS & Azure sovereign cloud migration roadmaps",
                  "Zero-trust cybersecurity & OWASP audits",
                  "Technical due diligence for investments & M&A",
                ],
                tech: ["AWS", "Azure", "Docker", "Kubernetes", "Terraform"],
                href: "/services#it-consulting",
              },
              {
                id: "mobile-apps",
                title: "Mobile Application Development",
                icon: Smartphone,
                eyebrow: "NATIVE & HYBRID SYSTEMS",
                desc: "Fluid, sub-second latency iOS and Android mobile experiences. Engineered for high user retention, robust offline capabilities, and seamless enterprise backend synchronization.",
                bullets: [
                  "Native iOS (Swift) & Android (Kotlin) apps",
                  "High-performance React Native & Flutter codebases",
                  "Field staff & logistics offline-first mobile tools",
                  "Apple App Store & Google Play compliance & CI/CD",
                ],
                tech: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase"],
                href: "/services#mobile-apps",
              },
            ].map((discipline, idx) => {
              const IconComp = discipline.icon;
              return (
                <Reveal key={discipline.id} delay={idx * 80}>
                  <div className="discipline-card" style={{ height: "100%" }}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
                        <span className="font-mono" style={{ fontSize: 10.5, color: "var(--gold)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                          {discipline.eyebrow}
                        </span>
                        <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(37, 99, 235, 0.15)", border: "1px solid rgba(37, 99, 235, 0.35)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--cyan)" }}>
                          <IconComp size={20} />
                        </div>
                      </div>

                      <h3 className="font-display" style={{ fontSize: 22, fontWeight: 700, color: "#ffffff", letterSpacing: "-0.015em" }}>
                        {discipline.title}
                      </h3>

                      <p style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.7, marginTop: 12 }}>
                        {discipline.desc}
                      </p>

                      <div style={{ marginTop: 20, paddingTop: 16, borderTop: "1px solid rgba(255, 255, 255, 0.08)" }}>
                        <span className="font-mono" style={{ fontSize: 10.5, color: "var(--muted-2)", textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: 10 }}>
                          CORE CAPABILITIES
                        </span>
                        <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                          {discipline.bullets.map((b) => (
                            <li key={b} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13, color: "rgba(255, 255, 255, 0.85)", lineHeight: 1.45 }}>
                              <CheckCircle2 size={14} style={{ color: "var(--cyan)", flexShrink: 0, marginTop: 2 }} />
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div style={{ marginTop: 28, paddingTop: 18, borderTop: "1px solid rgba(255, 255, 255, 0.08)" }}>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
                        {discipline.tech.map((t) => (
                          <span
                            key={t}
                            style={{
                              fontSize: 11,
                              fontFamily: "'JetBrains Mono', monospace",
                              padding: "2px 8px",
                              borderRadius: 4,
                              background: "rgba(255, 255, 255, 0.06)",
                              color: "var(--muted)",
                              border: "1px solid rgba(255, 255, 255, 0.08)",
                            }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      <Link
                        href={discipline.href}
                        style={{
                          fontSize: 13.5,
                          fontWeight: 600,
                          color: "var(--gold)",
                          textDecoration: "none",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 6,
                          transition: "all 0.2s ease",
                        }}
                      >
                        Explore discipline blueprint <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── 3. TARGET CUSTOMER ARCHITECTURAL MATRIX ─────────────────────── */}
      <section className="section-pad" style={{ background: "linear-gradient(180deg, #06111F 0%, #0A2540 100%)", borderTop: "1px solid rgba(255, 255, 255, 0.08)" }}>
        <div className="max-wrap">
          <SectionHeader
            eyebrow="Target Customer Segments"
            heading="Tailored Technology Architectures for Distinct Commercial Stages"
            description="Whether launching a high-growth venture or refactoring legacy enterprise operations, our technical squads adapt to your exact scale and regulatory constraints."
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 20,
              marginTop: 48,
            }}
          >
            {[
              {
                title: "Startups & Scaleups",
                icon: Rocket,
                eyebrow: "RAPID DEPLOYMENT",
                challenge: "Need to launch a robust MVP fast without accumulating disastrous technical debt that blocks Series A funding.",
                solution: "We build modular, type-safe Next.js/PostgreSQL platforms designed to pass rigorous VC technical due diligence.",
              },
              {
                title: "Small & Medium Businesses",
                icon: Briefcase,
                eyebrow: "OPERATIONAL AUTOMATION",
                challenge: "Manual workflows, disconnected spreadsheets, and fragmented SaaS tools slowing company-wide throughput.",
                solution: "Custom internal ERPs, CRM automations, and unified API integrations that eliminate human data-entry bottlenecks.",
              },
              {
                title: "Enterprises & Conglomerates",
                icon: Building2,
                eyebrow: "SOVEREIGN SYSTEMS",
                challenge: "Strict GCC data residency, mission-critical uptime requirements, and complex legacy database migrations.",
                solution: "Sovereign on-premise AI, microservice refactoring, zero-trust security postures, and guaranteed 99.9% uptime SLAs.",
              },
              {
                title: "E-Commerce & Retail",
                icon: ShoppingBag,
                eyebrow: "HIGH CONCURRENCY",
                challenge: "Cart abandonment, slow mobile experiences, and inventory sync failures during flash sales and peak seasonal traffic.",
                solution: "Headless e-commerce engines, sub-second product catalog queries, real-time POS sync, and native mobile apps.",
              },
            ].map((cust, i) => {
              const IconComp = cust.icon;
              return (
                <Reveal key={cust.title} delay={i * 60}>
                  <div className="customer-card" style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                        <span className="font-mono" style={{ fontSize: 10, color: "var(--cyan)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                          {cust.eyebrow}
                        </span>
                        <div style={{ width: 34, height: 34, borderRadius: 8, background: "rgba(37, 99, 235, 0.15)", border: "1px solid rgba(37, 99, 235, 0.3)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--cyan)" }}>
                          <IconComp size={16} />
                        </div>
                      </div>
                      <h3 className="font-display" style={{ fontSize: 19, fontWeight: 700, color: "#ffffff" }}>
                        {cust.title}
                      </h3>
                      <div style={{ marginTop: 14 }}>
                        <span className="font-mono" style={{ fontSize: 10, color: "var(--gold)", textTransform: "uppercase" }}>THE BOTTLENECK:</span>
                        <p style={{ color: "var(--muted)", fontSize: 13, lineHeight: 1.6, marginTop: 4 }}>
                          {cust.challenge}
                        </p>
                      </div>
                      <div style={{ marginTop: 14 }}>
                        <span className="font-mono" style={{ fontSize: 10, color: "var(--cyan)", textTransform: "uppercase" }}>PK IT ARCHITECTURE:</span>
                        <p style={{ color: "rgba(255, 255, 255, 0.9)", fontSize: 13, lineHeight: 1.6, marginTop: 4 }}>
                          {cust.solution}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── 4. STRATEGIC DUBAI TECH INTERLUDE (MUSEUM OF THE FUTURE) ────── */}
      <section className="section-pad" style={{ position: "relative", background: "#06111F", borderTop: "1px solid rgba(200, 155, 60, 0.25)" }}>
        <div className="max-wrap">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 56,
              alignItems: "center",
            }}
            className="about-summary-grid"
          >
            {/* Left Column: Leadership & Delivery Model */}
            <Reveal>
              <div>
                <span className="badge-gold font-mono" style={{ padding: "5px 12px", borderRadius: 999, fontSize: 10.5, letterSpacing: "0.12em", textTransform: "uppercase", display: "inline-flex", alignItems: "center", gap: 6 }}>
                  DUBAI HERITAGE • SENIOR-ONLY DELIVERY
                </span>
                <h2
                  className="font-display"
                  style={{
                    fontSize: "clamp(26px, 3.8vw, 38px)",
                    fontWeight: 700,
                    color: "#ffffff",
                    letterSpacing: "-0.02em",
                    lineHeight: 1.18,
                    marginTop: 16,
                  }}
                >
                  The Architects Who Scope Your System Write Your Code
                </h2>
                <p style={{ color: "var(--muted)", fontSize: 16, lineHeight: 1.8, marginTop: 18 }}>
                  Most traditional agencies hand off discovery specs to junior contractors. At PK IT Consultants, we operate under a senior-engineers-only delivery model. Led by Founder &amp; Managing Director <strong>{aboutContent?.founder?.name || "M. Prasanna Kumar"}</strong>, our engineering architects work directly with your stakeholders to eliminate rework, reduce latency, and ensure architectural longevity.
                </p>

                <div
                  style={{
                    marginTop: 28,
                    background: "rgba(10, 37, 64, 0.6)",
                    border: "1px solid rgba(200, 155, 60, 0.25)",
                    borderRadius: 14,
                    padding: 22,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(200, 155, 60, 0.15)", border: "1px solid rgba(200, 155, 60, 0.35)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--gold)", flexShrink: 0 }}>
                      <Sparkles size={20} />
                    </div>
                    <div>
                      <h4 className="font-display" style={{ fontSize: 16, fontWeight: 700, color: "#ffffff" }}>
                        Direct Executive Engagement
                      </h4>
                      <p style={{ color: "var(--muted)", fontSize: 13.5, lineHeight: 1.6, marginTop: 4 }}>
                        Commercial contracts and technical milestones are supervised directly by leadership with transparent pricing, fixed scope delivery, and sovereign data residency assurance.
                      </p>
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: 28, display: "flex", gap: 14, flexWrap: "wrap" }}>
                  <Link href="/about" className="btn-secondary" style={{ padding: "12px 24px", fontSize: 14 }}>
                    Read Our Full Dubai Story <ArrowRight size={14} />
                  </Link>
                  <Link href="/contact" className="btn-primary" style={{ padding: "12px 24px", fontSize: 14 }}>
                    Meet Our Engineers
                  </Link>
                </div>
              </div>
            </Reveal>

            {/* Right Column: Museum of the Future Visual Card */}
            <Reveal delay={150}>
              <div className="architectural-panel" style={{ overflow: "hidden", position: "relative" }}>
                <div style={{ position: "relative", width: "100%", height: 420 }}>
                  <Image
                    src="/images/dubai/museum-of-the-future.png"
                    alt="Museum of the Future on Sheikh Zayed Road in Dubai with Arabic calligraphy"
                    fill
                    sizes="(max-width: 900px) 100vw, 540px"
                    style={{
                      objectFit: "cover",
                      objectPosition: "center 30%",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(to top, rgba(6, 17, 31, 0.95) 0%, rgba(6, 17, 31, 0.3) 60%, transparent 100%)",
                    }}
                  />
                  <div style={{ position: "absolute", bottom: 20, left: 24, right: 24 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--cyan)" }} />
                      <span className="font-mono" style={{ fontSize: 10.5, color: "var(--cyan)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                        FUTURE-PROOF ARCHITECTURE
                      </span>
                    </div>
                    <h3 className="font-display" style={{ fontSize: 20, fontWeight: 700, color: "#ffffff", lineHeight: 1.3 }}>
                      Pioneering Enterprise AI &amp; Resilient Systems
                    </h3>
                    <p style={{ color: "rgba(255, 255, 255, 0.75)", fontSize: 13, lineHeight: 1.5, marginTop: 4 }}>
                      Inspired by Dubai&apos;s technological foresight, we engineer software systems built to withstand the next decade of digital growth.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        <style>{`
          @media (max-width: 900px) {
            .about-summary-grid {
              grid-template-columns: 1fr !important;
              gap: 40px !important;
            }
          }
        `}</style>
      </section>

      {/* ─── 5. FULL-WIDTH PANORAMIC SCALE INTERLUDE: PALM JUMEIRAH ──────── */}
      <section
        style={{
          position: "relative",
          padding: "110px 24px",
          overflow: "hidden",
          borderTop: "1px solid rgba(200, 155, 60, 0.25)",
          borderBottom: "1px solid rgba(200, 155, 60, 0.25)",
        }}
      >
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
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(180deg, rgba(6, 17, 31, 0.94) 0%, rgba(10, 37, 64, 0.86) 50%, rgba(6, 17, 31, 0.96) 100%)",
            }}
          />
        </div>

        <div className="max-wrap" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <Reveal>
            <span className="badge-gold font-mono" style={{ padding: "6px 14px", borderRadius: 999, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 16 }}>
              SCALE &amp; PRECISION • 25.1124° N, 55.1390° E
            </span>
            <h2
              className="font-display"
              style={{
                fontSize: "clamp(28px, 4.2vw, 44px)",
                fontWeight: 700,
                color: "#ffffff",
                letterSpacing: "-0.02em",
                maxWidth: 860,
                marginInline: "auto",
                lineHeight: 1.18,
              }}
            >
              Architected for Uncompromised Scale Across the Arabian Gulf &amp; Global Enterprises
            </h2>
            <p
              style={{
                color: "rgba(255, 255, 255, 0.8)",
                fontSize: 16.5,
                lineHeight: 1.75,
                marginTop: 18,
                maxWidth: 680,
                marginInline: "auto",
              }}
            >
              From Dubai Internet City and DIFC to international multi-region clusters, our architectures handle heavy throughput, strict regional data governance, and non-negotiable operational reliability.
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
                      background: "rgba(6, 17, 31, 0.75)",
                      backdropFilter: "blur(12px)",
                      WebkitBackdropFilter: "blur(12px)",
                      border: "1px solid rgba(200, 155, 60, 0.25)",
                      borderRadius: 14,
                      padding: "24px 22px",
                      height: "100%",
                      transition: "all 0.25s ease",
                    }}
                  >
                    <div style={{ width: 38, height: 38, borderRadius: 8, background: "rgba(200, 155, 60, 0.12)", border: "1px solid rgba(200, 155, 60, 0.3)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--gold)", marginBottom: 14 }}>
                      <IconComp size={18} />
                    </div>
                    <h3 className="font-display" style={{ fontSize: 17, fontWeight: 700, color: "#ffffff" }}>
                      {pillar.title}
                    </h3>
                    <p style={{ color: "rgba(255, 255, 255, 0.7)", fontSize: 13.5, lineHeight: 1.6, marginTop: 8 }}>
                      {pillar.desc}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── 6. WHY PK IT (5 CORE PRINCIPLES) ────────────────────────────── */}
      <section id="why-us" className="section-pad" style={{ background: "#06111F" }}>
        <div className="max-wrap">
          <SectionHeader
            eyebrow="Our Engineering Philosophy"
            heading="Five Principles That Set Our Consultancy Apart"
            description="We build software that directly impacts our clients' balance sheets, operating margins, and competitive advantage."
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 24,
              marginTop: 48,
            }}
          >
            {[
              {
                title: "Business-First Thinking",
                icon: Briefcase,
                desc: "We prioritize ROI, operational margin expansion, and practical user adoption over unnecessary architectural complexity.",
              },
              {
                title: "Tailored Technology",
                icon: Workflow,
                desc: "Zero cookie-cutter templates. Systems are hand-coded to your team's exact workflow needs and existing software integrations.",
              },
              {
                title: "Modern Engineering",
                icon: Terminal,
                desc: "Type-safe TypeScript, Next.js, and containerized Docker backends that provide unmatched developer velocity and reliability.",
              },
              {
                title: "Scalable Solutions",
                icon: Database,
                desc: "Relational database designs tuned for high concurrent throughput, automatic backups, and seamless horizontal scaling.",
              },
              {
                title: "Long-Term Partnership",
                icon: Lock,
                desc: "We stand firmly behind our code with post-launch SLA support, transparent knowledge transfer, and full IP ownership transfer.",
              },
            ].map((principle, idx) => {
              const IconComp = principle.icon;
              return (
                <Reveal key={principle.title} delay={idx * 60}>
                  <div
                    style={{
                      background: "linear-gradient(180deg, #0A2540 0%, #06111F 100%)",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                      borderRadius: 14,
                      padding: 26,
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      transition: "all 0.25s ease",
                    }}
                  >
                    <div>
                      <div style={{ width: 42, height: 42, borderRadius: 10, background: "rgba(37, 99, 235, 0.15)", border: "1px solid rgba(37, 99, 235, 0.35)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--cyan)", marginBottom: 16 }}>
                        <IconComp size={20} />
                      </div>
                      <h3 className="font-display" style={{ fontSize: 18, fontWeight: 700, color: "#ffffff" }}>
                        {principle.title}
                      </h3>
                      <p style={{ color: "var(--muted)", fontSize: 13.5, lineHeight: 1.65, marginTop: 8 }}>
                        {principle.desc}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── 7. THE 7-STAGE IMPLEMENTATION FRAMEWORK ─────────────────────── */}
      <section id="process" className="section-pad" style={{ background: "linear-gradient(180deg, #06111F 0%, #0A2540 100%)", borderTop: "1px solid rgba(255, 255, 255, 0.08)" }}>
        <div className="max-wrap">
          <SectionHeader
            eyebrow="Implementation Framework"
            heading="Predictable, Stage-Gated Engineering Delivery"
            description="From initial architectural scoping to production deployment and long-term SLA support, our process is fully transparent with zero surprises."
          />

          <div style={{ marginTop: 52, position: "relative" }}>
            {[
              {
                num: "01",
                title: "Discovery & Architecture Scoping",
                desc: "We analyze your operational bottlenecks, technical constraints, data schemas, and regulatory mandates to craft an unambiguous engineering spec.",
              },
              {
                num: "02",
                title: "Technical Blueprint & System Design",
                desc: "Authorship of database schemas, API contracts, security boundaries, and cloud infrastructure topography before a single line of production code is written.",
              },
              {
                num: "03",
                title: "UI/UX & High-Fidelity Prototyping",
                desc: "Bespoke interface designs tailored to user workflows with interactive clickable prototypes and responsive styling across mobile and desktop.",
              },
              {
                num: "04",
                title: "Sprint-Based Engineering",
                desc: "Senior engineers execute bi-weekly sprints with continuous integration, automated unit testing, and live preview environments for executive review.",
              },
              {
                num: "05",
                title: "Security & Penetration Testing",
                desc: "Rigorous vulnerability assessments, OWASP compliance verification, load testing, and database query optimization under simulated stress.",
              },
              {
                num: "06",
                title: "Zero-Downtime Deployment",
                desc: "Containerized deployment to secure UAE or global cloud infrastructure with automated database migrations and failover monitoring.",
              },
              {
                num: "07",
                title: "Long-Term SLA & SRE Support",
                desc: "Continuous proactive monitoring, performance tuning, software updates, and immediate SLA response to guarantee uninterrupted business operations.",
              },
            ].map((p, i, arr) => (
              <Reveal key={p.num} delay={i * 60}>
                <div style={{ display: "flex", gap: 24, position: "relative", paddingBottom: i === arr.length - 1 ? 0 : 36 }}>
                  {i !== arr.length - 1 && (
                    <div
                      style={{
                        position: "absolute",
                        left: 25,
                        top: 52,
                        width: 2,
                        height: "calc(100% - 36px)",
                        background: "linear-gradient(180deg, var(--gold) 0%, var(--blue) 100%)",
                        opacity: 0.4,
                      }}
                    />
                  )}
                  <div className="process-node">
                    {p.num}
                  </div>
                  <div style={{ paddingTop: 4 }}>
                    <h3 className="font-display" style={{ fontSize: 18, fontWeight: 700, color: "#ffffff" }}>
                      {p.title}
                    </h3>
                    <p style={{ color: "var(--muted)", fontSize: 14.5, lineHeight: 1.65, marginTop: 6, maxWidth: 640 }}>
                      {p.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 8. TECHNOLOGIES WE WORK WITH ─────────────────────────────────── */}
      <section id="tech-stack" className="section-pad" style={{ background: "#06111F", borderTop: "1px solid rgba(255, 255, 255, 0.08)" }}>
        <div className="max-wrap">
          <SectionHeader
            eyebrow="Technology Ecosystem"
            heading="Modern, Battle-Tested Engineering Stacks"
            description="We build strictly with proven technologies that offer long-term maintainability, high performance, and extensive ecosystem support."
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 20,
              marginTop: 48,
            }}
          >
            {[
              { category: "Frontend & Mobile", items: ["Next.js (Turbopack)", "React 19", "TypeScript", "Tailwind CSS", "React Native", "Flutter"] },
              { category: "Backend & Systems", items: ["Node.js", "Python", "Prisma ORM", "PostgreSQL", "REST & GraphQL APIs", "Redis"] },
              { category: "Artificial Intelligence", items: ["OpenAI API", "LangChain", "PyTorch", "HuggingFace", "Vector Databases", "Local LLMs"] },
              { category: "Cloud & Security", items: ["Amazon Web Services", "Microsoft Azure", "Docker Containers", "GitHub Actions CI/CD", "OWASP Security", "Zero-Trust"] },
            ].map((stack, idx) => (
              <Reveal key={stack.category} delay={idx * 60}>
                <div
                  style={{
                    background: "rgba(10, 37, 64, 0.5)",
                    border: "1px solid rgba(200, 155, 60, 0.2)",
                    borderRadius: 14,
                    padding: 24,
                    height: "100%",
                  }}
                >
                  <span className="font-mono" style={{ fontSize: 11, color: "var(--gold)", letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: 14 }}>
                    {stack.category}
                  </span>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {stack.items.map((tech) => (
                      <span
                        key={tech}
                        style={{
                          fontSize: 12.5,
                          fontFamily: "'JetBrains Mono', monospace",
                          padding: "6px 12px",
                          borderRadius: 6,
                          background: "rgba(6, 17, 31, 0.8)",
                          color: "#ffffff",
                          border: "1px solid rgba(255, 255, 255, 0.1)",
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 9. FREQUENTLY ASKED QUESTIONS ───────────────────────────────── */}
      <section id="faqs" className="section-pad" style={{ background: "linear-gradient(180deg, #06111F 0%, #0A2540 100%)", borderTop: "1px solid rgba(255, 255, 255, 0.08)" }}>
        <div className="max-wrap">
          <SectionHeader
            eyebrow="Executive FAQ"
            heading="Frequently Asked Commercial & Technical Questions"
            description="Clear answers regarding our Dubai engagement models, fixed-scope delivery, senior squads, and sovereign data governance."
          />

          <HomeFaqAccordion faqs={faqs} />
        </div>
      </section>

      {/* ─── 10. CLOSING CTA BANNER: SOARING BURJ KHALIFA NIGHT BACKDROP ─── */}
      <section
        id="cta"
        style={{
          position: "relative",
          padding: "120px 24px",
          textAlign: "center",
          overflow: "hidden",
          borderTop: "1px solid rgba(200, 155, 60, 0.35)",
        }}
      >
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <Image
            src="/images/dubai/burj-khalifa.png"
            alt="Burj Khalifa towering over Downtown Dubai at night"
            fill
            sizes="100vw"
            style={{
              objectFit: "cover",
              objectPosition: "center 30%",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(180deg, rgba(6, 17, 31, 0.95) 0%, rgba(10, 37, 64, 0.88) 50%, rgba(6, 17, 31, 0.97) 100%)",
            }}
          />
        </div>

        <div className="max-wrap" style={{ position: "relative", zIndex: 1 }}>
          <Reveal>
            <span className="badge-gold font-mono" style={{ padding: "6px 14px", borderRadius: 999, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 18 }}>
              START AN ENGAGEMENT • DUBAI &amp; WORLDWIDE
            </span>
            <h2
              className="font-display"
              style={{
                fontSize: "clamp(30px, 4.8vw, 48px)",
                fontWeight: 700,
                color: "#ffffff",
                letterSpacing: "-0.02em",
                maxWidth: 760,
                margin: "0 auto",
                lineHeight: 1.15,
              }}
            >
              Ready to connect your business with high-performance technology?
            </h2>
          </Reveal>

          <Reveal delay={80}>
            <p
              style={{
                color: "rgba(255, 255, 255, 0.82)",
                fontSize: 17,
                lineHeight: 1.7,
                marginTop: 20,
                maxWidth: 580,
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              Book an initial architecture audit or scoping review. Our senior engineers in Dubai will evaluate your systems with honest, commercial precision.
            </p>
          </Reveal>

          <Reveal delay={160}>
            <div style={{ marginTop: 40, display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
              <Link
                href="/contact"
                className="btn-primary"
                style={{
                  padding: "15px 32px",
                  fontSize: 15,
                  fontWeight: 600,
                  borderRadius: 10,
                  background: "linear-gradient(135deg, var(--blue) 0%, #1D4ED8 100%)",
                  boxShadow: "0 8px 26px -6px rgba(37, 99, 235, 0.7)",
                }}
              >
                Book Technical Consultation <ArrowRight size={16} />
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
                  border: "1px solid rgba(37, 211, 102, 0.4)",
                  color: "#25D366",
                  padding: "15px 28px",
                  borderRadius: 10,
                  fontSize: 15,
                  fontWeight: 600,
                  textDecoration: "none",
                  transition: "all 0.25s ease",
                }}
              >
                <MessageCircle size={18} /> WhatsApp Business
              </a>

              <a
                href={`mailto:${companyInfo.email}`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  background: "rgba(255, 255, 255, 0.08)",
                  border: "1px solid rgba(255, 255, 255, 0.18)",
                  color: "#ffffff",
                  padding: "15px 28px",
                  borderRadius: 10,
                  fontSize: 15,
                  fontWeight: 500,
                  textDecoration: "none",
                  backdropFilter: "blur(8px)",
                  transition: "all 0.25s ease",
                }}
              >
                <Mail size={18} style={{ color: "var(--gold)" }} /> {companyInfo.email}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
