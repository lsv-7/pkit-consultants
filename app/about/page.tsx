import type { Metadata } from "next";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/ui/Reveal";
import { Target, Eye, ShieldCheck, Zap, HeartHandshake, Award, ArrowUpRight } from "lucide-react";
import Link from "next/link";
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
  const companyInfo = {
    name: settings.companyName,
    tagline: settings.tagline,
    email: settings.email,
    phone: settings.phone,
    whatsappLink: settings.whatsapp,
    address: settings.officeAddress,
    hours: settings.workingHours,
    mapEmbedUrl: settings.googleMapsLink,
  };

  // Map values to local icons dynamically
  const valueIcons: Record<string, any> = {
    Innovation: Zap,
    Reliability: ShieldCheck,
    Transparency: HeartHandshake,
    Excellence: Award,
  };

  return (
    <div className="pkit-root-page" style={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}>
      {/* Background patterns */}
      <div className="bg-grid" style={{ opacity: 0.35 }} />
      <div className="glow-blue" style={{ top: -200, left: "50%", transform: "translateX(-50%)" }} />
      <div className="glow-blue" style={{ bottom: -200, right: "-10%" }} />

      <div className="max-wrap section-pad" style={{ position: "relative", zIndex: 1 }}>
        {/* Hero Section */}
        <div style={{ marginBottom: 80 }}>
          <SectionHeader
            eyebrow="About PKIT"
            heading="Connecting Business with Technology"
            description="Headquartered in Dubai, UAE, PKIT Consultants helps startups and enterprises accelerate digital transformation through high-end software development, AI solutions, and strategic technical consulting."
          />
        </div>

        {/* Company Story */}
        <section style={{ marginBottom: 96 }}>
          <Reveal>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: 40,
                background: "var(--surface)",
                border: "1px solid var(--border-soft)",
                borderRadius: 16,
                padding: "48px 32px",
                position: "relative",
              }}
              className="about-story-grid"
            >
              <div style={{ position: "relative" }}>
                <span className="eyebrow">Our Story</span>
                <h2
                  className="font-display"
                  style={{
                    fontSize: "clamp(24px, 3.5vw, 32px)",
                    fontWeight: 700,
                    marginTop: 14,
                    letterSpacing: "-0.01em",
                    lineHeight: 1.2,
                  }}
                >
                  {content.storyTitle}
                </h2>
                {content.storyParagraphs.map((para, idx) => (
                  <p key={idx} style={{ color: "var(--muted)", marginTop: idx === 0 ? 20 : 16, fontSize: 15.5, lineHeight: 1.8 }}>
                    {para}
                  </p>
                ))}
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
              className="card"
              style={{
                padding: 36,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                gap: 18,
                position: "relative",
              }}
            >
              <div className="icon-box">
                <Target size={22} />
              </div>
              <h3 className="font-display" style={{ fontSize: 20, fontWeight: 600 }}>
                Our Mission
              </h3>
              <p style={{ color: "var(--muted)", fontSize: 15, lineHeight: 1.7 }}>
                {content.mission}
              </p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div
              className="card"
              style={{
                padding: 36,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                gap: 18,
                position: "relative",
              }}
            >
              <div className="icon-box">
                <Eye size={22} />
              </div>
              <h3 className="font-display" style={{ fontSize: 20, fontWeight: 600 }}>
                Our Vision
              </h3>
              <p style={{ color: "var(--muted)", fontSize: 15, lineHeight: 1.7 }}>
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
                background: "radial-gradient(ellipse at top left, var(--surface-2), var(--surface))",
                border: "1px solid var(--border)",
                borderRadius: 16,
                padding: "56px 40px",
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: 40,
                alignItems: "center",
              }}
              className="founder-grid"
            >
              <div style={{ display: "flex", justifyContent: "center" }} className="founder-image-container">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/founder.jpg"
                  alt={content.founder.name}
                  style={{
                    width: "100%",
                    maxWidth: 320,
                    aspectRatio: "1/1",
                    objectFit: "cover",
                    borderRadius: 12,
                    border: "1px solid var(--border)",
                    boxShadow: "0 10px 30px -10px rgba(0,0,0,0.5)",
                  }}
                />
              </div>
              <div>
                <span className="eyebrow">Leadership</span>
                <h3 className="font-display" style={{ fontSize: 32, fontWeight: 700, marginTop: 14, color: "var(--text)" }}>
                  {content.founder.name}
                </h3>
                <p className="font-mono" style={{ fontSize: 13, color: "var(--cyan)", marginTop: 6, letterSpacing: "0.05em" }}>
                  {content.founder.title}
                </p>

                <div
                  style={{
                    width: 48,
                    height: 2,
                    background: "var(--blue)",
                    margin: "24px 0",
                  }}
                />

                {content.founder.bio.map((para, idx) => (
                  <p key={idx} style={{ color: "var(--muted)", fontSize: 15.5, lineHeight: 1.8, marginTop: idx === 0 ? 0 : 14 }}>
                    {para}
                  </p>
                ))}
              </div>
            </div>
          </Reveal>
        </section>

        {/* Core Values */}
        <section>
          <div style={{ marginBottom: 48 }}>
            <SectionHeader
              eyebrow="Our Core Values"
              heading="The principles that guide our code and counsel"
            />
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 24,
            }}
          >
            {content.values.map((v, i) => {
              const IconComp = valueIcons[v.title] || ShieldCheck;
              return (
                <Reveal key={v.title} delay={i * 80}>
                  <div className="card" style={{ padding: 28, height: "100%" }}>
                    <div className="icon-box" style={{ marginBottom: 18 }}>
                      <IconComp size={20} />
                    </div>
                    <h4 className="font-display" style={{ fontSize: 17, fontWeight: 600 }}>
                      {v.title}
                    </h4>
                    <p style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.6, marginTop: 10 }}>{v.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* CTA section */}
        <div style={{ marginTop: 112, textAlign: "center" }}>
          <Reveal>
            <h3 className="font-display" style={{ fontSize: 28, fontWeight: 700 }}>
              Let&apos;s build the future together.
            </h3>
            <p style={{ color: "var(--muted)", fontSize: 15, marginTop: 12, maxWidth: 480, marginInline: "auto" }}>
              Interested in speaking with our engineering team? Let&apos;s connect for an initial architecture audit.
            </p>
            <div style={{ marginTop: 24 }}>
              <Link href="/contact" className="btn-primary">
                Contact Our Team <ArrowUpRight size={15} />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>

      <style>{`
        @media (min-width: 900px) {
          .about-story-grid {
            grid-template-columns: 1fr !important;
            padding: 56px 48px !important;
          }
          .founder-grid {
            grid-template-columns: 320px 1fr !important;
            gap: 48px !important;
          }
        }
      `}</style>
    </div>
  );
}