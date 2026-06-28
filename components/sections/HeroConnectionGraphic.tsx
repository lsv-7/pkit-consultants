"use client";

import { useTheme } from "@/components/ThemeProvider";

export default function HeroConnectionGraphic() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // connector lines static background
  const lineStroke = isDark ? "#142d66" : "rgba(0, 102, 255, 0.22)";
  const lineOpacity = isDark ? 0.7 : 1;

  // trace lines moving glow
  const traceStopColor = isDark ? "#38BDF8" : "#0066FF";
  const traceBaseColor = isDark ? "#0066FF" : "#0066FF";

  // radial glow boundaries
  const glowColor = isDark ? "#38BDF8" : "#0066FF";
  const glowOpacity = isDark ? 0.55 : 0.75;

  return (
    <svg
      viewBox="0 0 640 360"
      className="graphic-svg"
      role="img"
      aria-label="Diagram connecting business nodes to technology nodes"
    >
      <defs>
        <linearGradient id="trace" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={traceBaseColor} stopOpacity="0.1" />
          <stop offset="50%" stopColor={traceStopColor} stopOpacity="0.9" />
          <stop offset="100%" stopColor={traceBaseColor} stopOpacity="0.1" />
        </linearGradient>
        <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={glowColor} stopOpacity={glowOpacity} />
          <stop offset="100%" stopColor={glowColor} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* connector lines */}
      {[
        [70, 80, 320, 180],
        [70, 180, 320, 180],
        [70, 280, 320, 180],
        [320, 180, 570, 70],
        [320, 180, 570, 180],
        [320, 180, 570, 290],
      ].map(([x1, y1, x2, y2], i) => (
        <g key={i}>
          <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={lineStroke} strokeOpacity={lineOpacity} strokeWidth="1.5" />
          <line
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="url(#trace)"
            strokeWidth="2"
            strokeDasharray="6 220"
            className="trace-line"
            style={{ animationDelay: `${i * 0.5}s` }}
          />
        </g>
      ))}

      {/* business nodes (left) */}
      {[80, 180, 280].map((y, i) => (
        <g key={`b-${i}`}>
          <circle cx="70" cy={y} r="22" fill="url(#nodeGlow)" />
          <circle cx="70" cy={y} r="7" fill="var(--bg)" stroke="var(--cyan)" strokeWidth="2" />
        </g>
      ))}

      {/* hub node (center) */}
      <circle cx="320" cy="180" r="34" fill="url(#nodeGlow)" />
      <circle cx="320" cy="180" r="11" fill="var(--bg)" stroke="var(--blue)" strokeWidth="2.5" />

      {/* technology nodes (right) */}
      {[70, 180, 290].map((y, i) => (
        <g key={`t-${i}`}>
          <circle cx="570" cy={y} r="22" fill="url(#nodeGlow)" />
          <circle cx="570" cy={y} r="7" fill="var(--bg)" stroke="var(--cyan)" strokeWidth="2" />
        </g>
      ))}

      <text x="70" y="330" textAnchor="middle" className="graphic-label">
        BUSINESS
      </text>
      <text x="570" y="330" textAnchor="middle" className="graphic-label">
        TECHNOLOGY
      </text>
    </svg>
  );
}
