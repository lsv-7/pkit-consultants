import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { Zap, ShieldCheck, HeartHandshake, Award, ArrowRight } from "lucide-react";
import { getAboutContent } from "@/lib/content";
import { getSettings } from "@/lib/services/settings";
import { COMPANY } from "@/lib/company";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  return {
    title: "About Our Firm | " + settings.companyName,
    description: "Learn about the mission, values, and leadership of " + settings.companyName + ", Dubai's premier enterprise technology consultancy.",
    alternates: {
      canonical: `${COMPANY.website}/about`,
    },
  };
}

export default async function About() {
  const content = getAboutContent();

  const valueIcons: Record<string, any> = {
    Innovation: Zap,
    Reliability: ShieldCheck,
    Transparency: HeartHandshake,
    Excellence: Award,
  };

  return (
    <div style={{ position: "relative", minHeight: "100vh", overflow: "hidden", background: "#071326", color: "#F4F0E8" }}>
      {/* Geometric Islamic Background Lattice */}
      <div
        className="bg-islamic-pattern"
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.12,
          pointerEvents: "none",
        }}
      />

      <div className="max-wrap" style={{ position: "relative", zIndex: 1, padding: "80px 28px 120px" }}>
        {/* ─── EDITORIAL SPLIT HEADER (REFERENCE SCREENSHOT 4) ─── */}
        <section style={{ marginBottom: 100 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
              gap: 60,
              alignItems: "center",
            }}
          >
            {/* Left: Tall Editorial Image (Dubai Desert Golden Dunes) */}
            <Reveal>
              <div
                style={{
                  position: "relative",
                  borderRadius: 16,
                  overflow: "hidden",
                  border: "1px solid rgba(213, 172, 66, 0.35)",
                  boxShadow: "0 24px 60px rgba(0, 0, 0, 0.65)",
                  minHeight: 520,
                }}
              >
                <Image
                  src="/images/dubai/dubai-desert.jpg"
                  alt="Dunes in the Dubai Desert Conservation Reserve at golden hour"
                  fill
                  priority
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
                    background:
                      "linear-gradient(180deg, rgba(7, 19, 38, 0.15) 0%, rgba(7, 19, 38, 0.55) 100%)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: 24,
                    left: 24,
                    right: 24,
                    padding: "16px 20px",
                    borderRadius: 10,
                    background: "rgba(7, 19, 38, 0.9)",
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

            {/* Right: Editorial Narrative */}
            <div>
              <Reveal>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
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
                <h1
                  className="font-serif"
                  style={{
                    fontSize: "clamp(34px, 4.4vw, 56px)",
                    fontWeight: 700,
                    lineHeight: 1.12,
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
                </h1>
              </Reveal>

              <Reveal delay={200}>
                <p style={{ color: "#9CAAC0", fontSize: 16, lineHeight: 1.75, marginBottom: 20 }}>
                  PK IT Consultants was established to bridge the divide between strategic commercial goals and flawless software engineering. Operating from Dubai, UAE, we deliver high-concurrency software platforms, bespoke AI pipelines, and enterprise IT consultancy.
                </p>
                <p style={{ color: "#9CAAC0", fontSize: 15.5, lineHeight: 1.75, marginBottom: 28 }}>
                  Our practice rejects generic templates and bloated junior development teams. We deploy battle-tested senior engineers who assume direct ownership of architecture, security, and velocity.
                </p>
              </Reveal>

              {/* Elegant Italic Founder Quotation & Gold Attribution */}
              <Reveal delay={300}>
                <div
                  style={{
                    position: "relative",
                    padding: "24px 28px",
                    borderRadius: 12,
                    background: "rgba(16, 30, 54, 0.65)",
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
                <Link
                  href="/contact"
                  className="btn-gold-pill"
                  style={{ padding: "13px 30px" }}
                >
                  <span>Book Scoping Consultation</span>
                  <ArrowRight size={14} />
                </Link>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ─── EXECUTIVE LEADERSHIP SPOTLIGHT ─── */}
        <section style={{ marginBottom: 100 }}>
          <Reveal>
            <div
              style={{
                borderRadius: 20,
                border: "1px solid rgba(213, 172, 66, 0.28)",
                background: "linear-gradient(135deg, #101E36 0%, #071326 100%)",
                padding: "48px 36px",
                boxShadow: "0 20px 50px rgba(0, 0, 0, 0.5)",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                  gap: 40,
                  alignItems: "center",
                }}
              >
                {/* Founder Portrait */}
                <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div
                    style={{
                      position: "relative",
                      width: 220,
                      height: 220,
                      borderRadius: "50%",
                      overflow: "hidden",
                      border: "3px solid #D5AC42",
                      boxShadow: "0 10px 40px rgba(213, 172, 66, 0.25)",
                      marginBottom: 20,
                    }}
                  >
                    <Image
                      src="/founder.jpg"
                      alt="M. Prasanna Kumar, Founder & Managing Director"
                      fill
                      sizes="220px"
                      style={{ objectFit: "cover", objectPosition: "center 20%" }}
                    />
                  </div>
                  <h3
                    className="font-serif"
                    style={{ fontSize: 24, fontWeight: 700, color: "#F4F0E8", margin: "0 0 4px" }}
                  >
                    M. Prasanna Kumar
                  </h3>
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 11,
                      fontWeight: 600,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "#D5AC42",
                    }}
                  >
                    Founder & Managing Director
                  </span>
                </div>

                {/* Founder Narrative */}
                <div>
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 10.5,
                      fontWeight: 600,
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      color: "#EBD68C",
                      display: "block",
                      marginBottom: 10,
                    }}
                  >
                    EXECUTIVE STEWARDSHIP
                  </span>
                  <h2
                    className="font-serif"
                    style={{ fontSize: "clamp(24px, 3vw, 34px)", fontWeight: 700, color: "#F4F0E8", marginBottom: 16 }}
                  >
                    Engineering Vision Backed by Hands-On Delivery
                  </h2>
                  <p style={{ color: "#9CAAC0", fontSize: 15, lineHeight: 1.7, marginBottom: 16 }}>
                    With comprehensive expertise spanning large-scale cloud backends, resilient mobile applications, and enterprise AI orchestration, M. Prasanna Kumar directs the technical roadmap and quality standards across all PK IT Consultants engagements.
                  </p>
                  <p style={{ color: "#9CAAC0", fontSize: 14.5, lineHeight: 1.7, margin: 0 }}>
                    Under his governance, PK IT Consultants has prioritized deep technical partnerships over transaction-heavy consulting, personally ensuring that client architectures exceed industry reliability and data privacy benchmarks.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ─── 4 CORE VALUES ─── */}
        <section>
          <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 54px" }}>
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
                  marginBottom: 10,
                }}
              >
                OUR ETHOS
              </span>
            </Reveal>
            <Reveal delay={100}>
              <h2
                className="font-serif"
                style={{
                  fontSize: "clamp(28px, 3.8vw, 44px)",
                  fontWeight: 700,
                  color: "#F4F0E8",
                  textTransform: "uppercase",
                  margin: 0,
                }}
              >
                Principles of Architectural Governance
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
            {content.values.map((val, idx) => {
              const IconComp = valueIcons[val.title] || Award;
              return (
                <Reveal key={val.title} delay={idx * 80}>
                  <div
                    style={{
                      padding: "32px 26px",
                      borderRadius: 14,
                      background: "rgba(16, 30, 54, 0.55)",
                      border: "1px solid rgba(213, 172, 66, 0.2)",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <div
                      style={{
                        width: 42,
                        height: 42,
                        borderRadius: 10,
                        background: "rgba(213, 172, 66, 0.12)",
                        border: "1px solid rgba(213, 172, 66, 0.3)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#D5AC42",
                        marginBottom: 18,
                      }}
                    >
                      <IconComp size={20} />
                    </div>
                    <h3
                      className="font-serif"
                      style={{ fontSize: 22, fontWeight: 700, color: "#F4F0E8", marginBottom: 12 }}
                    >
                      {val.title}
                    </h3>
                    <p style={{ color: "#9CAAC0", fontSize: 14.5, lineHeight: 1.65, margin: 0 }}>
                      {val.desc}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
