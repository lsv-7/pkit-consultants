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
  Mail,
  Building2,
  Rocket,
  ShoppingBag,
} from "lucide-react";
import Reveal from "@/components/ui/Reveal";
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
  return (
    <div className="pkit-root">
      <style>{`
        .pkit-root {
          background: #071326;
          color: #F4F0E8;
          font-family: 'Inter', system-ui, sans-serif;
          min-height: 100vh;
          position: relative;
          overflow-x: hidden;
        }
        .font-serif {
          font-family: 'Cormorant Garamond', 'Playfair Display', Georgia, serif;
        }
        .font-sans {
          font-family: 'Inter', system-ui, sans-serif;
        }
        .font-cinzel {
          font-family: 'Cinzel', Georgia, serif;
        }
        .gold-glow {
          box-shadow: 0 0 30px rgba(213, 172, 66, 0.2);
        }
        .border-gold-hairline {
          border: 1px solid rgba(213, 172, 66, 0.2);
        }
      `}</style>

      {/* ─────────────────────────────────────────────────────────────────
          SECTION 1: HERO — CINEMATIC DUBAI SKYLINE & EDITORIAL REFINEMENT
      ───────────────────────────────────────────────────────────────── */}
      <section
        style={{
          position: "relative",
          minHeight: "92vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          padding: "100px 24px 72px",
        }}
      >
        {/* Authentic Dubai Skyline Background (Burj Khalifa Nocturnal Cityscape) */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            overflow: "hidden",
          }}
        >
          <Image
            src="/images/dubai/burj-khalifa.png"
            alt="Burj Khalifa and Downtown Dubai architectural skyline at night"
            fill
            priority
            quality={92}
            sizes="100vw"
            style={{
              objectFit: "cover",
              objectPosition: "center 32%",
              filter: "brightness(0.9) contrast(1.12)",
            }}
            className="hero-skyline-animated"
          />

          {/* Layered Cinematic Navy Gradient Overlay (Preserves Skyline Visibility) */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(7, 19, 38, 0.62) 0%, rgba(7, 19, 38, 0.28) 32%, rgba(7, 19, 38, 0.66) 70%, #071326 100%)",
            }}
          />

          {/* Atmospheric Gentle Ambient Lighting Pulse */}
          <div
            className="atmospheric-pulse"
            style={{
              position: "absolute",
              top: "28%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 760,
              height: 520,
              background:
                "radial-gradient(ellipse at center, rgba(37, 99, 235, 0.16) 0%, rgba(213, 172, 66, 0.08) 45%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          {/* Subtle Geometric Pattern Over the Background */}
          <div
            className="bg-islamic-pattern"
            style={{
              position: "absolute",
              inset: 0,
              opacity: 0.07,
              pointerEvents: "none",
            }}
          />

          {/* Subtle Vignette Overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "radial-gradient(circle at 50% 45%, transparent 48%, rgba(7, 19, 38, 0.68) 100%)",
              pointerEvents: "none",
            }}
          />
        </div>

        {/* Hero Foreground Content */}
        <div
          className="max-wrap"
          style={{
            position: "relative",
            zIndex: 10,
            textAlign: "center",
            maxWidth: 900,
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Refined Gold Eyebrow Badge */}
          <Reveal delay={100}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "6px 16px",
                borderRadius: 9999,
                background: "rgba(16, 30, 54, 0.7)",
                border: "1px solid rgba(213, 172, 66, 0.35)",
                backdropFilter: "blur(12px)",
                marginBottom: 20,
                boxShadow: "0 2px 14px rgba(0, 0, 0, 0.25)",
                maxWidth: "92vw",
              }}
            >
              <span style={{ color: "#D5AC42", fontSize: 9 }}>✦</span>
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "clamp(9.5px, 2.5vw, 11px)",
                  fontWeight: 600,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#EBD68C",
                  whiteSpace: "nowrap",
                }}
              >
                PK IT CONSULTANTS — DUBAI, UAE
              </span>
              <span style={{ color: "#D5AC42", fontSize: 9 }}>✦</span>
            </div>
          </Reveal>

          {/* Main Headline: DUBAI-BASED ENGINEERS / DRIVING DIGITAL GROWTH */}
          <Reveal delay={200}>
            <h1
              className="font-serif"
              style={{
                fontSize: "clamp(26px, 6.5vw, 54px)",
                fontWeight: 700,
                lineHeight: 1.14,
                letterSpacing: "-0.015em",
                color: "#F4F0E8",
                textTransform: "uppercase",
                margin: "0 0 18px",
                maxWidth: 820,
              }}
            >
              DUBAI-BASED ENGINEERS
              <br />
              <span
                style={{
                  fontStyle: "italic",
                  fontWeight: 400,
                  background: "linear-gradient(135deg, #D5AC42 0%, #EBD68C 50%, #D5AC42 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  display: "inline-block",
                  letterSpacing: "0.01em",
                }}
              >
                Driving Digital Growth
              </span>
            </h1>
          </Reveal>

          {/* Supporting Text with Controlled Proportions */}
          <Reveal delay={300}>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "clamp(14px, 2.5vw, 16px)",
                lineHeight: 1.7,
                color: "#9CAAC0",
                maxWidth: 620,
                margin: "0 auto 36px",
                fontWeight: 400,
              }}
            >
              PK IT Consultants helps startups, enterprises, and growing businesses accelerate digital transformation through AI solutions, custom software development, mobile applications, and strategic IT consultancy services.
            </p>
          </Reveal>

          {/* Proportional Action Buttons */}
          <Reveal delay={400}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 16,
                flexWrap: "wrap",
              }}
            >
              <Link
                href="/services"
                className="btn-gold-outline"
                style={{
                  padding: "12px 28px",
                  fontSize: 12,
                  letterSpacing: "0.12em",
                }}
              >
                <span>Explore Capabilities</span>
              </Link>

              <Link
                href="/contact"
                className="btn-gold-pill group"
                style={{
                  padding: "12px 28px",
                  fontSize: 12,
                  letterSpacing: "0.12em",
                }}
              >
                <span>Book Consultation</span>
                <ArrowRight size={13} className="transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>

          {/* Understated Scroll Indicator */}
          <Reveal delay={500}>
            <div
              style={{
                marginTop: 56,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
                opacity: 0.7,
              }}
            >
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 9.5,
                  fontWeight: 600,
                  letterSpacing: "0.26em",
                  textTransform: "uppercase",
                  color: "#D5AC42",
                }}
              >
                SCROLL TO EXPLORE
              </span>
              <div
                style={{
                  width: 1,
                  height: 28,
                  background: "linear-gradient(180deg, #D5AC42 0%, transparent 100%)",
                }}
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────
          SECTION 2: CONTINUOUS CINEMATIC MARQUEE DISCIPLINE TICKER
      ───────────────────────────────────────────────────────────────── */}
      <div
        className="marquee-container"
        style={{
          borderTop: "1px solid rgba(213, 172, 66, 0.18)",
          borderBottom: "1px solid rgba(213, 172, 66, 0.18)",
          background: "rgba(10, 23, 48, 0.75)",
          padding: "15px 0",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <div className="marquee-track">
          {[1, 2].map((trackIdx) => (
            <div
              key={trackIdx}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 36,
                whiteSpace: "nowrap",
                paddingRight: 36,
                fontSize: 11,
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#D5AC42",
              }}
            >
              <span>AI SOLUTIONS</span>
              <span style={{ color: "rgba(213, 172, 66, 0.4)", fontSize: 10 }}>✦</span>
              <span>CLOUD ARCHITECTURE</span>
              <span style={{ color: "rgba(213, 172, 66, 0.4)", fontSize: 10 }}>✦</span>
              <span>SOFTWARE ENGINEERING</span>
              <span style={{ color: "rgba(213, 172, 66, 0.4)", fontSize: 10 }}>✦</span>
              <span>CYBERSECURITY</span>
              <span style={{ color: "rgba(213, 172, 66, 0.4)", fontSize: 10 }}>✦</span>
              <span>MOBILE APPLICATIONS</span>
              <span style={{ color: "rgba(213, 172, 66, 0.4)", fontSize: 10 }}>✦</span>
              <span>DIGITAL TRANSFORMATION</span>
              <span style={{ color: "rgba(213, 172, 66, 0.4)", fontSize: 10 }}>✦</span>
            </div>
          ))}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────────
          SECTION 3: SERVICES — REFERENCE-STYLE ASYMMETRIC LAYOUT
      ───────────────────────────────────────────────────────────────── */}
      <section
        id="services-section"
        style={{
          padding: "120px 24px",
          position: "relative",
          background: "linear-gradient(180deg, #071326 0%, #0A1730 50%, #071326 100%)",
        }}
      >
        {/* Geometric Background Lattice */}
        <div
          className="bg-islamic-pattern"
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.12,
            pointerEvents: "none",
          }}
        />

        <div className="max-wrap" style={{ position: "relative", zIndex: 10 }}>
          {/* Section Heading */}
          <div style={{ textAlign: "center", maxWidth: 800, margin: "0 auto 72px" }}>
            <Reveal>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 16,
                }}
              >
                <span style={{ width: 6, height: 6, transform: "rotate(45deg)", background: "#D5AC42" }} />
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: "0.26em",
                    textTransform: "uppercase",
                    color: "#D5AC42",
                  }}
                >
                  OUR CAPABILITIES
                </span>
                <span style={{ width: 6, height: 6, transform: "rotate(45deg)", background: "#D5AC42" }} />
              </div>
            </Reveal>

            <Reveal delay={100}>
              <h2
                className="font-serif"
                style={{
                  fontSize: "clamp(26px, 3.2vw, 38px)",
                  fontWeight: 700,
                  letterSpacing: "-0.01em",
                  color: "#F4F0E8",
                  textTransform: "uppercase",
                  margin: 0,
                }}
              >
                CAPABILITIES ENGINEERED FOR AMBITION
              </h2>
            </Reveal>

            <Reveal delay={200}>
              <p
                style={{
                  fontSize: 16,
                  color: "#9CAAC0",
                  lineHeight: 1.7,
                  marginTop: 18,
                }}
              >
                We do not deploy generic software. Every platform is designed, tested, and shipped by senior architects to eliminate technical debt and accelerate commercial scale.
              </p>
            </Reveal>
          </div>

          {/* Asymmetric Service Showcase */}
          <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
            {/* Service 01: AI Solutions (Featured Large Panel) */}
            <Reveal>
              <div
                style={{
                  position: "relative",
                  borderRadius: 16,
                  overflow: "hidden",
                  border: "1px solid rgba(213, 172, 66, 0.25)",
                  background: "#101E36",
                  minHeight: 380,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  padding: "48px 40px",
                }}
                className="group"
              >
                {/* Background Image: Museum of the Future */}
                <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
                  <Image
                    src="/images/dubai/museum-of-the-future.png"
                    alt="Museum of the Future calligraphy architecture"
                    fill
                    sizes="(max-width: 1200px) 100vw, 1200px"
                    style={{
                      objectFit: "cover",
                      objectPosition: "center 35%",
                      filter: "brightness(0.4) contrast(1.1)",
                      transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                    className="group-hover:scale-105"
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(180deg, rgba(7, 19, 38, 0.3) 0%, rgba(7, 19, 38, 0.92) 80%, #071326 100%)",
                    }}
                  />
                </div>

                {/* Service Details */}
                <div style={{ position: "relative", zIndex: 10, maxWidth: 740 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
                    <span
                      style={{
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                        fontSize: 22,
                        fontWeight: 700,
                        color: "#D5AC42",
                      }}
                    >
                      01
                    </span>
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: "50%",
                        border: "1px solid rgba(213, 172, 66, 0.4)",
                        background: "rgba(7, 19, 38, 0.7)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#D5AC42",
                      }}
                    >
                      <Brain size={18} />
                    </div>
                    <span
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 11,
                        letterSpacing: "0.22em",
                        textTransform: "uppercase",
                        color: "#EBD68C",
                      }}
                    >
                      COGNITIVE INFRASTRUCTURE
                    </span>
                  </div>

                  <h3
                    className="font-serif"
                    style={{
                      fontSize: "clamp(26px, 3.2vw, 38px)",
                      fontWeight: 700,
                      color: "#F4F0E8",
                      marginBottom: 14,
                    }}
                  >
                    AI Solutions & Autonomous Workflows
                  </h3>

                  <p style={{ color: "#9CAAC0", fontSize: 15.5, lineHeight: 1.65, marginBottom: 24, maxWidth: 650 }}>
                    Enterprise machine learning pipelines, autonomous agent swarms, natural language models, and predictive analytics platforms custom-architected for resilient enterprise operational environments.
                  </p>

                  {/* Capability Tags */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 28 }}>
                    {["Autonomous Agents", "Custom LLM Orchestration", "Predictive Pipelines", "Vector Databases", "Data Privacy Alignment"].map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontSize: 11.5,
                          fontFamily: "'Inter', sans-serif",
                          letterSpacing: "0.06em",
                          padding: "5px 14px",
                          borderRadius: 9999,
                          border: "1px solid rgba(213, 172, 66, 0.3)",
                          background: "rgba(10, 23, 48, 0.55)",
                          color: "#EBD68C",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Link
                    href="/services"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      fontSize: 12.5,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "#F4F0E8",
                      textDecoration: "none",
                      fontWeight: 600,
                    }}
                    className="hover-gold"
                  >
                    <span>Inspect AI Architecture</span>
                    <ArrowRight size={14} style={{ color: "#D5AC42" }} />
                  </Link>
                </div>
              </div>
            </Reveal>

            {/* Services 02 & 03: Paired Asymmetric Row */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: 36,
              }}
            >
              {/* Service 02: Custom Software Development */}
              <Reveal delay={100}>
                <div
                  style={{
                    position: "relative",
                    borderRadius: 16,
                    overflow: "hidden",
                    border: "1px solid rgba(213, 172, 66, 0.25)",
                    background: "#101E36",
                    minHeight: 360,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    padding: "40px 32px",
                  }}
                  className="group"
                >
                  <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
                    <Image
                      src="/images/dubai/dubai-difc.jpg"
                      alt="DIFC modern financial architecture"
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      style={{
                        objectFit: "cover",
                        filter: "brightness(0.35) contrast(1.1)",
                        transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
                      }}
                      className="group-hover:scale-105"
                    />
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "linear-gradient(180deg, rgba(7, 19, 38, 0.2) 0%, rgba(7, 19, 38, 0.94) 75%, #071326 100%)",
                      }}
                    />
                  </div>

                  <div style={{ position: "relative", zIndex: 10 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                      <span
                        style={{
                          fontFamily: "'Cormorant Garamond', Georgia, serif",
                          fontSize: 20,
                          fontWeight: 700,
                          color: "#D5AC42",
                        }}
                      >
                        02
                      </span>
                      <div
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: "50%",
                          border: "1px solid rgba(213, 172, 66, 0.4)",
                          background: "rgba(7, 19, 38, 0.7)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#D5AC42",
                        }}
                      >
                        <Code2 size={16} />
                      </div>
                      <span style={{ fontSize: 10.5, letterSpacing: "0.2em", textTransform: "uppercase", color: "#EBD68C" }}>
                        CORE ENGINEERING
                      </span>
                    </div>

                    <h3
                      className="font-serif"
                      style={{ fontSize: 26, fontWeight: 700, color: "#F4F0E8", marginBottom: 12 }}
                    >
                      Custom Software Development
                    </h3>

                    <p style={{ color: "#9CAAC0", fontSize: 14.5, lineHeight: 1.6, marginBottom: 20 }}>
                      Fault-tolerant distributed backends, modern enterprise web platforms, and automated workflow engines constructed to handle high transaction volumes with zero downtime.
                    </p>

                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
                      {["Distributed Systems", "Cloud-Native APIs", "PostgreSQL & Prisma", "Microservices"].map((tag) => (
                        <span
                          key={tag}
                          style={{
                            fontSize: 11,
                            padding: "4px 12px",
                            borderRadius: 9999,
                            border: "1px solid rgba(213, 172, 66, 0.25)",
                            background: "rgba(10, 23, 48, 0.6)",
                            color: "#EBD68C",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <Link
                      href="/services"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 8,
                        fontSize: 12,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: "#F4F0E8",
                        textDecoration: "none",
                        fontWeight: 600,
                      }}
                      className="hover-gold"
                    >
                      <span>Explore Engineering</span>
                      <ArrowRight size={13} style={{ color: "#D5AC42" }} />
                    </Link>
                  </div>
                </div>
              </Reveal>

              {/* Service 03: IT Consultancy */}
              <Reveal delay={200}>
                <div
                  style={{
                    position: "relative",
                    borderRadius: 16,
                    overflow: "hidden",
                    border: "1px solid rgba(213, 172, 66, 0.25)",
                    background: "#101E36",
                    minHeight: 360,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    padding: "40px 32px",
                  }}
                  className="group"
                >
                  <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
                    <Image
                      src="/images/dubai/dubai-frame-sunset.png"
                      alt="Dubai Frame architectural sunset skyline"
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      style={{
                        objectFit: "cover",
                        filter: "brightness(0.35) contrast(1.1)",
                        transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
                      }}
                      className="group-hover:scale-105"
                    />
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "linear-gradient(180deg, rgba(7, 19, 38, 0.2) 0%, rgba(7, 19, 38, 0.94) 75%, #071326 100%)",
                      }}
                    />
                  </div>

                  <div style={{ position: "relative", zIndex: 10 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                      <span
                        style={{
                          fontFamily: "'Cormorant Garamond', Georgia, serif",
                          fontSize: 20,
                          fontWeight: 700,
                          color: "#D5AC42",
                        }}
                      >
                        03
                      </span>
                      <div
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: "50%",
                          border: "1px solid rgba(213, 172, 66, 0.4)",
                          background: "rgba(7, 19, 38, 0.7)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#D5AC42",
                        }}
                      >
                        <Network size={16} />
                      </div>
                      <span style={{ fontSize: 10.5, letterSpacing: "0.2em", textTransform: "uppercase", color: "#EBD68C" }}>
                        STRATEGIC ADVISORY
                      </span>
                    </div>

                    <h3
                      className="font-serif"
                      style={{ fontSize: 26, fontWeight: 700, color: "#F4F0E8", marginBottom: 12 }}
                    >
                      IT Consultancy & Architecture Audits
                    </h3>

                    <p style={{ color: "#9CAAC0", fontSize: 14.5, lineHeight: 1.6, marginBottom: 20 }}>
                      Strategic technology roadmaps, cloud modernization roadmaps, legacy migration planning, and infrastructure audits conducted by veteran architects.
                    </p>

                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
                      {["Enterprise Architecture", "Security Audits", "Cloud Migration", "Cost Optimization"].map((tag) => (
                        <span
                          key={tag}
                          style={{
                            fontSize: 11,
                            padding: "4px 12px",
                            borderRadius: 9999,
                            border: "1px solid rgba(213, 172, 66, 0.25)",
                            background: "rgba(10, 23, 48, 0.6)",
                            color: "#EBD68C",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <Link
                      href="/services"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 8,
                        fontSize: 12,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: "#F4F0E8",
                        textDecoration: "none",
                        fontWeight: 600,
                      }}
                      className="hover-gold"
                    >
                      <span>Explore Advisory</span>
                      <ArrowRight size={13} style={{ color: "#D5AC42" }} />
                    </Link>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Service 04: Mobile Application Development (Full Panel) */}
            <Reveal delay={100}>
              <div
                style={{
                  position: "relative",
                  borderRadius: 16,
                  overflow: "hidden",
                  border: "1px solid rgba(213, 172, 66, 0.25)",
                  background: "#101E36",
                  minHeight: 360,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  padding: "48px 40px",
                }}
                className="group"
              >
                <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
                  <Image
                    src="/images/dubai/dubai-marina.jpg"
                    alt="Dubai Marina illuminated skyline"
                    fill
                    sizes="(max-width: 1200px) 100vw, 1200px"
                    style={{
                      objectFit: "cover",
                      objectPosition: "center 45%",
                      filter: "brightness(0.35) contrast(1.1)",
                      transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                    className="group-hover:scale-105"
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(180deg, rgba(7, 19, 38, 0.3) 0%, rgba(7, 19, 38, 0.92) 80%, #071326 100%)",
                    }}
                  />
                </div>

                <div style={{ position: "relative", zIndex: 10, maxWidth: 740 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
                    <span
                      style={{
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                        fontSize: 22,
                        fontWeight: 700,
                        color: "#D5AC42",
                      }}
                    >
                      04
                    </span>
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: "50%",
                        border: "1px solid rgba(213, 172, 66, 0.4)",
                        background: "rgba(7, 19, 38, 0.7)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#D5AC42",
                      }}
                    >
                      <Smartphone size={18} />
                    </div>
                    <span style={{ fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "#EBD68C" }}>
                      CLIENT-EDGE PLATFORMS
                    </span>
                  </div>

                  <h3
                    className="font-serif"
                    style={{ fontSize: "clamp(26px, 3.2vw, 36px)", fontWeight: 700, color: "#F4F0E8", marginBottom: 14 }}
                  >
                    Mobile Application Development
                  </h3>

                  <p style={{ color: "#9CAAC0", fontSize: 15.5, lineHeight: 1.65, marginBottom: 24, maxWidth: 650 }}>
                    High-performance native iOS and Android applications built for enterprise security, fluid micro-interactions, biometrics, offline sync, and real-time push architecture.
                  </p>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 28 }}>
                    {["iOS (Swift)", "Android (Kotlin)", "Flutter Cross-Platform", "Biometric Auth", "Offline Sync"].map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontSize: 11.5,
                          padding: "5px 14px",
                          borderRadius: 9999,
                          border: "1px solid rgba(213, 172, 66, 0.3)",
                          background: "rgba(10, 23, 48, 0.55)",
                          color: "#EBD68C",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Link
                    href="/services"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      fontSize: 12.5,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "#F4F0E8",
                      textDecoration: "none",
                      fontWeight: 600,
                    }}
                    className="hover-gold"
                  >
                    <span>Inspect Mobile Frameworks</span>
                    <ArrowRight size={14} style={{ color: "#D5AC42" }} />
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────
          SECTION 4: ABOUT — EDITORIAL SPLIT LAYOUT (REFERENCE SCREENSHOT 4)
      ───────────────────────────────────────────────────────────────── */}
      <section
        id="about-section"
        style={{
          padding: "120px 24px",
          position: "relative",
          background: "#071326",
          borderTop: "1px solid rgba(213, 172, 66, 0.18)",
          borderBottom: "1px solid rgba(213, 172, 66, 0.18)",
        }}
      >
        <div className="max-wrap" style={{ position: "relative", zIndex: 10 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
              gap: 64,
              alignItems: "center",
            }}
          >
            {/* Left Column: Tall Editorial Photograph (Dubai Desert Golden Dunes) */}
            <Reveal>
              <div
                style={{
                  position: "relative",
                  borderRadius: 16,
                  overflow: "hidden",
                  border: "1px solid rgba(213, 172, 66, 0.35)",
                  boxShadow: "0 20px 50px rgba(0, 0, 0, 0.6)",
                  minHeight: 520,
                }}
              >
                <Image
                  src="/images/dubai/dubai-desert.jpg"
                  alt="Dunes in the Dubai Desert Conservation Reserve at golden hour"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(180deg, rgba(7, 19, 38, 0.1) 0%, rgba(7, 19, 38, 0.5) 100%)",
                  }}
                />
                {/* Gold Editorial Caption Plate */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 24,
                    left: 24,
                    right: 24,
                    padding: "16px 20px",
                    borderRadius: 10,
                    background: "rgba(7, 19, 38, 0.85)",
                    border: "1px solid rgba(213, 172, 66, 0.3)",
                    backdropFilter: "blur(12px)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 10,
                      fontWeight: 600,
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      color: "#D5AC42",
                      display: "block",
                      marginBottom: 4,
                    }}
                  >
                    DUBAI, UNITED ARAB EMIRATES
                  </span>
                  <p
                    style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      fontSize: 16,
                      color: "#F4F0E8",
                      fontStyle: "italic",
                      margin: 0,
                    }}
                  >
                    Architecting resilient technological foundations across the GCC.
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Right Column: Editorial Narrative & Founder Quote */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Reveal>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
                  <span style={{ width: 6, height: 6, transform: "rotate(45deg)", background: "#D5AC42" }} />
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 11,
                      fontWeight: 600,
                      letterSpacing: "0.26em",
                      textTransform: "uppercase",
                      color: "#D5AC42",
                    }}
                  >
                    OUR VISION
                  </span>
                </div>
              </Reveal>

              <Reveal delay={100}>
                <h2
                  className="font-serif"
                  style={{
                    fontSize: "clamp(26px, 3.2vw, 38px)",
                    fontWeight: 700,
                    lineHeight: 1.15,
                    letterSpacing: "-0.01em",
                    color: "#F4F0E8",
                    textTransform: "uppercase",
                    margin: "0 0 24px",
                  }}
                >
                  BORN IN DUBAI.
                  <br />
                  <span
                    style={{
                      fontStyle: "italic",
                      fontWeight: 400,
                      background: "linear-gradient(135deg, #D5AC42 0%, #EBD68C 50%, #D5AC42 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    Built for the Region.
                  </span>
                </h2>
              </Reveal>

              <Reveal delay={200}>
                <p style={{ color: "#9CAAC0", fontSize: 16, lineHeight: 1.75, marginBottom: 28 }}>
                  Founded at the intersection of international engineering discipline and Middle Eastern commercial velocity, PK IT Consultants connects complex business strategy with reliable, scalable digital execution.
                </p>
                <p style={{ color: "#9CAAC0", fontSize: 15.5, lineHeight: 1.7, marginBottom: 32 }}>
                  We operate on an uncompromising delivery standard: 100% senior architects on every engagement, direct executive visibility, and robust software architectures constructed to scale without refactoring.
                </p>
              </Reveal>

              {/* Elegant Italic Founder Quotation & Gold Attribution */}
              <Reveal delay={300}>
                <div
                  style={{
                    position: "relative",
                    padding: "24px 28px",
                    borderRadius: 12,
                    background: "rgba(16, 30, 54, 0.6)",
                    border: "1px solid rgba(213, 172, 66, 0.28)",
                    borderLeft: "4px solid #D5AC42",
                    marginBottom: 32,
                  }}
                >
                  <p
                    className="font-serif"
                    style={{
                      fontSize: 18.5,
                      lineHeight: 1.6,
                      color: "#F4F0E8",
                      fontStyle: "italic",
                      margin: "0 0 16px",
                    }}
                  >
                    “We founded PK IT Consultants on a simple premise: engineering excellence must directly accelerate enterprise business outcomes. No bloated junior teams, no generic templates — only bespoke, mission-critical digital architecture.”
                  </p>
                  <div>
                    <span
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 13,
                        fontWeight: 700,
                        color: "#EBD68C",
                        display: "block",
                      }}
                    >
                      M. Prasanna Kumar
                    </span>
                    <span
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 11,
                        color: "#9CAAC0",
                        letterSpacing: "0.06em",
                      }}
                    >
                      Founder & Managing Director, PK IT Consultants
                    </span>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={400}>
                <div style={{ display: "flex", gap: 18 }}>
                  <Link
                    href="/about"
                    className="btn-gold-pill"
                    style={{ padding: "12px 28px" }}
                  >
                    <span>Read Executive Profile</span>
                    <ArrowRight size={13} />
                  </Link>
                  <Link
                    href="/contact"
                    className="btn-gold-outline"
                    style={{ padding: "12px 28px" }}
                  >
                    <span>Book Scoping Session</span>
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────
          SECTION 5: TARGET CUSTOMER MATRIX
      ───────────────────────────────────────────────────────────────── */}
      <section
        style={{
          padding: "100px 24px",
          position: "relative",
          background: "linear-gradient(180deg, #071326 0%, #0A1730 100%)",
        }}
      >
        <div className="max-wrap" style={{ position: "relative", zIndex: 10 }}>
          <div style={{ textAlign: "center", maxWidth: 700, margin: "0 auto 64px" }}>
            <Reveal>
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.26em",
                  textTransform: "uppercase",
                  color: "#D5AC42",
                  display: "block",
                  marginBottom: 12,
                }}
              >
                WHO WE ACCELERATE
              </span>
            </Reveal>
            <Reveal delay={100}>
              <h2
                className="font-serif"
                style={{
                  fontSize: "clamp(26px, 3.2vw, 38px)",
                  fontWeight: 700,
                  color: "#F4F0E8",
                  textTransform: "uppercase",
                  margin: 0,
                }}
              >
                Tailored for High-Stakes Growth
              </h2>
            </Reveal>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 24,
            }}
          >
            {[
              {
                segment: "Startups & Scaleups",
                icon: Rocket,
                problem: "Moving too slowly or hitting technical debt with junior developers.",
                solution: "Rapid MVP architecture, production-ready scale, and resilient foundations for fundraising.",
              },
              {
                segment: "Small & Mid Enterprises",
                icon: Building2,
                problem: "Outdated software, manual workflows, and fragmented customer data.",
                solution: "Tailored custom ERPs, CRM automation, and unified cloud-native infrastructure.",
              },
              {
                segment: "Large Enterprises",
                icon: Shield,
                problem: "Legacy bottlenecks, security compliance vulnerabilities, and slow cycle velocity.",
                solution: "Autonomous AI pipelines, microservice modernization, and strict GCC data residency.",
              },
              {
                segment: "E-Commerce Operators",
                icon: ShoppingBag,
                problem: "Platform downtime during high-traffic sales, latency, and checkout drops.",
                solution: "Sub-second catalog caching, resilient payment routing, and real-time inventory sync.",
              },
            ].map((item, idx) => {
              const IconComp = item.icon;
              return (
                <Reveal key={item.segment} delay={idx * 100}>
                  <div
                    style={{
                      padding: "32px 28px",
                      borderRadius: 14,
                      background: "rgba(16, 30, 54, 0.6)",
                      border: "1px solid rgba(213, 172, 66, 0.2)",
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                      transition: "border-color 0.25s ease, transform 0.25s ease",
                    }}
                    className="hover:border-[#D5AC42] hover:-translate-y-1"
                  >
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 10,
                        background: "rgba(213, 172, 66, 0.12)",
                        border: "1px solid rgba(213, 172, 66, 0.3)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#D5AC42",
                        marginBottom: 20,
                      }}
                    >
                      <IconComp size={20} />
                    </div>

                    <h3
                      className="font-serif"
                      style={{
                        fontSize: 22,
                        fontWeight: 700,
                        color: "#F4F0E8",
                        marginBottom: 12,
                      }}
                    >
                      {item.segment}
                    </h3>

                    <div style={{ marginBottom: 16 }}>
                      <span
                        style={{
                          fontSize: 10,
                          fontWeight: 700,
                          letterSpacing: "0.15em",
                          textTransform: "uppercase",
                          color: "#EF4444",
                          display: "block",
                          marginBottom: 4,
                        }}
                      >
                        THE BOTTLENECK:
                      </span>
                      <p style={{ color: "#9CAAC0", fontSize: 13.5, lineHeight: 1.5, margin: 0 }}>
                        {item.problem}
                      </p>
                    </div>

                    <div style={{ marginTop: "auto" }}>
                      <span
                        style={{
                          fontSize: 10,
                          fontWeight: 700,
                          letterSpacing: "0.15em",
                          textTransform: "uppercase",
                          color: "#D5AC42",
                          display: "block",
                          marginBottom: 4,
                        }}
                      >
                        PK IT ARCHITECTURE:
                      </span>
                      <p style={{ color: "#F4F0E8", fontSize: 13.5, lineHeight: 1.5, margin: 0 }}>
                        {item.solution}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────
          SECTION 6: PALM JUMEIRAH SCALE & ENGINEERING ASSURANCE
      ───────────────────────────────────────────────────────────────── */}
      <section
        style={{
          position: "relative",
          padding: "120px 24px",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <Image
            src="/images/dubai/palm-jumeirah.png"
            alt="Aerial view of the Palm Jumeirah in Dubai"
            fill
            sizes="100vw"
            style={{
              objectFit: "cover",
              objectPosition: "center 40%",
              filter: "brightness(0.35) contrast(1.15)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, #071326 0%, rgba(7, 19, 38, 0.75) 50%, #071326 100%)",
            }}
          />
        </div>

        <div className="max-wrap" style={{ position: "relative", zIndex: 10 }}>
          <div style={{ textAlign: "center", maxWidth: 760, margin: "0 auto 64px" }}>
            <Reveal>
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.26em",
                  textTransform: "uppercase",
                  color: "#D5AC42",
                  display: "block",
                  marginBottom: 12,
                }}
              >
                ENGINEERED TO PERFECTION
              </span>
            </Reveal>
            <Reveal delay={100}>
              <h2
                className="font-serif"
                style={{
                  fontSize: "clamp(26px, 3.2vw, 38px)",
                  fontWeight: 700,
                  color: "#F4F0E8",
                  textTransform: "uppercase",
                  margin: 0,
                }}
              >
                Pillars of GCC Engineering Assurance
              </h2>
            </Reveal>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 24,
            }}
          >
            {[
              { title: "Senior Architects Only", desc: "Every line of code is produced or reviewed by veteran software architects with 10+ years in production systems." },
              { title: "Enterprise Data Privacy", desc: "System architectures engineered to support regional data residency and secure cloud privacy standards." },
              { title: "Zero Technical Debt", desc: "Modular, typed, fully documented codebases with automated CI/CD pipelines and regression test suites." },
              { title: "Business-First Value", desc: "We measure technical success by your business KPIs: conversion velocity, operational margin, and reliability." },
            ].map((pillar, idx) => (
              <Reveal key={pillar.title} delay={idx * 100}>
                <div
                  style={{
                    padding: "28px 24px",
                    borderRadius: 12,
                    background: "rgba(7, 19, 38, 0.75)",
                    border: "1px solid rgba(213, 172, 66, 0.3)",
                    backdropFilter: "blur(14px)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      fontSize: 22,
                      fontWeight: 700,
                      color: "#D5AC42",
                      display: "block",
                      marginBottom: 10,
                    }}
                  >
                    0{idx + 1}
                  </span>
                  <h3
                    className="font-serif"
                    style={{ fontSize: 20, fontWeight: 700, color: "#F4F0E8", marginBottom: 10 }}
                  >
                    {pillar.title}
                  </h3>
                  <p style={{ color: "#9CAAC0", fontSize: 13.5, lineHeight: 1.6, margin: 0 }}>
                    {pillar.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────
          SECTION 7: 7-STAGE IMPLEMENTATION BLUEPRINT
      ───────────────────────────────────────────────────────────────── */}
      <section
        style={{
          padding: "100px 24px",
          position: "relative",
          background: "#071326",
          borderTop: "1px solid rgba(213, 172, 66, 0.18)",
        }}
      >
        <div className="max-wrap" style={{ position: "relative", zIndex: 10 }}>
          <div style={{ textAlign: "center", maxWidth: 760, margin: "0 auto 60px" }}>
            <Reveal>
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.26em",
                  textTransform: "uppercase",
                  color: "#D5AC42",
                  display: "block",
                  marginBottom: 12,
                }}
              >
                EXECUTION PROTOCOL
              </span>
            </Reveal>
            <Reveal delay={100}>
              <h2
                className="font-serif"
                style={{
                  fontSize: "clamp(26px, 3.2vw, 38px)",
                  fontWeight: 700,
                  color: "#F4F0E8",
                  textTransform: "uppercase",
                  margin: 0,
                }}
              >
                The 7-Stage Engineering Roadmap
              </h2>
            </Reveal>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 20,
            }}
          >
            {[
              { step: "01", name: "Architectural Discovery", detail: "Deep scoping of business goals, technical constraints, security posture, and deployment roadmap." },
              { step: "02", name: "System Design & Blueprint", detail: "Formal architectural schemas, data flow models, database entities, and API contracts." },
              { step: "03", name: "Rapid Prototyping", detail: "Interactive UI/UX prototypes and core functional proofs of concept validated before build." },
              { step: "04", name: "Sprint-Based Engineering", detail: "Agile 2-week development sprints with automated linting, type-checks, and staging reviews." },
              { step: "05", name: "Security & Load Audits", detail: "Rigorous penetration testing, database index optimization, and high-concurrency benchmarks." },
              { step: "06", name: "Zero-Downtime Deployment", detail: "Blue/green or canary production rollout with monitoring alarms and automated fallbacks." },
              { step: "07", name: "SLA & Hypercare Support", detail: "Dedicated ongoing maintenance, continuous feature expansion, and guaranteed response SLAs." },
            ].map((stage, idx) => (
              <Reveal key={stage.step} delay={idx * 60}>
                <div
                  style={{
                    padding: "24px 20px",
                    borderRadius: 12,
                    background: "rgba(16, 30, 54, 0.45)",
                    border: "1px solid rgba(213, 172, 66, 0.2)",
                    display: "flex",
                    gap: 16,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      fontSize: 24,
                      fontWeight: 700,
                      color: "#D5AC42",
                      lineHeight: 1,
                    }}
                  >
                    {stage.step}
                  </span>
                  <div>
                    <h4
                      className="font-serif"
                      style={{ fontSize: 17, fontWeight: 700, color: "#F4F0E8", marginBottom: 6 }}
                    >
                      {stage.name}
                    </h4>
                    <p style={{ color: "#9CAAC0", fontSize: 13, lineHeight: 1.5, margin: 0 }}>
                      {stage.detail}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────
          SECTION 8: EXECUTIVE FAQ ACCORDION
      ───────────────────────────────────────────────────────────────── */}
      <section
        style={{
          padding: "100px 24px",
          position: "relative",
          background: "linear-gradient(180deg, #071326 0%, #0A1730 100%)",
          borderTop: "1px solid rgba(213, 172, 66, 0.18)",
        }}
      >
        <div className="max-wrap" style={{ maxWidth: 860, margin: "0 auto", position: "relative", zIndex: 10 }}>
          <div style={{ textAlign: "center", marginBottom: 54 }}>
            <Reveal>
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.26em",
                  textTransform: "uppercase",
                  color: "#D5AC42",
                  display: "block",
                  marginBottom: 12,
                }}
              >
                FREQUENTLY ASKED QUESTIONS
              </span>
            </Reveal>
            <Reveal delay={100}>
              <h2
                className="font-serif"
                style={{
                  fontSize: "clamp(26px, 3.2vw, 38px)",
                  fontWeight: 700,
                  color: "#F4F0E8",
                  textTransform: "uppercase",
                  margin: 0,
                }}
              >
                Executive Clarifications
              </h2>
            </Reveal>
          </div>

          <Reveal delay={200}>
            <HomeFaqAccordion faqs={faqs} />
          </Reveal>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────
          SECTION 9: CLOSING LUXURY DUBAI CONSULTATION CTA
      ───────────────────────────────────────────────────────────────── */}
      <section
        style={{
          position: "relative",
          padding: "120px 24px",
          overflow: "hidden",
          borderTop: "1px solid rgba(213, 172, 66, 0.25)",
        }}
      >
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <Image
            src="/images/dubai/burj-khalifa.png"
            alt="Burj Khalifa Dubai evening skyline"
            fill
            sizes="100vw"
            style={{
              objectFit: "cover",
              objectPosition: "center 20%",
              filter: "brightness(0.3) contrast(1.2)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(7, 19, 38, 0.85) 0%, rgba(7, 19, 38, 0.95) 100%)",
            }}
          />
          <div
            className="bg-islamic-pattern"
            style={{ position: "absolute", inset: 0, opacity: 0.16 }}
          />
        </div>

        <div
          className="max-wrap"
          style={{
            position: "relative",
            zIndex: 10,
            textAlign: "center",
            maxWidth: 780,
            margin: "0 auto",
          }}
        >
          <Reveal>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.26em",
                textTransform: "uppercase",
                color: "#D5AC42",
                display: "block",
                marginBottom: 16,
              }}
            >
              SCHEDULE AN ARCHITECTURE CONSULTATION
            </span>
          </Reveal>

          <Reveal delay={100}>
            <h2
              className="font-serif"
              style={{
                fontSize: "clamp(28px, 3.6vw, 42px)",
                fontWeight: 700,
                lineHeight: 1.15,
                color: "#F4F0E8",
                textTransform: "uppercase",
                margin: "0 0 20px",
              }}
            >
              Accelerate Your Enterprise
              <br />
              <span
                style={{
                  fontStyle: "italic",
                  fontWeight: 400,
                  background: "linear-gradient(135deg, #D5AC42 0%, #EBD68C 50%, #D5AC42 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                With Senior Dubai Engineers
              </span>
            </h2>
          </Reveal>

          <Reveal delay={200}>
            <p
              style={{
                fontSize: 16,
                color: "#9CAAC0",
                lineHeight: 1.7,
                maxWidth: 620,
                margin: "0 auto 36px",
              }}
            >
              Direct consultation with our software architects. We analyze your requirements, identify architectural bottlenecks, and provide a transparent delivery roadmap.
            </p>
          </Reveal>

          <Reveal delay={300}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 16,
                flexWrap: "wrap",
              }}
            >
              <Link
                href="/contact"
                className="btn-gold-pill"
                style={{ padding: "14px 34px", fontSize: 13 }}
              >
                <span>Book Architecture Scoping</span>
                <ArrowRight size={14} />
              </Link>
              <a
                href={`mailto:${companyInfo.email}`}
                className="btn-gold-outline"
                style={{ padding: "14px 30px", fontSize: 13 }}
              >
                <Mail size={14} style={{ color: "#D5AC42" }} />
                <span>{companyInfo.email}</span>
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
