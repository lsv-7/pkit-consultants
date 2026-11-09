import type { Metadata } from "next";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/ui/Reveal";
import { COMPANY } from "@/lib/company";

export const metadata: Metadata = {
  title: "Industries Served",
  description: "Enterprise technical engineering solutions custom-built for Healthcare, Education, E-Commerce, Logistics, Real Estate, and scaling Startups in Dubai and the UAE.",
  alternates: {
    canonical: `${COMPANY.website}/industries`,
  },
};
import {
  Heart,
  GraduationCap,
  ShoppingBag,
  Hammer,
  Factory,
  Building,
  Building2,
  Rocket,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import { getIndustries } from "@/lib/services/industries";

export default async function Industries() {
  const dbIndustries = await getIndustries(true);
  const industryList = dbIndustries.map(ind => ({
    id: ind.slug,
    title: ind.name,
    desc: ind.description,
    iconName: ind.icon,
    solutions: ind.solutions,
  }));

  const iconMap: Record<string, any> = {
    Heart: Heart,
    GraduationCap: GraduationCap,
    ShoppingBag: ShoppingBag,
    Hammer: Hammer,
    Factory: Factory,
    Building: Building,
    Building2: Building2,
    Rocket: Rocket,
  };

  const complianceBadges: Record<string, string> = {
    healthcare: "Healthcare Systems Engineering",
    education: "Education Technology Platforms",
    retail: "High-Volume E-Commerce Systems",
    construction: "Field Operations & Mobile Sync",
    manufacturing: "Supply Chain & Logistics Portals",
    "real-estate": "PropTech & Property Management",
    government: "Enterprise Data Privacy Architecture",
    startups: "Scalable Cloud & MVP Architecture",
  };

  return (
    <div style={{ position: "relative", minHeight: "100vh", overflow: "hidden", background: "#071326", color: "#F4F0E8" }}>
      {/* Geometric Islamic Background Pattern */}
      <div
        className="bg-islamic-pattern"
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.12,
          pointerEvents: "none",
        }}
      />

      <div className="max-wrap" style={{ position: "relative", zIndex: 1, padding: "80px 28px 110px" }}>
        {/* Page Header */}
        <div style={{ marginBottom: 64, textAlign: "center", maxWidth: 840, marginInline: "auto" }}>
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
                DUBAI &amp; GCC SECTOR SPECIALIZATION
              </span>
              <span style={{ width: 6, height: 6, transform: "rotate(45deg)", background: "#D5AC42" }} />
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h1
              className="font-serif"
              style={{
                fontSize: "clamp(28px, 3.8vw, 46px)",
                fontWeight: 700,
                color: "#F4F0E8",
                textTransform: "uppercase",
                margin: "0 0 20px",
                lineHeight: 1.15,
              }}
            >
              Enterprise Architectures Engineered for Regional Scale
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p style={{ color: "#9CAAC0", fontSize: 16, lineHeight: 1.7, maxWidth: 680, margin: "0 auto" }}>
              We build customized, secure digital infrastructures engineered around the specific operational workflows, performance demands, and data privacy requirements of your sector.
            </p>
          </Reveal>
        </div>

        {/* Industries Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 28,
            marginBottom: 88,
          }}
        >
          {industryList.map((ind, i) => {
            const IconComponent = iconMap[ind.iconName] || Rocket;
            const compliance = complianceBadges[ind.id] || "Enterprise UAE Compliance";

            return (
              <Reveal key={ind.title} delay={i * 60}>
                <div
                  style={{
                    background: "rgba(16, 30, 54, 0.6)",
                    border: "1px solid rgba(213, 172, 66, 0.22)",
                    borderRadius: 16,
                    padding: 32,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    position: "relative",
                    transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                  className="hover:border-[#D5AC42] hover:-translate-y-1"
                >
                  <div>
                    {/* Header: Icon + Compliance Badge */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
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
                        }}
                      >
                        <IconComponent size={20} />
                      </div>
                      <span
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: 10,
                          fontWeight: 600,
                          color: "#EBD68C",
                          background: "rgba(16, 30, 54, 0.8)",
                          border: "1px solid rgba(213, 172, 66, 0.3)",
                          padding: "4px 10px",
                          borderRadius: 9999,
                          letterSpacing: "0.06em",
                        }}
                      >
                        {compliance}
                      </span>
                    </div>

                    {/* Title */}
                    <h3
                      className="font-serif"
                      style={{ fontSize: 24, fontWeight: 700, color: "#F4F0E8", margin: "0 0 12px" }}
                    >
                      {ind.title}
                    </h3>

                    {/* Solutions Tag List */}
                    <ul
                      style={{
                        listStyle: "none",
                        padding: 0,
                        margin: "12px 0 18px 0",
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "6px 8px",
                      }}
                    >
                      {ind.solutions.map((sol) => (
                        <li
                          key={sol}
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: 11,
                            color: "#EBD68C",
                            background: "rgba(10, 23, 48, 0.6)",
                            border: "1px solid rgba(213, 172, 66, 0.2)",
                            padding: "3px 10px",
                            borderRadius: 9999,
                          }}
                        >
                          {sol}
                        </li>
                      ))}
                    </ul>

                    {/* Description */}
                    <p style={{ color: "#9CAAC0", fontSize: 14, lineHeight: 1.65, margin: 0 }}>
                      {ind.desc}
                    </p>
                  </div>

                  {/* Sub-CTA */}
                  <div style={{ marginTop: 28, paddingTop: 18, borderTop: "1px solid rgba(213, 172, 66, 0.15)" }}>
                    <Link
                      href={`/contact?industry=${encodeURIComponent(ind.title)}`}
                      style={{
                        fontSize: 12.5,
                        fontWeight: 600,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: "#EBD68C",
                        textDecoration: "none",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                        transition: "all 0.2s ease",
                      }}
                      className="hover-gold"
                    >
                      <span>Scope {ind.title} Architecture</span>
                      <ArrowUpRight size={14} style={{ color: "#D5AC42" }} />
                    </Link>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Bottom CTA Block */}
        <div
          style={{
            background: "linear-gradient(135deg, #101E36 0%, #071326 100%)",
            border: "1px solid rgba(213, 172, 66, 0.3)",
            borderRadius: 20,
            padding: "56px 40px",
            textAlign: "center",
            position: "relative",
            boxShadow: "0 20px 50px rgba(0, 0, 0, 0.6)",
          }}
        >
          <Reveal>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 10.5,
                fontWeight: 600,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#D5AC42",
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                marginBottom: 14,
              }}
            >
              TECHNICAL ARCHITECTURE ADVISORY
            </span>
            <h3
              className="font-serif"
              style={{ fontSize: "clamp(26px, 3.5vw, 38px)", fontWeight: 700, color: "#F4F0E8", margin: "0 0 14px" }}
            >
              Operating high-stakes digital platforms in the UAE?
            </h3>
            <p style={{ color: "#9CAAC0", fontSize: 15.5, lineHeight: 1.7, maxWidth: 640, margin: "0 auto 28px" }}>
              We design secure, reliable digital systems engineered to support high transaction volumes and regional data privacy standards. Speak directly with a senior software architect to evaluate your technical roadmap.
            </p>
            <div style={{ marginTop: 32, display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <Link
                href="/contact"
                className="btn-gold-pill"
                style={{ padding: "14px 34px", fontSize: 13 }}
              >
                Schedule Technical Scoping <ArrowUpRight size={14} />
              </Link>
              <a
                href="mailto:info@pkitconsultants.com"
                className="btn-gold-outline"
                style={{ padding: "14px 28px", fontSize: 13 }}
              >
                info@pkitconsultants.com
              </a>
            </div>
          </Reveal>
        </div>
      </div>

      <style>{`
        .industry-card:hover {
          border-color: rgba(200, 155, 60, 0.45) !important;
          transform: translateY(-4px);
          box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.6);
        }
        .industry-link:hover {
          color: #ffffff !important;
          transform: translateX(3px);
        }
      `}</style>
    </div>
  );
}
