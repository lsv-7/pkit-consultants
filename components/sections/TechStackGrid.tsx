"use client";

import {
  Brain,
  Code2,
  Globe,
  Cloud,
  Layers,
  Database,
  Cpu,
  GitBranch,
} from "lucide-react";
import Reveal from "@/components/ui/Reveal";

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

export default function TechStackGrid() {
  return (
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
  );
}
