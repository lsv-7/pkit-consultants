"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Brain,
  Code2,
  Globe,
  Smartphone,
  Cloud,
  Shield,
  Network,
  Zap,
  ArrowRight,
  ChevronDown,
  CheckCircle2,
  Calendar,
  Layers,
  Database,
  Cpu,
  GitBranch,
  PhoneCall,
} from "lucide-react";
import Reveal from "@/components/ui/Reveal";

interface ServiceItem {
  title: string;
  slug: string;
  shortDescription: string;
  longDescription: string;
  icon: string;
  features: string[];
  technologies: string[];
}

interface ServicesClientProps {
  services: ServiceItem[];
  companyInfo: {
    name: string;
    tagline: string;
    whatsappLink: string;
  };
}

// Detailed service details lookup for full sections
const detailedServiceDetails: Record<
  string,
  {
    headline: string;
    problems: string[];
    idealFor: string;
  }
> = {
  "ai-solutions": {
    headline: "Unleash business efficiency with custom intelligence integrations",
    problems: [
      "Inability to handle massive customer support volumes without sacrificing quality",
      "Manual, error-prone data extraction and document processing workflows",
      "Lack of predictive insights to optimize business metrics or forecast demand",
    ],
    idealFor: "Enterprises seeking automation, SaaS platforms adding intelligence, or data-rich operational businesses.",
  },
  "software-dev": {
    headline: "Bespoke systems built around your exact commercial workflows",
    problems: [
      "Off-the-shelf software failing to align with your proprietary operations",
      "Isolated legacy systems that don't talk to each other, creating data silos",
      "Inability to scale software infrastructure as company transaction volume grows",
    ],
    idealFor: "Scaling companies requiring custom ERP/CRM engines, bespoke SaaS architectures, or high-security business platforms.",
  },
  "web-dev": {
    headline: "Blazing-fast, SEO-engineered web applications that convert",
    problems: [
      "Slow page load times hurting search rankings and customer retention",
      "Rigid CMS setups preventing marketing teams from updating content independently",
      "Outdated frontend designs failing to reflect premium brand identity",
    ],
    idealFor: "E-Commerce businesses, tech startups launching products, or premium corporate brands looking for digital leadership.",
  },
  "mobile-apps": {
    headline: "Fluid, high-performance mobile apps built for native platforms",
    problems: [
      "Slow, laggy cross-platform frameworks that frustrate end users",
      "Inefficient sync mechanisms resulting in high offline data loss",
      "Poor UI designs leading to high app store uninstall rates",
    ],
    idealFor: "Startups requiring mobile product launches, consumer-facing service businesses, or enterprise operations requiring mobile workforce apps.",
  },
  "cloud-solutions": {
    headline: "Fail-safe, self-healing cloud infrastructure optimized for cost",
    problems: [
      "High server hosting bills and unoptimized database resources",
      "Frequent application downtime during traffic spikes or deployment windows",
      "Manual deployment pipelines slowing down release cycles",
    ],
    idealFor: "SaaS companies, high-traffic consumer portals, or enterprises migrating from on-premise hardware to secure cloud environments.",
  },
  "cybersecurity": {
    headline: "Zero-trust system design to safeguard intellectual property",
    problems: [
      "Vulnerability to ransomware, SQL injections, and data breaches",
      "Lack of compliance with local and international data security standards (GDPR, UAE NESA)",
      "Unsecured API endpoints exposing private user coordinates to external threats",
    ],
    idealFor: "Fintech applications, healthcare systems, and corporate entities storing sensitive client or transaction records.",
  },
  "it-consulting": {
    headline: "Strategic technical roadmaps designed by veteran engineers",
    problems: [
      "Uncertainty about which technology stack to choose for a new project",
      "Lack of system design reviews leading to costly rewrites down the line",
      "Tech teams struggling with performance bottlenecks and query optimization",
    ],
    idealFor: "Executive teams seeking advisory roles, startups validating architectural designs, or businesses modernizing their technology operations.",
  },
  "digital-trans": {
    headline: "Streamline operations by automating manual administration tasks",
    problems: [
      "Staff spending hours copying data between isolated spreadsheets and software tools",
      "Frequent manual input errors costing financial or operational overhead",
      "Slow customer onboarding and support workflows due to disjointed tools",
    ],
    idealFor: "Operational logistics hubs, retail distributors, and professional services looking to eliminate administrative waste.",
  },
};

// Map string icon names to Lucide icons
const iconMap: Record<string, any> = {
  Brain: Brain,
  Code2: Code2,
  Globe: Globe,
  Smartphone: Smartphone,
  Cloud: Cloud,
  Shield: Shield,
  Network: Network,
  Zap: Zap,
};

export default function ServicesClient({ services, companyInfo }: ServicesClientProps) {
  // States
  const [activeTimelineStep, setActiveTimelineStep] = useState(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Development Process steps
  const timelineSteps = [
    {
      title: "Discovery",
      goal: "Align on scope and technical objectives",
      desc: "We perform discovery workshops to map your business goals, user requirements, and existing infrastructure. This aligns the business strategy with the code.",
      deliverables: ["Product Roadmap", "Functional Specifications", "Initial Estimates"],
    },
    {
      title: "Planning",
      goal: "Architect the platform blueprint",
      desc: "Our technical architects design the system layout, selecting the database engines, security protocols, API designs, and scaling guidelines.",
      deliverables: ["Database Entity Diagrams", "API Specifications", "Cloud Architecture Blueprint"],
    },
    {
      title: "UI/UX Design",
      goal: "Design high-fidelity user flows",
      desc: "Our designers build responsive interfaces, user interactions, and visual layouts. We iterate on clickable prototypes so you can preview the software.",
      deliverables: ["Interactive Wireframes", "High-Fidelity UI Screens", "Component Design Tokens"],
    },
    {
      title: "Development",
      goal: "Write clean, enterprise-ready code",
      desc: "Engineers build your solution using modular, test-driven code. We set up daily CI/CD builds, and keep progress transparent via weekly sprint demos.",
      deliverables: ["Secured Codebase Repository", "Fully-Functional Beta Features", "Unit & API Tests"],
    },
    {
      title: "Testing",
      goal: "Verify scalability and user scenarios",
      desc: "Our QA team audits the build for performance under traffic spikes, cross-device consistency, security gaps, and bug-free user flows.",
      deliverables: ["Automated Test Sweeps", "Vulnerability Audit Report", "User Acceptance Sign-off"],
    },
    {
      title: "Deployment",
      goal: "Zero-downtime launch to cloud environments",
      desc: "We deploy the production application to optimized servers (AWS, GCP, or Azure). We set up automated backups and real-time telemetry monitoring.",
      deliverables: ["Live Production Environment", "CDN & SSL Configuration", "Telemetry Alerts Dashboard"],
    },
    {
      title: "Support",
      goal: "Maintain speed, security, and updates",
      desc: "We monitor database performance, patch library dependencies, tune queries, and implement new iterations as your commercial transactions expand.",
      deliverables: ["Weekly Maintenance Logs", "24/7 Server Monitoring", "Continuous Feature Iterations"],
    },
  ];

  // Tech Stack categories
  const techStack = [
    {
      category: "Frontend",
      techs: [
        { name: "React", icon: Globe },
        { name: "Next.js", icon: Globe },
        { name: "TypeScript", icon: Code2 },
      ],
    },
    {
      category: "Backend & DB",
      techs: [
        { name: "Node.js", icon: Cpu },
        { name: "Python", icon: Code2 },
        { name: "PostgreSQL", icon: Database },
        { name: "Prisma", icon: Database },
      ],
    },
    {
      category: "Cloud & DevOps",
      techs: [
        { name: "Docker", icon: Layers },
        { name: "AWS", icon: Cloud },
        { name: "Azure", icon: Cloud },
        { name: "Google Cloud", icon: Cloud },
        { name: "GitHub", icon: GitBranch },
      ],
    },
    {
      category: "Artificial Intelligence",
      techs: [{ name: "OpenAI API", icon: Brain }],
    },
  ];

  // Why Choose PKIT
  const whyChoosePkit = [
    {
      title: "Custom-built solutions",
      desc: "We never use bloated, generic templates. Every line of code is engineered for your business processes, ensuring maximum performance.",
    },
    {
      title: "Scalable architecture",
      desc: "We plan for growth. Our system designs withstand high transaction traffic, preventing memory leaks, server crashes, and database locking.",
    },
    {
      title: "Security-first development",
      desc: "Zero-trust security models, secure API endpoints, encrypted data pipelines, and vulnerability assessments are baked in from sprint one.",
    },
    {
      title: "Transparent communication",
      desc: "Direct access to senior engineering managers. We share weekly Git commits, clear dashboard progress, and host live demo meetings.",
    },
    {
      title: "Agile delivery",
      desc: "We build iteratively and ship early features. This gathers real-world stakeholder feedback quickly and eliminates market delays.",
    },
    {
      title: "Long-term support",
      desc: "We remain your partner post-launch, delivering database query optimization, security upgrades, and feature additions as transactions scale.",
    },
  ];

  // FAQs
  const faqs = [
    {
      q: "How long does a typical software project take?",
      a: "Discovery and design prototypes generally take 3–5 weeks. Core development cycles scale based on feature complexity, with initial production betas shipping in 2 to 4 months. We provide detailed timeline estimates after scoping workshops.",
    },
    {
      q: "Do you work with startups as well as established enterprises?",
      a: "Yes. For tech startups, we build lean, premium MVPs optimized for rapid validation and user growth. For enterprises, we design high-security SaaS platforms, custom CRM/ERP integrations, and legacy modernization pipelines.",
    },
    {
      q: "Can you take over or modernize existing software?",
      a: "Absolutely. We perform code audits to check database efficiency, library vulnerabilities, and architectural bottlenecks. We then construct a step-by-step modernization strategy to modernize your system without disrupting current operations.",
    },
    {
      q: "Do you provide post-launch maintenance and support?",
      a: "Yes, we offer ongoing maintenance agreements. This covers telemetry monitoring, package version updates, query tuning, security patches, and incremental feature requests.",
    },
    {
      q: "Can you build custom generative AI-powered solutions?",
      a: "Yes. We integrate generative AI models (OpenAI, Anthropic, or open-source LLMs), build automated chatbot representatives, engineer intelligent search using vector databases, and automate manual document processing.",
    },
  ];

  return (
    <div className="pkit-root-page" style={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}>
      {/* Dynamic Backgrounds matching home */}
      <div className="bg-grid" style={{ opacity: 0.3 }} />
      <div className="glow-blue" style={{ top: -100, right: "10%", opacity: 0.25 }} />
      <div className="glow-blue" style={{ top: 800, left: "-10%", opacity: 0.15 }} />

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* 1. HERO SECTION */}
        <section style={{ paddingTop: 80, paddingBottom: 80 }} className="max-wrap">
          <div style={{ maxWidth: 840, margin: "0 auto", textAlign: "center", padding: "0 20px" }}>
            <Reveal>
              <span className="eyebrow" style={{ letterSpacing: "0.08em" }}>
                Technology Solutions
              </span>
            </Reveal>
            <Reveal delay={80}>
              <h1
                className="font-display"
                style={{
                  fontSize: "clamp(34px, 5.5vw, 62px)",
                  fontWeight: 800,
                  color: "var(--text)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.03em",
                  marginTop: 18,
                }}
              >
                Engineering Digital Solutions That Scale Businesses
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p
                style={{
                  color: "var(--muted)",
                  fontSize: "clamp(15px, 2vw, 18.5px)",
                  lineHeight: 1.7,
                  marginTop: 22,
                  maxWidth: 680,
                  marginInline: "auto",
                }}
              >
                At {companyInfo.name}, we build robust digital platforms, deploy secure artificial intelligence solutions,
                architect cloud environments, and modernize legacy software. We write clean, tested code that drives profit.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div
                style={{
                  display: "flex",
                  gap: 16,
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 36,
                  flexWrap: "wrap",
                }}
              >
                <Link href="/contact" className="btn-primary" style={{ padding: "13px 28px", fontSize: 15 }}>
                  Book Consultation <ArrowRight size={16} />
                </Link>
                <Link href="/contact" className="btn-secondary" style={{ padding: "13px 28px", fontSize: 15 }}>
                  Contact Us
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 2. SERVICES GRID */}
        <section style={{ paddingBottom: 112 }} className="max-wrap section-pad">
          <div style={{ marginBottom: 56, textAlign: "center" }}>
            <Reveal>
              <span className="eyebrow">Services Catalog</span>
              <h2 className="font-display" style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 700, marginTop: 12 }}>
                Our Core Technical Capabilities
              </h2>
              <p style={{ color: "var(--muted)", fontSize: 16, marginTop: 12, maxWidth: 540, marginInline: "auto" }}>
                Select a discipline below to view benefits, or scroll down to explore detailed project implementation details.
              </p>
            </Reveal>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 24,
            }}
          >
            {services.map((s, i) => {
              const IconComp = iconMap[s.icon] || Code2;
              return (
                <Reveal key={s.slug} delay={i * 65}>
                  <div
                    className="card service-grid-card"
                    style={{
                      padding: 28,
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <div className="icon-box" style={{ marginBottom: 20 }}>
                        <IconComp size={22} />
                      </div>
                      <h3
                        className="font-display"
                        style={{ fontSize: 20, fontWeight: 600, color: "var(--text)" }}
                      >
                        {s.title}
                      </h3>
                      <p
                        style={{
                          color: "var(--muted)",
                          fontSize: 14.5,
                          lineHeight: 1.6,
                          marginTop: 12,
                          marginBottom: 20,
                        }}
                      >
                        {s.shortDescription}
                      </p>
                      <div style={{ marginTop: 16 }}>
                        <span
                          className="font-mono"
                          style={{
                            fontSize: 10.5,
                            textTransform: "uppercase",
                            color: "var(--muted-2)",
                            letterSpacing: "0.05em",
                            display: "block",
                            marginBottom: 8,
                          }}
                        >
                          Key Benefits
                        </span>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                          {s.features.map((feat) => (
                            <span
                              key={feat}
                              className="font-mono"
                              style={{
                                fontSize: 11,
                                color: "var(--cyan)",
                                background: "rgba(94, 230, 255, 0.05)",
                                border: "1px solid rgba(94, 230, 255, 0.12)",
                                padding: "2px 8px",
                                borderRadius: 4,
                              }}
                            >
                              {feat}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div style={{ marginTop: 24, paddingTop: 16, borderTop: "1px solid var(--border-soft)" }}>
                      <a
                        href={`#section-${s.slug}`}
                        style={{
                          fontSize: 13,
                          fontWeight: 600,
                          color: "var(--text)",
                          textDecoration: "none",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 6,
                        }}
                        className="service-link-btn"
                      >
                        Learn More <ArrowRight size={14} className="arrow-icon" />
                      </a>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* 3. DETAILED SERVICE SECTIONS */}
        <section
          style={{ paddingBottom: 112, background: "var(--surface-bg-dark)" }}
          className="max-wrap section-pad"
        >
          <div style={{ marginBottom: 64, textAlign: "center" }}>
            <Reveal>
              <span className="eyebrow">Deep Dive</span>
              <h2 className="font-display" style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 700, marginTop: 12 }}>
                Service Implementations & Workflows
              </h2>
              <p style={{ color: "var(--muted)", fontSize: 16, marginTop: 12, maxWidth: 580, marginInline: "auto" }}>
                A granular look at the commercial problems we solve, technologies we use, and our engineering specifications.
              </p>
            </Reveal>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 88 }}>
            {services.map((s, idx) => {
              const IconComp = iconMap[s.icon] || Code2;
              const details = detailedServiceDetails[s.slug] || {
                headline: `High-quality development frameworks for ${s.title}`,
                problems: [
                  "System inefficiency and unoptimized resource usage",
                  "Vulnerability to security flaws or code failure points",
                  "Difficult maintenance due to undocumented backend logic",
                ],
                idealFor: "Businesses requiring robust custom technical implementation with structured codebases.",
              };

              return (
                <div
                  key={s.slug}
                  id={`section-${s.slug}`}
                  style={{
                    scrollMarginTop: 100,
                    background: "radial-gradient(ellipse at top left, var(--surface-2), var(--surface))",
                    border: "1px solid var(--border)",
                    borderRadius: 16,
                    padding: "48px 36px",
                  }}
                >
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr",
                      gap: 40,
                    }}
                    className="detail-service-grid"
                  >
                    {/* Column 1: Core Details */}
                    <div>
                      <div className="flex items-center gap-3.5" style={{ display: "flex", alignItems: "center", gap: 14 }}>
                        <div className="icon-box">
                          <IconComp size={20} />
                        </div>
                        <span
                          className="font-mono"
                          style={{
                            fontSize: 12,
                            textTransform: "uppercase",
                            color: "var(--cyan)",
                            letterSpacing: "0.05em",
                          }}
                        >
                          {s.title}
                        </span>
                      </div>

                      <h3
                        className="font-display"
                        style={{
                          fontSize: "clamp(22px, 3vw, 30px)",
                          fontWeight: 700,
                          lineHeight: 1.25,
                          marginTop: 20,
                          color: "var(--text)",
                        }}
                      >
                        {details.headline}
                      </h3>

                      <p
                        style={{
                          color: "var(--muted)",
                          fontSize: 15.5,
                          lineHeight: 1.7,
                          marginTop: 18,
                        }}
                      >
                        {s.longDescription}
                      </p>

                      <div style={{ marginTop: 28 }}>
                        <h4
                          className="font-mono"
                          style={{
                            fontSize: 11,
                            textTransform: "uppercase",
                            color: "var(--muted-2)",
                            letterSpacing: "0.08em",
                            marginBottom: 10,
                          }}
                        >
                          Technologies Used
                        </h4>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                          {s.technologies.map((tech) => (
                            <span
                              key={tech}
                              style={{
                                fontSize: 12,
                                color: "var(--text)",
                                background: "var(--surface-2)",
                                border: "1px solid var(--border-soft)",
                                padding: "4px 10px",
                                borderRadius: 6,
                              }}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div style={{ marginTop: 28, background: "rgba(255,255,255,0.02)", border: "1px dashed var(--border-soft)", borderRadius: 8, padding: 16 }}>
                        <span className="font-mono" style={{ fontSize: 10, textTransform: "uppercase", color: "var(--muted-2)", display: "block" }}>
                          Ideal For
                        </span>
                        <p style={{ fontSize: 13.5, color: "var(--muted)", marginTop: 6, lineHeight: 1.5 }}>
                          {details.idealFor}
                        </p>
                      </div>
                    </div>

                    {/* Column 2: Specs & Problems */}
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                      <div className="space-y-6">
                        {/* Problems solved */}
                        <div>
                          <span
                            className="font-mono"
                            style={{
                              fontSize: 11,
                              textTransform: "uppercase",
                              color: "var(--muted-2)",
                              letterSpacing: "0.08em",
                              display: "block",
                              marginBottom: 14,
                            }}
                          >
                            Business Problems We Solve
                          </span>
                          <ul style={{ listStyle: "none", padding: 0, margin: 0 }} className="space-y-3">
                            {details.problems.map((prob) => (
                              <li
                                key={prob}
                                style={{
                                  fontSize: 14,
                                  color: "var(--muted)",
                                  display: "flex",
                                  alignItems: "flex-start",
                                  gap: 10,
                                  lineHeight: 1.5,
                                  marginBottom: 12,
                                }}
                              >
                                <span style={{ color: "var(--red)", marginTop: 2, fontWeight: "bold" }}>✕</span>
                                <span>{prob}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div style={{ height: 1, background: "var(--border-soft)", margin: "24px 0" }} />

                        {/* Features */}
                        <div>
                          <span
                            className="font-mono"
                            style={{
                              fontSize: 11,
                              textTransform: "uppercase",
                              color: "var(--muted-2)",
                              letterSpacing: "0.08em",
                              display: "block",
                              marginBottom: 14,
                            }}
                          >
                            Our Deliverable Features
                          </span>
                          <ul style={{ listStyle: "none", padding: 0, margin: 0 }} className="space-y-3">
                            {s.features.map((feat) => (
                              <li
                                key={feat}
                                style={{
                                  fontSize: 14.5,
                                  color: "var(--text)",
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 10,
                                  marginBottom: 8,
                                }}
                              >
                                <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0" />
                                <span>{feat}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div style={{ marginTop: 32 }}>
                        <Link
                          href={`/contact?service=${encodeURIComponent(s.title)}`}
                          className="btn-primary"
                          style={{ width: "100%", justifyContent: "center", padding: "12px 24px" }}
                        >
                          Book {s.title} Consultation <ArrowRight size={15} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 4. OUR DEVELOPMENT PROCESS */}
        <section style={{ paddingBottom: 112 }} className="max-wrap section-pad">
          <div style={{ marginBottom: 64, textAlign: "center" }}>
            <Reveal>
              <span className="eyebrow">Execution Timeline</span>
              <h2 className="font-display" style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 700, marginTop: 12 }}>
                Our Strategic Development Process
              </h2>
              <p style={{ color: "var(--muted)", fontSize: 16, marginTop: 12, maxWidth: 540, marginInline: "auto" }}>
                An interactive walkthrough of how we transform complex business problems into clean, production software.
              </p>
            </Reveal>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: 36,
            }}
            className="timeline-grid"
          >
            {/* Timeline selector tabs */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }} className="timeline-tabs">
              {timelineSteps.map((step, idx) => (
                <button
                  key={step.title}
                  onClick={() => setActiveTimelineStep(idx)}
                  style={{
                    background: activeTimelineStep === idx ? "var(--surface-2)" : "transparent",
                    border: "1px solid",
                    borderColor: activeTimelineStep === idx ? "var(--border)" : "transparent",
                    borderRadius: 10,
                    padding: "16px 20px",
                    textAlign: "left",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    transition: "all 0.2s",
                  }}
                  className="timeline-tab-btn"
                >
                  <span
                    className="font-mono"
                    style={{
                      fontSize: 14,
                      fontWeight: "bold",
                      color: activeTimelineStep === idx ? "var(--cyan)" : "var(--muted-2)",
                      background: activeTimelineStep === idx ? "rgba(94, 230, 255, 0.08)" : "var(--surface-2)",
                      width: 28,
                      height: 28,
                      borderRadius: 6,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: activeTimelineStep === idx ? "1px solid rgba(94, 230, 255, 0.2)" : "1px solid var(--border-soft)",
                    }}
                  >
                    {idx + 1}
                  </span>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <span style={{ fontSize: 15.5, fontWeight: 600, color: activeTimelineStep === idx ? "var(--text)" : "var(--muted)" }}>
                      {step.title}
                    </span>
                    <span
                      style={{
                        fontSize: 11,
                        color: "var(--muted-2)",
                        marginTop: 2,
                        display: activeTimelineStep === idx ? "block" : "none",
                      }}
                      className="tab-goal-anim"
                    >
                      {step.goal}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* Timeline step content display */}
            <div
              style={{
                background: "radial-gradient(ellipse at top left, var(--surface-2), var(--surface))",
                border: "1px solid var(--border)",
                borderRadius: 16,
                padding: 40,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
              className="timeline-display-card"
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span className="eyebrow">Step {activeTimelineStep + 1}</span>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--blue)" }} />
                <span className="font-mono" style={{ fontSize: 12, color: "var(--cyan)", letterSpacing: "0.05em" }}>
                  {timelineSteps[activeTimelineStep].goal}
                </span>
              </div>

              <h3 className="font-display" style={{ fontSize: 28, fontWeight: 700, marginTop: 16, color: "var(--text)" }}>
                {timelineSteps[activeTimelineStep].title} Phase
              </h3>

              <p style={{ color: "var(--muted)", fontSize: 16, lineHeight: 1.7, marginTop: 18 }}>
                {timelineSteps[activeTimelineStep].desc}
              </p>

              <div style={{ height: 1, background: "var(--border-soft)", margin: "24px 0" }} />

              <div>
                <span
                  className="font-mono"
                  style={{
                    fontSize: 10.5,
                    textTransform: "uppercase",
                    color: "var(--muted-2)",
                    letterSpacing: "0.08em",
                    display: "block",
                    marginBottom: 12,
                  }}
                >
                  Key Deliverables
                </span>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                  {timelineSteps[activeTimelineStep].deliverables.map((del) => (
                    <div
                      key={del}
                      style={{
                        background: "var(--surface-2)",
                        border: "1px solid var(--border-soft)",
                        borderRadius: 8,
                        padding: "8px 14px",
                        fontSize: 13.5,
                        color: "var(--text)",
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                      }}
                    >
                      <CheckCircle2 size={14} className="text-emerald-400" />
                      <span>{del}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. TECHNOLOGY STACK */}
        <section
          style={{ paddingBottom: 112, background: "var(--surface-bg-dark)" }}
          className="max-wrap section-pad"
        >
          <div style={{ marginBottom: 56, textAlign: "center" }}>
            <Reveal>
              <span className="eyebrow">Tech Infrastructure</span>
              <h2 className="font-display" style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 700, marginTop: 12 }}>
                Our Core Technology Stack
              </h2>
              <p style={{ color: "var(--muted)", fontSize: 16, marginTop: 12, maxWidth: 540, marginInline: "auto" }}>
                We choose high-performance frameworks and reliable cloud environments to guarantee application speed and security.
              </p>
            </Reveal>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 24,
            }}
          >
            {techStack.map((group, idx) => (
              <Reveal key={group.category} delay={idx * 60}>
                <div className="card" style={{ padding: 24, height: "100%" }}>
                  <h3
                    className="font-mono"
                    style={{
                      fontSize: 12,
                      textTransform: "uppercase",
                      color: "var(--cyan)",
                      letterSpacing: "0.08em",
                      borderBottom: "1px solid var(--border-soft)",
                      paddingBottom: 12,
                      marginBottom: 16,
                    }}
                  >
                    {group.category}
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {group.techs.map((tech) => {
                      const TechIcon = tech.icon;
                      return (
                        <div
                          key={tech.name}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            padding: "6px 8px",
                            borderRadius: 6,
                          }}
                        >
                          <div
                            style={{
                              width: 26,
                              height: 26,
                              borderRadius: 4,
                              background: "var(--surface-2)",
                              border: "1px solid var(--border-soft)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "var(--blue)",
                            }}
                          >
                            <TechIcon size={14} />
                          </div>
                          <span style={{ fontSize: 14.5, fontWeight: 500, color: "var(--text)" }}>
                            {tech.name}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* 6. WHY CHOOSE PKIT */}
        <section style={{ paddingBottom: 112 }} className="max-wrap section-pad">
          <div style={{ marginBottom: 56, textAlign: "center" }}>
            <Reveal>
              <span className="eyebrow">Our Value</span>
              <h2 className="font-display" style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 700, marginTop: 12 }}>
                Why Choose PKIT Consultants?
              </h2>
              <p style={{ color: "var(--muted)", fontSize: 16, marginTop: 12, maxWidth: 540, marginInline: "auto" }}>
                We act as a committed technology partner, focusing on code quality, infrastructure safety, and transparent communication.
              </p>
            </Reveal>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 24,
            }}
          >
            {whyChoosePkit.map((item, idx) => (
              <Reveal key={item.title} delay={idx * 60}>
                <div className="card" style={{ padding: 28, height: "100%" }}>
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 8,
                      background: "rgba(0, 102, 255, 0.06)",
                      border: "1px solid rgba(0, 102, 255, 0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--blue)",
                      marginBottom: 16,
                    }}
                  >
                    <CheckCircle2 size={16} />
                  </div>
                  <h3 className="font-display" style={{ fontSize: 18, fontWeight: 600, color: "var(--text)" }}>
                    {item.title}
                  </h3>
                  <p style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.6, marginTop: 8 }}>
                    {item.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* 7. FAQ SECTION */}
        <section
          style={{ paddingBottom: 112, background: "var(--surface-bg-dark)" }}
          className="max-wrap section-pad"
        >
          <div style={{ marginBottom: 56, textAlign: "center" }}>
            <Reveal>
              <span className="eyebrow">Help Center</span>
              <h2 className="font-display" style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 700, marginTop: 12 }}>
                Frequently Asked Questions
              </h2>
              <p style={{ color: "var(--muted)", fontSize: 16, marginTop: 12, maxWidth: 540, marginInline: "auto" }}>
                Common technical and operational questions regarding project scopes, code ownership, and launch details.
              </p>
            </Reveal>
          </div>

          <div style={{ maxWidth: 760, margin: "0 auto", display: "flex", flexDirection: "column", gap: 16 }}>
            {faqs.map((faq, idx) => (
              <Reveal key={faq.q} delay={idx * 60}>
                <div
                  style={{
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    borderRadius: 12,
                    overflow: "hidden",
                    transition: "border-color 0.2s",
                  }}
                  className={`faq-item ${activeFaq === idx ? "active" : ""}`}
                >
                  <button
                    onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                    style={{
                      width: "100%",
                      background: "none",
                      border: "none",
                      padding: "20px 24px",
                      textAlign: "left",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 16,
                    }}
                  >
                    <span style={{ fontSize: 16, fontWeight: 600, color: "var(--text)" }}>
                      {faq.q}
                    </span>
                    <ChevronDown
                      size={16}
                      style={{
                        transform: activeFaq === idx ? "rotate(180deg)" : "rotate(0)",
                        transition: "transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                        color: "var(--muted)",
                      }}
                    />
                  </button>
                  <div
                    style={{
                      maxHeight: activeFaq === idx ? 500 : 0,
                      opacity: activeFaq === idx ? 1 : 0,
                      overflow: "hidden",
                      transition: "max-height 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s ease",
                    }}
                  >
                    <p
                      style={{
                        padding: "0 24px 20px 24px",
                        color: "var(--muted)",
                        fontSize: 14.5,
                        lineHeight: 1.6,
                      }}
                    >
                      {faq.a}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* 8. FINAL CTA */}
        <section style={{ paddingBottom: 112, paddingTop: 64 }} className="max-wrap">
          <div
            style={{
              background: "linear-gradient(135deg, var(--surface) 0%, var(--surface-2) 100%)",
              border: "1px solid var(--border)",
              borderRadius: 20,
              padding: "64px 40px",
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
              boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.7)",
            }}
          >
            {/* Subtle glow behind card */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 250,
                height: 250,
                background: "var(--blue)",
                borderRadius: "50%",
                filter: "blur(140px)",
                opacity: 0.15,
                pointerEvents: "none",
              }}
            />

            <div style={{ position: "relative", zIndex: 1 }}>
              <Reveal>
                <span className="eyebrow">Start Your Project</span>
                <h2
                  className="font-display"
                  style={{
                    fontSize: "clamp(26px, 4vw, 42px)",
                    fontWeight: 700,
                    marginTop: 14,
                    color: "var(--text)",
                  }}
                >
                  Ready to Build Your Next Digital Product?
                </h2>
                <p
                  style={{
                    color: "var(--muted)",
                    fontSize: 16.5,
                    lineHeight: 1.65,
                    marginTop: 14,
                    maxWidth: 580,
                    marginInline: "auto",
                  }}
                >
                  Book a free technology audit or scoping review. Our senior engineers will evaluate your architecture and provide actionable insights.
                </p>
              </Reveal>
              <Reveal delay={120}>
                <div
                  style={{
                    display: "flex",
                    gap: 16,
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 32,
                    flexWrap: "wrap",
                  }}
                >
                  <Link href="/contact" className="btn-primary" style={{ padding: "12px 26px" }}>
                    <Calendar size={15} style={{ marginRight: 6 }} /> Book Consultation
                  </Link>
                  <a
                    href={companyInfo.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary"
                    style={{
                      padding: "12px 26px",
                      background: "rgba(37, 211, 102, 0.08)",
                      borderColor: "rgba(37, 211, 102, 0.3)",
                      color: "#25D366",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(37, 211, 102, 0.14)";
                      e.currentTarget.style.borderColor = "rgba(37, 211, 102, 0.5)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(37, 211, 102, 0.08)";
                      e.currentTarget.style.borderColor = "rgba(37, 211, 102, 0.3)";
                    }}
                  >
                    <PhoneCall size={14} style={{ marginRight: 6 }} /> WhatsApp
                  </a>
                  <Link href="/contact" className="btn-secondary" style={{ padding: "12px 26px" }}>
                    Contact Us
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </div>

      <style>{`
        .service-grid-card {
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.25s ease, box-shadow 0.3s ease !important;
        }
        .service-grid-card:hover {
          transform: translateY(-6px);
          border-color: rgba(0, 102, 255, 0.45) !important;
          box-shadow: 0 12px 30px -8px rgba(0, 102, 255, 0.12);
        }
        .service-link-btn {
          transition: color 0.2s ease;
        }
        .service-link-btn:hover {
          color: var(--blue) !important;
        }
        .service-link-btn .arrow-icon {
          transition: transform 0.2s ease;
        }
        .service-link-btn:hover .arrow-icon {
          transform: translateX(4px);
        }
        
        .timeline-tab-btn {
          border-color: transparent !important;
        }
        .timeline-tab-btn:hover {
          background: var(--surface-2) !important;
          border-color: var(--border-soft) !important;
        }

        .faq-item:hover {
          border-color: var(--border-soft) !important;
        }
        .faq-item.active {
          border-color: var(--border-soft) !important;
          box-shadow: 0 10px 20px -8px rgba(0, 0, 0, 0.4);
        }

        @media (min-width: 900px) {
          .detail-service-grid {
            grid-template-columns: 1.2fr 0.8fr !important;
            gap: 56px !important;
          }
          .timeline-grid {
            grid-template-columns: 300px 1fr !important;
            gap: 48px !important;
          }
        }
        
        @media (max-width: 899px) {
          .detail-service-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
          .timeline-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          .timeline-tabs {
            flex-direction: row !important;
            overflow-x: auto;
            padding-bottom: 8px;
            scrollbar-width: thin;
          }
          .timeline-tab-btn {
            flex-shrink: 0;
          }
          .tab-goal-anim {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
