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
    healthcare: "DHA & NABIDH Compliance",
    education: "UAE KHDA Data Security",
    retail: "PCI-DSS Level 1 & Sub-Second Latency",
    construction: "BIM & Mobile Field Sync",
    manufacturing: "Jebel Ali Port / DP World Logistics",
    "real-estate": "Dubai Land Department (DLD) & RERA",
    government: "UAE Federal Data Sovereignty",
    startups: "VC Technical Due Diligence Ready",
  };

  return (
    <div className="pkit-root-page" style={{ position: "relative", minHeight: "100vh", overflow: "hidden", background: "#06111F" }}>
      {/* Background patterns */}
      <div className="bg-grid" style={{ opacity: 0.35 }} />
      <div className="glow-blue" style={{ top: -200, left: "50%", transform: "translateX(-50%)" }} />

      <div className="max-wrap section-pad" style={{ position: "relative", zIndex: 1, padding: "80px 24px 100px" }}>
        {/* Page Header */}
        <div style={{ marginBottom: 64 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <span className="badge-gold font-mono" style={{ padding: "6px 14px", borderRadius: 999, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", display: "inline-flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--gold)" }} />
              Dubai &amp; GCC Enterprise Sectors
            </span>
          </div>
          <SectionHeader
            eyebrow="Sectors We Empower"
            heading="Technical Architectures Tuned to Middle East Compliance"
            description="We build customized, secure, and compliant digital infrastructures engineered around the specific regulatory mandates, sovereign data laws, and operational workflows of your sector."
          />
        </div>

        {/* Industries Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 24,
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
                    background: "linear-gradient(180deg, #0A2540 0%, #06111F 100%)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: 16,
                    padding: 32,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    position: "relative",
                    transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                  className="industry-card"
                >
                  <div>
                    {/* Header: Icon + Compliance Badge */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                      <div style={{ width: 42, height: 42, borderRadius: 10, background: "rgba(37, 99, 235, 0.15)", border: "1px solid rgba(37, 99, 235, 0.35)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--cyan)" }}>
                        <IconComponent size={20} />
                      </div>
                      <span
                        className="font-mono"
                        style={{
                          fontSize: 10,
                          color: "var(--gold)",
                          background: "rgba(200, 155, 60, 0.1)",
                          border: "1px solid rgba(200, 155, 60, 0.25)",
                          padding: "4px 8px",
                          borderRadius: 6,
                          letterSpacing: "0.06em",
                        }}
                      >
                        {compliance}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-display" style={{ fontSize: 21, fontWeight: 700, color: "#ffffff" }}>
                      {ind.title}
                    </h3>

                    {/* Solutions Tag List */}
                    <ul
                      style={{
                        listStyle: "none",
                        padding: 0,
                        margin: "16px 0 20px 0",
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "6px 8px",
                      }}
                    >
                      {ind.solutions.map((sol) => (
                        <li
                          key={sol}
                          className="font-mono"
                          style={{
                            fontSize: 11,
                            color: "var(--cyan)",
                            background: "rgba(37, 99, 235, 0.1)",
                            border: "1px solid rgba(37, 99, 235, 0.2)",
                            padding: "3px 8px",
                            borderRadius: 6,
                          }}
                        >
                          {sol}
                        </li>
                      ))}
                    </ul>

                    {/* Description */}
                    <p style={{ color: "var(--muted)", fontSize: 14.5, lineHeight: 1.65 }}>
                      {ind.desc}
                    </p>
                  </div>

                  {/* Sub-CTA */}
                  <div style={{ marginTop: 28, paddingTop: 18, borderTop: "1px solid rgba(255, 255, 255, 0.08)" }}>
                    <Link
                      href={`/contact?industry=${encodeURIComponent(ind.title)}`}
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
                      className="industry-link"
                    >
                      <span>Scope {ind.title} Architecture</span>
                      <ArrowUpRight size={14} />
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
            background: "linear-gradient(135deg, #0A2540 0%, #06111F 100%)",
            border: "1px solid rgba(200, 155, 60, 0.35)",
            borderRadius: 20,
            padding: "56px 40px",
            textAlign: "center",
            position: "relative",
            boxShadow: "0 20px 50px -10px rgba(0, 0, 0, 0.6)",
          }}
        >
          <Reveal>
            <span className="badge-gold font-mono" style={{ padding: "5px 14px", borderRadius: 999, fontSize: 10.5, letterSpacing: "0.12em", textTransform: "uppercase", display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 14 }}>
              REGULATORY COMPLIANCE ADVISORY
            </span>
            <h3 className="font-display" style={{ fontSize: 28, fontWeight: 700, color: "#ffffff" }}>
              Operating in a highly regulated UAE sector?
            </h3>
            <p style={{ color: "rgba(255, 255, 255, 0.8)", fontSize: 15.5, lineHeight: 1.7, marginTop: 14, maxWidth: 600, marginInline: "auto" }}>
              We understand the compliance mandates, sovereign data residency laws, and security standards required in Dubai. Speak directly with a senior software architect to evaluate your technical roadmap.
            </p>
            <div style={{ marginTop: 32, display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <Link
                href="/contact"
                className="btn-primary"
                style={{
                  padding: "13px 30px",
                  fontSize: 15,
                  fontWeight: 600,
                  borderRadius: 10,
                  background: "linear-gradient(135deg, var(--blue) 0%, #1D4ED8 100%)",
                }}
              >
                Schedule Technical Scoping <ArrowUpRight size={15} />
              </Link>
              <a
                href="mailto:info@pkitconsultants.com"
                className="btn-secondary"
                style={{
                  padding: "13px 26px",
                  fontSize: 15,
                  fontWeight: 600,
                  borderRadius: 10,
                  borderColor: "rgba(200, 155, 60, 0.35)",
                  color: "var(--gold)",
                }}
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
