"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  Brain,
  Code2,
  Network,
  Smartphone,
  Rocket,
  Store,
  Building2,
  ShoppingCart,
  ArrowRight,
  Menu,
  X,
  ShieldCheck,
  Gauge,
  Layers,
  HeartHandshake,
  Search,
  Compass,
  Hammer,
  Rocket as LaunchIcon,
  LifeBuoy,
} from "lucide-react";

/* ----------------------------------------------------------------------- */
/*  Design tokens (see <style> block below) — colors are intentionally     */
/*  NOT Tailwind defaults. PKIT's palette: near-black navy ground, a       */
/*  signal-blue accent, and a thin cyan "trace" used only on the           */
/*  connecting-line motif that recurs through the page.                   */
/* ----------------------------------------------------------------------- */

const services = [
  {
    icon: Brain,
    title: "AI Solutions",
    desc: "Machine learning models, intelligent automation, and AI integrations built for measurable outcomes — not buzzwords on a slide.",
  },
  {
    icon: Code2,
    title: "Custom Software Development",
    desc: "Bespoke applications engineered around your exact workflow, instead of your workflow bent to fit someone else's template.",
  },
  {
    icon: Network,
    title: "IT Consultancy",
    desc: "Architecture reviews, infrastructure strategy, and technology roadmaps that hold up under real production load.",
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    desc: "Native and cross-platform apps tuned for performance on the exact devices your customers carry.",
  },
];

const whyUs = [
  {
    icon: ShieldCheck,
    title: "Senior engineers only",
    desc: "No junior hand-offs. The people who scope your project are the people who build it.",
  },
  {
    icon: Gauge,
    title: "Fixed-scope delivery",
    desc: "Transparent timelines and pricing agreed before work starts — and held to after it does.",
  },
  {
    icon: Layers,
    title: "Technology-agnostic",
    desc: "We choose the stack that fits your problem, not the one we'd prefer to sell you.",
  },
  {
    icon: HeartHandshake,
    title: "Accountable after launch",
    desc: "Support doesn't end at go-live. We stay attached to the outcome, not just the handover.",
  },
];

const process = [
  {
    num: "01",
    icon: Search,
    title: "Discover",
    desc: "Audit current systems and map them against your actual business goals.",
  },
  {
    num: "02",
    icon: Compass,
    title: "Architect",
    desc: "Design the technical blueprint and pressure-test it for feasibility before a line of code is written.",
  },
  {
    num: "03",
    icon: Hammer,
    title: "Build",
    desc: "Iterative development with weekly checkpoints, so direction is corrected early — not at the end.",
  },
  {
    num: "04",
    icon: LaunchIcon,
    title: "Deploy",
    desc: "Launch, monitor, and stabilize in production under real traffic and real conditions.",
  },
  {
    num: "05",
    icon: LifeBuoy,
    title: "Support",
    desc: "Ongoing maintenance and scaling as your business — and its technology needs — grow.",
  },
];

const industries = [
  { icon: Rocket, title: "Startups", desc: "Ship fast without rebuilding your foundation in eighteen months." },
  { icon: Store, title: "Small Businesses", desc: "Right-sized systems that don't charge enterprise rent." },
  { icon: Building2, title: "Enterprises", desc: "Integrations and governance that scale across teams and regions." },
  { icon: ShoppingCart, title: "E-Commerce", desc: "Storefronts and backends built to hold up on your busiest day." },
];

/* ----------------------------------------------------------------------- */
/*  Scroll-reveal hook — small, deliberate motion only.                    */
/* ----------------------------------------------------------------------- */
function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mql.matches) {
      setVisible(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return { ref, visible };
}

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ----------------------------------------------------------------------- */
/*  Hero signature: a node-link "bridge" — business nodes on the left,     */
/*  technology nodes on the right, joined by traced connector lines with   */
/*  a traveling pulse. This is the literal image of the tagline.          */
/* ----------------------------------------------------------------------- */
function ConnectionGraphic() {
  return (
    <svg
      viewBox="0 0 640 360"
      className="graphic-svg"
      role="img"
      aria-label="Diagram connecting business nodes to technology nodes"
    >
      <defs>
        <linearGradient id="trace" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#2F6FED" stopOpacity="0.1" />
          <stop offset="50%" stopColor="#5EE6FF" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#2F6FED" stopOpacity="0.1" />
        </linearGradient>
        <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#5EE6FF" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#5EE6FF" stopOpacity="0" />
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
          <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#1E2A44" strokeWidth="1.5" />
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
          <circle cx="70" cy={y} r="7" fill="#0B1220" stroke="#5EE6FF" strokeWidth="2" />
        </g>
      ))}

      {/* hub node (center) */}
      <circle cx="320" cy="180" r="34" fill="url(#nodeGlow)" />
      <circle cx="320" cy="180" r="11" fill="#0B1220" stroke="#2F6FED" strokeWidth="2.5" />

      {/* technology nodes (right) */}
      {[70, 180, 290].map((y, i) => (
        <g key={`t-${i}`}>
          <circle cx="570" cy={y} r="22" fill="url(#nodeGlow)" />
          <circle cx="570" cy={y} r="7" fill="#0B1220" stroke="#5EE6FF" strokeWidth="2" />
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

/* ----------------------------------------------------------------------- */
/*  Page                                                                    */
/* ----------------------------------------------------------------------- */
export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "#services", label: "Services" },
    { href: "#why-us", label: "Why Us" },
    { href: "#process", label: "Process" },
    { href: "#industries", label: "Industries" },
  ];

  return (
    <div className="pkit-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@500&display=swap');

        .pkit-root {
          --bg: #060A14;
          --surface: #0B1220;
          --surface-2: #111A2E;
          --border: #1E2A44;
          --border-soft: #182238;
          --blue: #2F6FED;
          --blue-soft: rgba(47,111,237,0.14);
          --cyan: #5EE6FF;
          --text: #E8ECF6;
          --muted: #8A93A8;
          --muted-2: #5F6A82;

          background: var(--bg);
          color: var(--text);
          font-family: 'Inter', sans-serif;
          min-height: 100vh;
          position: relative;
          overflow-x: hidden;
        }

        .pkit-root * { box-sizing: border-box; }

        .font-display { font-family: 'Space Grotesk', sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }

        .bg-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(to right, var(--border-soft) 1px, transparent 1px),
            linear-gradient(to bottom, var(--border-soft) 1px, transparent 1px);
          background-size: 64px 64px;
          mask-image: radial-gradient(ellipse 80% 50% at 50% 0%, black 40%, transparent 100%);
          opacity: 0.5;
          pointer-events: none;
        }

        .glow-blue {
          position: absolute;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, var(--blue-soft) 0%, transparent 70%);
          pointer-events: none;
        }

        .navbar {
          position: sticky;
          top: 0;
          z-index: 50;
          backdrop-filter: blur(12px);
          background: rgba(6,10,20,0.7);
          border-bottom: 1px solid transparent;
          transition: border-color 0.3s ease, background 0.3s ease;
        }
        .navbar.scrolled {
          border-bottom: 1px solid var(--border-soft);
          background: rgba(6,10,20,0.92);
        }

        .nav-link {
          color: var(--muted);
          font-size: 14px;
          font-weight: 500;
          transition: color 0.2s ease;
        }
        .nav-link:hover { color: var(--text); }

        .btn-primary {
          background: var(--blue);
          color: #fff;
          font-weight: 600;
          font-size: 14px;
          border-radius: 8px;
          padding: 10px 20px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
          box-shadow: 0 0 0 0 rgba(47,111,237,0);
        }
        .btn-primary:hover {
          background: #3F7CF7;
          transform: translateY(-1px);
          box-shadow: 0 8px 24px -8px rgba(47,111,237,0.6);
        }

        .btn-secondary {
          border: 1px solid var(--border);
          color: var(--text);
          font-weight: 600;
          font-size: 14px;
          border-radius: 8px;
          padding: 10px 20px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: border-color 0.2s ease, background 0.2s ease;
        }
        .btn-secondary:hover {
          border-color: var(--blue);
          background: var(--surface);
        }

        .eyebrow {
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--cyan);
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        .eyebrow::before {
          content: '';
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--cyan);
          box-shadow: 0 0 8px var(--cyan);
        }

        .card {
          background: var(--surface);
          border: 1px solid var(--border-soft);
          border-radius: 14px;
          transition: border-color 0.25s ease, transform 0.25s ease, background 0.25s ease;
        }
        .card:hover {
          border-color: var(--blue);
          transform: translateY(-4px);
          background: var(--surface-2);
        }

        .icon-box {
          width: 44px;
          height: 44px;
          border-radius: 10px;
          background: var(--blue-soft);
          border: 1px solid rgba(47,111,237,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--cyan);
        }

        .graphic-svg { width: 100%; height: auto; }
        .graphic-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.1em;
          fill: var(--muted-2);
        }
        .trace-line {
          animation: dash-travel 3.5s linear infinite;
        }
        @keyframes dash-travel {
          0% { stroke-dashoffset: 220; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { stroke-dashoffset: -220; opacity: 0; }
        }

        .process-line {
          background: linear-gradient(to bottom, var(--border) 0%, var(--blue) 50%, var(--border) 100%);
        }

        .section-pad { padding: 96px 24px; }
        @media (max-width: 640px) {
          .section-pad { padding: 64px 20px; }
        }

        .max-wrap { max-width: 1180px; margin: 0 auto; }

        a, button { outline: none; }
        a:focus-visible, button:focus-visible {
          outline: 2px solid var(--cyan);
          outline-offset: 2px;
          border-radius: 4px;
        }

        @media (prefers-reduced-motion: reduce) {
          .trace-line { animation: none; opacity: 0.6; }
        }
      `}</style>

     
      {/* ---------------- HERO ---------------- */}
      <header className="section-pad" style={{ position: "relative", paddingTop: 88, paddingBottom: 64 }}>
        <div className="bg-grid" />
        <div className="glow-blue" style={{ top: -200, left: "50%", transform: "translateX(-50%)" }} />
        <div className="max-wrap" style={{ position: "relative", display: "grid", gridTemplateColumns: "1fr", gap: 48, alignItems: "center" }}>
          <div className="hero-grid-cols">
            <div>
              <Reveal>
                <span className="eyebrow">PKIT Consultants</span>
              </Reveal>
              <Reveal delay={80}>
                <h1 className="font-display" style={{ fontSize: "clamp(34px, 6vw, 58px)", lineHeight: 1.08, fontWeight: 700, marginTop: 18, letterSpacing: "-0.02em" }}>
                  Connecting Business
                  <br />
                  with <span style={{ color: "var(--blue)" }}>Technology</span>
                </h1>
              </Reveal>
              <Reveal delay={160}>
                <p style={{ color: "var(--muted)", fontSize: 18, lineHeight: 1.7, marginTop: 22, maxWidth: 520 }}>
                 PKIT Consultants helps startups, enterprises, and growing businesses
accelerate digital transformation through AI solutions, custom software
development, mobile applications, and strategic IT consultancy services.
                </p>
              </Reveal>
              <Reveal delay={240}>
                <div style={{ display: "flex", gap: 14, marginTop: 32, flexWrap: "wrap" }}>
                  <a href="#cta" className="btn-primary">
                    Get Free Consultation <ArrowRight size={16} />
                  </a>
                  <a href="#services" className="btn-secondary">
                    Explore Services
                  </a>
                </div>
              </Reveal>
            </div>

            <Reveal delay={200}>
              <div style={{ padding: "8px 0" }}>
                <ConnectionGraphic />
              </div>
            </Reveal>
          </div>
        </div>

        <style>{`
          @media (min-width: 900px) {
            .hero-grid-cols {
              display: grid !important;
              grid-template-columns: 1fr 1fr;
              gap: 48px;
              align-items: center;
            }
          }
        `}</style>
      </header>

      {/* ---------------- TRUST SECTION ---------------- */}
<section className="section-pad">
  <div className="max-wrap">

    <Reveal>
      <span className="eyebrow">Why Businesses Trust PKIT</span>

      <h2
        className="font-display"
        style={{
          fontSize: "clamp(28px, 4vw, 40px)",
          fontWeight: 700,
          marginTop: 14,
          letterSpacing: "-0.02em",
        }}
      >
        Built for Growth. Trusted for Delivery.
      </h2>
    </Reveal>

    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: 20,
        marginTop: 40,
      }}
    >

      <Reveal delay={50}>
        <div className="card" style={{ padding: 28 }}>
          <h3
            style={{
              color: "var(--blue)",
              fontSize: 32,
              fontWeight: 700,
            }}
          >
            Business
          </h3>

          <p
            style={{
              marginTop: 10,
              fontWeight: 600,
            }}
          >
            Focused
          </p>

          <p style={{ color: "var(--muted)", marginTop: 8 }}>
            Established with a vision to connect businesses with technology.
          </p>
        </div>
      </Reveal>

      <Reveal delay={100}>
        <div className="card" style={{ padding: 28 }}>
          <h3
            style={{
              color: "var(--blue)",
              fontSize: 32,
              fontWeight: 700,
            }}
          >
            Dubai
          </h3>

          <p
            style={{
              marginTop: 10,
              fontWeight: 600,
            }}
          >
            UAE Based
          </p>

          <p style={{ color: "var(--muted)", marginTop: 8 }}>
            Delivering technology consulting and software solutions globally.
          </p>
        </div>
      </Reveal>

      <Reveal delay={150}>
        <div className="card" style={{ padding: 28 }}>
          <h3
            style={{
              color: "var(--blue)",
              fontSize: 32,
              fontWeight: 700,
            }}
          >
            AI
          </h3>

          <p
            style={{
              marginTop: 10,
              fontWeight: 600,
            }}
          >
            AI Solutions
          </p>

          <p style={{ color: "var(--muted)", marginTop: 8 }}>
            Generative AI, automation, chatbots, and intelligent business tools.
          </p>
        </div>
      </Reveal>

      <Reveal delay={200}>
        <div className="card" style={{ padding: 28 }}>
          <h3
            style={{
              color: "var(--blue)",
              fontSize: 32,
              fontWeight: 700,
            }}
          >
            4+
          </h3>

          <p
            style={{
              marginTop: 10,
              fontWeight: 600,
            }}
          >
            Core Services
          </p>

          <p style={{ color: "var(--muted)", marginTop: 8 }}>
            Software development, mobile apps, AI solutions, and IT consultancy.
          </p>
        </div>
      </Reveal>

    </div>
  </div>
</section>

      {/* ---------------- SERVICES ---------------- */}
      <section id="services" className="section-pad">
        <div className="max-wrap">
          <Reveal>
            <span className="eyebrow">What We Do</span>
            <h2 className="font-display" style={{ fontSize: "clamp(26px, 4vw, 36px)", fontWeight: 700, marginTop: 14, letterSpacing: "-0.01em" }}>
              Four disciplines. One accountable team.
            </h2>
          </Reveal>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: 20,
              marginTop: 40,
            }}
          >
            {services.map((s, i) => (
              <Reveal key={s.title} delay={i * 80}>
                <div className="card" style={{ padding: 28, height: "100%" }}>
                  <div className="icon-box">
                    <s.icon size={20} />
                  </div>
                  <h3 className="font-display" style={{ fontSize: 18, fontWeight: 600, marginTop: 18 }}>
                    {s.title}
                  </h3>
                  <p style={{ color: "var(--muted)", fontSize: 14.5, lineHeight: 1.65, marginTop: 10 }}>{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- WHY CHOOSE US ---------------- */}
      {/* ---------------- WHY CHOOSE US ---------------- */}
<section id="why-us" className="section-pad">
  <div className="max-wrap">

    <Reveal>
      <span className="eyebrow">Why Choose PKIT</span>

      <h2
        className="font-display"
        style={{
          fontSize: "clamp(28px, 4vw, 40px)",
          fontWeight: 700,
          marginTop: 14,
          letterSpacing: "-0.02em",
        }}
      >
        Technology Solutions Built Around Your Business
      </h2>

      <p
        style={{
          color: "var(--muted)",
          marginTop: 20,
          maxWidth: 700,
          lineHeight: 1.8,
        }}
      >
        We don't just build software. We help businesses identify the
        right technology strategy, implement scalable solutions,
        and support long-term growth.
      </p>
    </Reveal>

    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: 24,
        marginTop: 50,
      }}
    >

      <Reveal delay={50}>
        <div className="card" style={{ padding: 30 }}>
          <h3 style={{ fontSize: 22, fontWeight: 600 }}>
            Business-First Approach
          </h3>

          <p
            style={{
              color: "var(--muted)",
              marginTop: 14,
              lineHeight: 1.8,
            }}
          >
            Every solution begins with understanding your business goals,
            challenges, and growth plans before recommending technology.
          </p>
        </div>
      </Reveal>

      <Reveal delay={100}>
        <div className="card" style={{ padding: 30 }}>
          <h3 style={{ fontSize: 22, fontWeight: 600 }}>
            Scalable Solutions
          </h3>

          <p
            style={{
              color: "var(--muted)",
              marginTop: 14,
              lineHeight: 1.8,
            }}
          >
            We build systems that can grow alongside your business
            without requiring costly rebuilds in the future.
          </p>
        </div>
      </Reveal>

      <Reveal delay={150}>
        <div className="card" style={{ padding: 30 }}>
          <h3 style={{ fontSize: 22, fontWeight: 600 }}>
            Modern Technology Stack
          </h3>

          <p
            style={{
              color: "var(--muted)",
              marginTop: 14,
              lineHeight: 1.8,
            }}
          >
            Leveraging AI, cloud platforms, automation tools,
            and modern development frameworks to maximize results.
          </p>
        </div>
      </Reveal>

      <Reveal delay={200}>
        <div className="card" style={{ padding: 30 }}>
          <h3 style={{ fontSize: 22, fontWeight: 600 }}>
            Long-Term Partnership
          </h3>

          <p
            style={{
              color: "var(--muted)",
              marginTop: 14,
              lineHeight: 1.8,
            }}
          >
            Beyond delivery, we provide ongoing support,
            consulting, optimization, and technology guidance.
          </p>
        </div>
      </Reveal>

    </div>
  </div>
</section>

      {/* ---------------- OUR PROCESS ---------------- */}
      <section id="process" className="section-pad">
        <div className="max-wrap">
          <Reveal>
            <span className="eyebrow">Our Process</span>
            <h2 className="font-display" style={{ fontSize: "clamp(26px, 4vw, 36px)", fontWeight: 700, marginTop: 14, letterSpacing: "-0.01em" }}>
              Five stages. No surprises in between.
            </h2>
          </Reveal>

          <div style={{ marginTop: 48, position: "relative" }}>
            {process.map((p, i) => (
              <Reveal key={p.num} delay={i * 90}>
                <div style={{ display: "flex", gap: 24, position: "relative", paddingBottom: i === process.length - 1 ? 0 : 36 }}>
                  {i !== process.length - 1 && (
                    <div
                      className="process-line"
                      style={{
                        position: "absolute",
                        left: 27,
                        top: 56,
                        width: 2,
                        height: "calc(100% - 36px)",
                      }}
                    />
                  )}
                  <div
                    style={{
                      flexShrink: 0,
                      width: 56,
                      height: 56,
                      borderRadius: 14,
                      background: "var(--surface)",
                      border: "1px solid var(--border)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                      zIndex: 1,
                    }}
                  >
                    <p.icon size={22} color="var(--blue)" />
                  </div>
                  <div style={{ paddingTop: 4 }}>
                    <span className="font-mono" style={{ fontSize: 12, color: "var(--muted-2)", letterSpacing: "0.1em" }}>
                      {p.num}
                    </span>
                    <h3 className="font-display" style={{ fontSize: 18, fontWeight: 600, marginTop: 4 }}>
                      {p.title}
                    </h3>
                    <p style={{ color: "var(--muted)", fontSize: 14.5, lineHeight: 1.6, marginTop: 6, maxWidth: 520 }}>{p.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- INDUSTRIES ---------------- */}
      <section id="industries" className="section-pad" style={{ background: "var(--surface)", borderTop: "1px solid var(--border-soft)", borderBottom: "1px solid var(--border-soft)" }}>
        <div className="max-wrap">
          <Reveal>
            <span className="eyebrow">Industries We Serve</span>
            <h2 className="font-display" style={{ fontSize: "clamp(26px, 4vw, 36px)", fontWeight: 700, marginTop: 14, letterSpacing: "-0.01em" }}>
              Built for where you are, not where a template assumes you are.
            </h2>
          </Reveal>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
              gap: 20,
              marginTop: 40,
            }}
          >
            {industries.map((ind, i) => (
              <Reveal key={ind.title} delay={i * 80}>
                <div className="card" style={{ padding: 26, height: "100%" }}>
                  <ind.icon size={24} color="var(--blue)" />
                  <h3 className="font-display" style={{ fontSize: 17, fontWeight: 600, marginTop: 16 }}>
                    {ind.title}
                  </h3>
                  <p style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.6, marginTop: 8 }}>{ind.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- CTA ---------------- */}
      <section id="cta" className="section-pad" style={{ position: "relative", textAlign: "center" }}>
        <div className="glow-blue" style={{ bottom: -200, left: "50%", transform: "translateX(-50%)" }} />
        <div className="max-wrap" style={{ position: "relative" }}>
          <Reveal>
            <h2 className="font-display" style={{ fontSize: "clamp(28px, 5vw, 44px)", fontWeight: 700, letterSpacing: "-0.02em", maxWidth: 680, margin: "0 auto" }}>
              Ready to connect your business with the right technology?
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p style={{ color: "var(--muted)", fontSize: 16, marginTop: 16, maxWidth: 480, marginLeft: "auto", marginRight: "auto" }}>
              Tell us where the friction is. We'll tell you, honestly, whether we're the
              right fit to fix it.
            </p>
          </Reveal>
          <Reveal delay={180}>
            <div style={{ marginTop: 30 }}>
              <a href="#" className="btn-primary" style={{ padding: "13px 28px", fontSize: 15 }}>
                Book a Consultation <ArrowRight size={16} />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- FOOTER ---------------- */}
      <footer style={{ borderTop: "1px solid var(--border-soft)", padding: "32px 24px" }}>
        <div
          className="max-wrap"
          style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center", justifyContent: "space-between" }}
        >
          <div className="font-display" style={{ fontSize: 16, fontWeight: 700 }}>
            PKIT<span style={{ color: "var(--blue)" }}>.</span>
            <span style={{ color: "var(--muted-2)", fontWeight: 400, fontSize: 13, marginLeft: 12 }}>
              Connecting Business with Technology
            </span>
          </div>
          <p style={{ color: "var(--muted-2)", fontSize: 13 }}>
            © {new Date().getFullYear()} PKIT Consultants. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}