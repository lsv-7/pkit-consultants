import Reveal from "./Reveal";

interface SectionHeaderProps {
  eyebrow: string;
  heading: string;
  description?: string;
  centered?: boolean;
}

export default function SectionHeader({
  eyebrow,
  heading,
  description,
  centered = false,
}: SectionHeaderProps) {
  const align = centered ? { textAlign: "center" as const } : {};
  const descStyle = centered
    ? { marginLeft: "auto", marginRight: "auto" }
    : {};

  return (
    <Reveal>
      <div style={align}>
        <span className="eyebrow">{eyebrow}</span>
        <h2
          className="font-display"
          style={{
            fontSize: "clamp(26px, 4vw, 38px)",
            fontWeight: 700,
            marginTop: 14,
            letterSpacing: "-0.02em",
            lineHeight: 1.15,
          }}
        >
          {heading}
        </h2>
        {description && (
          <p
            style={{
              color: "var(--muted)",
              marginTop: 16,
              maxWidth: 620,
              lineHeight: 1.75,
              fontSize: 16,
              ...descStyle,
            }}
          >
            {description}
          </p>
        )}
      </div>
    </Reveal>
  );
}
