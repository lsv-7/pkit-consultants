import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/ui/Reveal";
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

  // Dynamic Lucide Icon Mapper
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

  return (
    <div className="pkit-root-page" style={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}>
      {/* Background patterns */}
      <div className="bg-grid" style={{ opacity: 0.35 }} />
      <div className="glow-blue" style={{ top: -200, left: "50%", transform: "translateX(-50%)" }} />
      <div className="glow-blue" style={{ bottom: -200, left: "-10%" }} />

      <div className="max-wrap section-pad" style={{ position: "relative", zIndex: 1 }}>
        {/* Page Header */}
        <div style={{ marginBottom: 72 }}>
          <SectionHeader
            eyebrow="Sectors We Serve"
            heading="Technical Expertise Across Key Industries"
            description="We build customized, secure, and compliant digital infrastructures tuned around the specific regulatory and operational demands of your sector."
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
            return (
              <Reveal key={ind.title} delay={i * 60}>
                <div
                  className="card"
                  style={{
                    padding: 32,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    position: "relative",
                  }}
                >
                  <div>
                    {/* Icon */}
                    <div className="icon-box" style={{ marginBottom: 20 }}>
                      <IconComponent size={22} />
                    </div>

                    {/* Title */}
                    <h3 className="font-display" style={{ fontSize: 20, fontWeight: 600, color: "var(--text)" }}>
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
                        gap: "8px 10px",
                      }}
                    >
                      {ind.solutions.map((sol) => (
                        <li
                          key={sol}
                          className="font-mono"
                          style={{
                            fontSize: 11,
                            color: "var(--cyan)",
                            background: "rgba(94, 230, 255, 0.05)",
                            border: "1px solid rgba(94, 230, 255, 0.12)",
                            padding: "2px 8px",
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
                  <div style={{ marginTop: 24, paddingTop: 16, borderTop: "1px solid var(--border-soft)" }}>
                    <Link
                      href={`/contact?industry=${encodeURIComponent(ind.title)}`}
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: "var(--text)",
                        textDecoration: "none",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                        transition: "color 0.2s",
                      }}
                      className="industry-link"
                    >
                      Discuss industry solutions <ArrowUpRight size={13} style={{ transition: "transform 0.2s" }} />
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
            background: "linear-gradient(to right, var(--surface-2), var(--surface))",
            border: "1px solid var(--border)",
            borderRadius: 16,
            padding: "56px 40px",
            textAlign: "center",
            position: "relative",
          }}
        >
          <Reveal>
            <h3 className="font-display" style={{ fontSize: 26, fontWeight: 700 }}>
              Operating in a highly regulated sector?
            </h3>
            <p style={{ color: "var(--muted)", fontSize: 15, marginTop: 12, maxWidth: 540, marginInline: "auto" }}>
              We understand the compliance rules, data residency laws, and security standards required in the UAE. Speak directly with a senior architect to scope your project.
            </p>
            <div style={{ marginTop: 28 }}>
              <Link href="/contact" className="btn-primary" style={{ paddingInline: 36 }}>
                Contact Our Architects
              </Link>
            </div>
          </Reveal>
        </div>
      </div>

      <style>{`
        .industry-link:hover {
          color: var(--blue) !important;
        }
        .industry-link:hover svg {
          transform: translate(1px, -1px);
        }
      `}</style>
    </div>
  );
}
