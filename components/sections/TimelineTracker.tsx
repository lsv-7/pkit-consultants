"use client";

import { useState } from "react";
import { CheckCircle2, ChevronDown } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

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

export default function TimelineTracker() {
  const [activeTimelineStep, setActiveTimelineStep] = useState(0);

  return (
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
  );
}
