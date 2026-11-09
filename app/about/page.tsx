import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/ui/Reveal";
import { Target, Eye, ShieldCheck, Zap, HeartHandshake, Award, ArrowUpRight, CheckCircle2, Mail } from "lucide-react";
import { getAboutContent } from "@/lib/content";
import { getSettings } from "@/lib/services/settings";
import { COMPANY } from "@/lib/company";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  return {
    title: "About Us | " + settings.companyName,
    description: "Learn about the mission, values, and leadership of " + settings.companyName + ", Dubai's premier enterprise technology consultancy.",
    alternates: {
      canonical: `${COMPANY.website}/about`,
    },
  };
}

export default async function About() {
  const content = getAboutContent();
  const settings = await getSettings();

  const valueIcons: Record<string, any> = {
    Innovation: Zap,
    Reliability: ShieldCheck,
    Transparency: HeartHandshake,
    Excellence: Award,
  };

  return (
    <div className="pkit-root-page" style={{ position: "relative", minHeight: "100vh", overflow: "hidden", background: "#06111F" }}>
      {/* Background patterns */}
      <div className="bg-grid" style={{ opacity: 0.35 }} />
      <div className="glow-blue" style={{ top: -200, left: "50%", transform: "translateX(-50%)" }} />

      <div className="max-wrap section-pad" style={{ position: "relative", zIndex: 1, padding: "80px 24px 100px" }}>
        {/* Hero Section with Dubai Coordinates */}
        <div style={{ marginBottom: 64 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <span className="badge-gold font-mono" style={{ padding: "6px 14px", borderRadius: 999, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase" }}>
              DUBAI, UNITED ARAB EMIRATES • ESTABLISHED TO LEAD
            </span>
          </div>
          <SectionHeader
            eyebrow="About PK IT Consultants"
            heading="Connecting Business with Technology"
            description="Headquartered in Dubai, UAE, PK IT Consultants helps startups, SMBs, and enterprises accelerate digital transformation through high-end software development, sovereign AI solutions, and strategic technical consulting."
          />
        </div>

        {/* Company Story with Museum of the Future Visual */}
        <section style={{ marginBottom: 96 }}>
          <Reveal>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: 40,
                background: "linear-gradient(135deg, #0A2540 0%, #06111F 100%)",
                border: "1px solid rgba(200, 155, 60, 0.3)",
                borderRadius: 20,
                padding: "48px 36px",
                position: "relative",
                overflow: "hidden",
                boxShadow: "0 20px 50px -10px rgba(0, 0, 0, 0.5)",
              }}
              className="about-story-grid"
            >
              <div style={{ position: "relative" }}>
                <span className="eyebrow">Our Dubai Heritage</span>
                <h2
                  className="font-display"
                  style={{
                    fontSize: "clamp(26px, 3.5vw, 36px)",
                    fontWeight: 700,
                    marginTop: 14,
                    letterSpacing: "-0.015em",
                    lineHeight: 1.2,
                    color: "#ffffff",
                  }}
                >
                  {content.storyTitle}
                </h2>
                {content.storyParagraphs.map((para, idx) => (
                  <p key={idx} style={{ color: "var(--muted)", marginTop: idx === 0 ? 20 : 16, fontSize: 15.5, lineHeight: 1.8 }}>
                    {para}
                  </p>
                ))}

                <div style={{ marginTop: 28, display: "flex", gap: 18, flexWrap: "wrap" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <CheckCircle2 size={16} style={{ color: "var(--cyan)" }} />
                    <span style={{ fontSize: 13.5, fontWeight: 500, color: "#ffffff" }}>DIFC &amp; Downtown Tech Hub</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <CheckCircle2 size={16} style={{ color: "var(--gold)" }} />
                    <span style={{ fontSize: 13.5, fontWeight: 500, color: "#ffffff" }}>100% Senior Engineers</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <CheckCircle2 size={16} style={{ color: "var(--blue)" }} />
                    <span style={{ fontSize: 13.5, fontWeight: 500, color: "#ffffff" }}>UAE Data Sovereignty</span>
                  </div>
                </div>
              </div>

              {/* Architectural Visual Container */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  minHeight: 340,
                  borderRadius: 14,
                  overflow: "hidden",
                  border: "1px solid rgba(200, 155, 60, 0.35)",
                  boxShadow: "0 14px 40px -10px rgba(0, 0, 0, 0.6)",
                }}
              >
                <Image
                  src="/images/dubai/museum-of-the-future.png"
                  alt="Museum of the Future in Dubai, representing PK IT Consultants' forward-looking engineering philosophy"
                  fill
                  sizes="(max-width: 900px) 100vw, 480px"
                  style={{ objectFit: "cover", objectPosition: "center 30%" }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to top, rgba(6, 17, 31, 0.95) 0%, rgba(6, 17, 31, 0.25) 60%, transparent 100%)",
                  }}
                />
                <div style={{ position: "absolute", bottom: 18, left: 20, right: 20 }}>
                  <span className="font-mono" style={{ fontSize: 11, color: "var(--gold)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                    DUBAI INNOVATION CORRIDOR
                  </span>
                  <p style={{ color: "#ffffff", fontSize: 13.5, fontWeight: 500, marginTop: 4, lineHeight: 1.4 }}>
                    Engineering tomorrow&apos;s digital infrastructure from the UAE to global scale.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* Mission & Vision */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 28,
            marginBottom: 96,
          }}
        >
          <Reveal delay={50}>
            <div
              style={{
                background: "linear-gradient(180deg, #0A2540 0%, #06111F 100%)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: 16,
                padding: 36,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                gap: 18,
              }}
            >
              <div style={{ width: 44, height: 44, borderRadius: 10, background: "rgba(37, 99, 235, 0.15)", border: "1px solid rgba(37, 99, 235, 0.35)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--cyan)" }}>
                <Target size={22} />
              </div>
              <h3 className="font-display" style={{ fontSize: 22, fontWeight: 700, color: "#ffffff" }}>
                Our Mission
              </h3>
              <p style={{ color: "var(--muted)", fontSize: 15, lineHeight: 1.75 }}>
                {content.mission}
              </p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div
              style={{
                background: "linear-gradient(180deg, #0A2540 0%, #06111F 100%)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: 16,
                padding: 36,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                gap: 18,
              }}
            >
              <div style={{ width: 44, height: 44, borderRadius: 10, background: "rgba(200, 155, 60, 0.15)", border: "1px solid rgba(200, 155, 60, 0.35)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--gold)" }}>
                <Eye size={22} />
              </div>
              <h3 className="font-display" style={{ fontSize: 22, fontWeight: 700, color: "#ffffff" }}>
                Our Vision
              </h3>
              <p style={{ color: "var(--muted)", fontSize: 15, lineHeight: 1.75 }}>
                {content.vision}
              </p>
            </div>
          </Reveal>
        </section>

        {/* Founder & Managing Director */}
        <section style={{ marginBottom: 96 }}>
          <Reveal>
            <div
              style={{
                background: "radial-gradient(ellipse at top left, #0A2540 0%, #06111F 100%)",
                border: "1px solid rgba(200, 155, 60, 0.35)",
                borderRadius: 20,
                padding: "52px 38px",
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: 40,
                alignItems: "center",
                boxShadow: "0 22px 50px -10px rgba(0,0,0,0.5)",
              }}
              className="founder-grid"
            >
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }} className="founder-image-container">
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    maxWidth: 290,
                    aspectRatio: "1/1",
                    borderRadius: 16,
                    overflow: "hidden",
                    border: "2px solid rgba(200, 155, 60, 0.45)",
                    boxShadow: "0 16px 36px -8px rgba(0,0,0,0.7)",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/founder.jpg"
                    alt={content.founder.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div style={{ marginTop: 14, textAlign: "center" }}>
                  <span className="badge-gold font-mono" style={{ padding: "5px 14px", borderRadius: 999, fontSize: 10.5, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                    FOUNDER &amp; MANAGING DIRECTOR
                  </span>
                </div>
              </div>

              <div>
                <span className="eyebrow">Executive Leadership</span>
                <h3 className="font-display" style={{ fontSize: 34, fontWeight: 800, marginTop: 12, color: "#ffffff" }}>
                  {content.founder.name}
                </h3>
                <p className="font-mono" style={{ fontSize: 13.5, color: "var(--gold)", marginTop: 6, letterSpacing: "0.06em" }}>
                  {content.founder.title} • PK IT Consultants
                </p>

                <div
                  style={{
                    width: 52,
                    height: 2,
                    background: "var(--gold)",
                    margin: "20px 0",
                  }}
                />

                {content.founder.bio.map((para, idx) => (
                  <p key={idx} style={{ color: "var(--muted)", fontSize: 15.5, lineHeight: 1.8, marginTop: idx === 0 ? 0 : 14 }}>
                    {para}
                  </p>
                ))}

                <div style={{ marginTop: 24, display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
                  <a
                    href={`mailto:${settings.email || COMPANY.email}`}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      fontSize: 13.5,
                      color: "var(--gold)",
                      textDecoration: "none",
                      fontWeight: 600,
                    }}
                  >
                    <Mail size={15} /> {settings.email || COMPANY.email}
                  </a>
                  <span style={{ color: "rgba(255, 255, 255, 0.2)" }}>•</span>
                  <span style={{ fontSize: 13, color: "var(--muted)" }}>Deira, Dubai, UAE</span>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* Core Values */}
        <section style={{ marginBottom: 96 }}>
          <div style={{ marginBottom: 48 }}>
            <SectionHeader
              eyebrow="Our Core Values"
              heading="The Principles That Guide Our Code and Counsel"
              description="Uncompromising engineering standards that prioritize client business outcomes over short-term agency expediency."
            />
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 24,
            }}
          >
            {content.values.map((v, i) => {
              const IconComp = valueIcons[v.title] || ShieldCheck;
              return (
                <Reveal key={v.title} delay={i * 80}>
                  <div
                    style={{
                      background: "linear-gradient(180deg, #0A2540 0%, #06111F 100%)",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                      borderRadius: 14,
                      padding: 28,
                      height: "100%",
                    }}
                  >
                    <div style={{ width: 42, height: 42, borderRadius: 10, background: "rgba(37, 99, 235, 0.15)", border: "1px solid rgba(37, 99, 235, 0.35)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--cyan)", marginBottom: 18 }}>
                      <IconComp size={20} />
                    </div>
                    <h4 className="font-display" style={{ fontSize: 18, fontWeight: 700, color: "#ffffff" }}>
                      {v.title}
                    </h4>
                    <p style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.65, marginTop: 10 }}>{v.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* CTA section */}
        <div style={{ textAlign: "center" }}>
          <Reveal>
            <h3 className="font-display" style={{ fontSize: 30, fontWeight: 700, color: "#ffffff" }}>
              Let&apos;s build the future together.
            </h3>
            <p style={{ color: "var(--muted)", fontSize: 16, marginTop: 12, maxWidth: 520, marginInline: "auto" }}>
              Interested in speaking with our senior engineering team? Connect with our Dubai office for an initial architecture scoping session.
            </p>
            <div style={{ marginTop: 28, display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <Link
                href="/contact"
                className="btn-primary"
                style={{
                  padding: "13px 28px",
                  fontSize: 15,
                  fontWeight: 600,
                  borderRadius: 10,
                  background: "linear-gradient(135deg, var(--blue) 0%, #1D4ED8 100%)",
                }}
              >
                Schedule Technical Scoping <ArrowUpRight size={15} />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>

      <style>{`
        @media (min-width: 900px) {
          .about-story-grid {
            grid-template-columns: 1.2fr 0.8fr !important;
            padding: 56px 48px !important;
            align-items: center;
          }
          .founder-grid {
            grid-template-columns: 310px 1fr !important;
            gap: 48px !important;
          }
        }
      `}</style>
    </div>
  );
}
