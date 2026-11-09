"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/ui/Reveal";
import { Mail, Phone, MessageSquare, MapPin, Clock, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { useToast } from "@/components/ui/ToastProvider";

interface ContactClientProps {
  companyInfo: {
    name: string;
    tagline: string;
    email: string;
    phone: string;
    whatsappLink: string;
    address: string;
    hours: string;
    mapEmbedUrl: string;
  };
}

function ContactFormSection({ companyInfo }: { companyInfo: ContactClientProps["companyInfo"] }) {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: "",
    phone: "",
    service: "",
    budget: "",
    contactMethod: "",
    timeline: "",
    projectDescription: "",
  });

  // Pre-fill service from query parameters if available
  useEffect(() => {
    const serviceParam = searchParams.get("service");
    const industryParam = searchParams.get("industry");
    
    if (serviceParam) {
      setFormData((prev) => ({ ...prev, service: serviceParam }));
    }
    if (industryParam) {
      setFormData((prev) => ({
        ...prev,
        projectDescription: `We are interested in discussing solutions for the ${industryParam} industry.`,
      }));
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitted(true);
        setFormData({
          fullName: "",
          email: "",
          company: "",
          phone: "",
          service: "",
          budget: "",
          contactMethod: "",
          timeline: "",
          projectDescription: "",
        });
      } else {
        toast.error(data.message || "Submission failed. Please try again.");
      }
    } catch {
      toast.error("Something went wrong. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <Reveal>
        <div
          style={{
            background: "var(--surface)",
            border: "1px solid var(--blue-soft)",
            borderRadius: 16,
            padding: "48px 32px",
            textAlign: "center",
            boxShadow: "0 12px 32px -8px rgba(47, 111, 237, 0.15)",
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              background: "rgba(16, 185, 129, 0.1)",
              border: "1px solid rgba(16, 185, 129, 0.3)",
              color: "#10B981",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 24px",
            }}
          >
            <CheckCircle2 size={28} />
          </div>
          <h3 className="font-display" style={{ fontSize: 22, fontWeight: 700, marginBottom: 12 }}>
            Consultation Request Sent!
          </h3>
          <p style={{ color: "var(--muted)", fontSize: 14.5, lineHeight: 1.6, maxWidth: 360, marginInline: "auto" }}>
            Thank you for reaching out. A senior technical consultant from PK IT will review your details and contact you within 24 business hours.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="btn-secondary"
            style={{ marginTop: 24, fontSize: 13, padding: "8px 18px" }}
          >
            Submit Another Request
          </button>
        </div>
      </Reveal>
    );
  }

  return (
    <Reveal>
      <div
        style={{
          background: "linear-gradient(135deg, #101E36 0%, #071326 100%)",
          border: "1px solid rgba(213, 172, 66, 0.3)",
          borderRadius: 18,
          padding: "40px 32px",
          boxShadow: "0 20px 50px rgba(0, 0, 0, 0.6)",
        }}
      >
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#D5AC42",
            display: "inline-block",
            marginBottom: 14,
          }}
        >
          CONCIERGE INQUIRY
        </span>
        <h2
          className="font-serif"
          style={{ fontSize: "clamp(24px, 3vw, 32px)", fontWeight: 700, color: "#F4F0E8", marginBottom: 24 }}
        >
          Request Architecture Scoping
        </h2>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16 }} className="form-row-2">
            <div>
              <label htmlFor="fullName" style={{ display: "none" }}>Full Name</label>
              <input
                id="fullName"
                type="text"
                placeholder="Full Name *"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                style={{
                  width: "100%",
                  padding: "13px 16px",
                  borderRadius: 8,
                  background: "rgba(7, 19, 38, 0.7)",
                  border: "1px solid rgba(213, 172, 66, 0.25)",
                  color: "#F4F0E8",
                  fontSize: 14,
                }}
                className="form-input focus:border-[#D5AC42] outline-none"
                required
              />
            </div>
            <div>
              <label htmlFor="email" style={{ display: "none" }}>Email Address</label>
              <input
                id="email"
                type="email"
                placeholder="Email Address *"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                style={{
                  width: "100%",
                  padding: "13px 16px",
                  borderRadius: 8,
                  background: "rgba(7, 19, 38, 0.7)",
                  border: "1px solid rgba(213, 172, 66, 0.25)",
                  color: "#F4F0E8",
                  fontSize: 14,
                }}
                className="form-input focus:border-[#D5AC42] outline-none"
                required
              />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16 }} className="form-row-2">
            <div>
              <label htmlFor="company" style={{ display: "none" }}>Company Name</label>
              <input
                id="company"
                type="text"
                placeholder="Company Name"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                style={{
                  width: "100%",
                  padding: "13px 16px",
                  borderRadius: 8,
                  background: "rgba(7, 19, 38, 0.7)",
                  border: "1px solid rgba(213, 172, 66, 0.25)",
                  color: "#F4F0E8",
                  fontSize: 14,
                }}
                className="form-input focus:border-[#D5AC42] outline-none"
              />
            </div>
            <div>
              <label htmlFor="phone" style={{ display: "none" }}>Phone Number</label>
              <input
                id="phone"
                type="tel"
                placeholder="Phone Number (e.g., +971...)"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                style={{
                  width: "100%",
                  padding: "13px 16px",
                  borderRadius: 8,
                  background: "rgba(7, 19, 38, 0.7)",
                  border: "1px solid rgba(213, 172, 66, 0.25)",
                  color: "#F4F0E8",
                  fontSize: 14,
                }}
                className="form-input focus:border-[#D5AC42] outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="projectDescription" style={{ display: "none" }}>Project Overview</label>
            <textarea
              id="projectDescription"
              rows={4}
              placeholder="Tell us about your project requirements, goals, or architectural bottlenecks..."
              value={formData.projectDescription}
              onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })}
              style={{
                width: "100%",
                padding: "13px 16px",
                borderRadius: 8,
                background: "rgba(7, 19, 38, 0.7)",
                border: "1px solid rgba(213, 172, 66, 0.25)",
                color: "#F4F0E8",
                fontSize: 14,
                resize: "vertical",
              }}
              className="form-input focus:border-[#D5AC42] outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              justifyContent: "center",
              paddingBlock: 14,
              cursor: loading ? "not-allowed" : "pointer",
            }}
            className="btn-gold-pill"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" /> Submitting Request...
              </>
            ) : (
              <>
                <span>Book Architecture Scoping</span> <ArrowRight size={15} />
              </>
            )}
          </button>
        </form>
      </div>
    </Reveal>
  );
}

export default function ContactClient({ companyInfo }: ContactClientProps) {
  const { theme } = useTheme();

  return (
    <div style={{ position: "relative", minHeight: "100vh", overflow: "hidden", background: "#071326", color: "#F4F0E8" }}>
      {/* Background patterns */}
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
        {/* Header */}
        <div style={{ marginBottom: 64, textAlign: "center", maxWidth: 820, marginInline: "auto" }}>
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
                DUBAI CONCIERGE CONSULTATION
              </span>
              <span style={{ width: 6, height: 6, transform: "rotate(45deg)", background: "#D5AC42" }} />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h1
              className="font-serif"
              style={{
                fontSize: "clamp(34px, 4.8vw, 56px)",
                fontWeight: 700,
                color: "#F4F0E8",
                textTransform: "uppercase",
                margin: "0 0 18px",
                lineHeight: 1.15,
              }}
            >
              Initiate Your Architecture Review
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p style={{ color: "#9CAAC0", fontSize: 16, lineHeight: 1.7, maxWidth: 660, margin: "0 auto" }}>
              Discuss your project specifications, AI integrations, or software modernization roadmap with our senior architects in Dubai.
            </p>
          </Reveal>
        </div>

        {/* 2 Column Layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 48,
          }}
          className="contact-layout-grid"
        >
          {/* Column 1: Contact Details & Map */}
          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            <Reveal>
              <div
                style={{
                  background: "linear-gradient(135deg, #101E36 0%, #071326 100%)",
                  border: "1px solid rgba(213, 172, 66, 0.28)",
                  borderRadius: 18,
                  padding: 36,
                  display: "grid",
                  gridTemplateColumns: "1fr",
                  gap: 24,
                  boxShadow: "0 20px 50px rgba(0, 0, 0, 0.6)",
                }}
                className="contact-info-grid"
              >
                {/* Phone & Call */}
                <div style={{ display: "flex", gap: 16 }}>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      background: "rgba(213, 172, 66, 0.12)",
                      border: "1px solid rgba(213, 172, 66, 0.3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#D5AC42",
                    }}
                  >
                    <Phone size={18} />
                  </div>
                  <div>
                    <h4
                      style={{
                        fontSize: 11,
                        color: "#D5AC42",
                        textTransform: "uppercase",
                        letterSpacing: "0.15em",
                        margin: 0,
                      }}
                      className="font-mono"
                    >
                      Phone & Call
                    </h4>
                    <a
                      href={`tel:${companyInfo.phone.replace(/\s+/g, "")}`}
                      style={{
                        color: "#F4F0E8",
                        textDecoration: "none",
                        fontSize: 16,
                        fontWeight: 600,
                        display: "block",
                        marginTop: 4,
                      }}
                    >
                      {companyInfo.phone}
                    </a>
                  </div>
                </div>

                {/* WhatsApp Chat Card */}
                <div style={{ display: "flex", gap: 16 }}>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      color: "#25D366",
                      background: "rgba(37,211,102,0.1)",
                      border: "1px solid rgba(37,211,102,0.3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <MessageSquare size={18} />
                  </div>
                  <div>
                    <h4
                      style={{
                        fontSize: 11,
                        color: "#D5AC42",
                        textTransform: "uppercase",
                        letterSpacing: "0.15em",
                        margin: 0,
                      }}
                      className="font-mono"
                    >
                      WhatsApp Business
                    </h4>
                    <a
                      href={companyInfo.whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: "#25D366",
                        textDecoration: "none",
                        fontSize: 15,
                        fontWeight: 600,
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                        marginTop: 4,
                      }}
                      className="whatsapp-btn"
                    >
                      Chat on WhatsApp <ArrowRight size={14} />
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div style={{ display: "flex", gap: 16 }}>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      background: "rgba(213, 172, 66, 0.12)",
                      border: "1px solid rgba(213, 172, 66, 0.3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#D5AC42",
                    }}
                  >
                    <Mail size={18} />
                  </div>
                  <div>
                    <h4
                      style={{
                        fontSize: 11,
                        color: "#D5AC42",
                        textTransform: "uppercase",
                        letterSpacing: "0.15em",
                        margin: 0,
                      }}
                      className="font-mono"
                    >
                      Email Address
                    </h4>
                    <a
                      href={`mailto:${companyInfo.email}`}
                      style={{
                        color: "#F4F0E8",
                        textDecoration: "none",
                        fontSize: 16,
                        fontWeight: 600,
                        display: "block",
                        marginTop: 4,
                      }}
                    >
                      {companyInfo.email}
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div style={{ display: "flex", gap: 16 }}>
                  <div className="icon-box" style={{ width: 40, height: 40 }}>
                    <MapPin size={18} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: 13, color: "var(--muted-2)", textTransform: "uppercase", letterSpacing: "0.05em" }} className="font-mono">
                      Office Location
                    </h4>
                    <p style={{ color: "var(--text)", fontSize: 15, fontWeight: 600, margin: 0, marginTop: 4 }}>
                      {companyInfo.address}
                    </p>
                  </div>
                </div>

                {/* Operating Hours */}
                <div style={{ display: "flex", gap: 16 }}>
                  <div className="icon-box" style={{ width: 40, height: 40 }}>
                    <Clock size={18} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: 13, color: "var(--muted-2)", textTransform: "uppercase", letterSpacing: "0.05em" }} className="font-mono">
                      Operating Hours
                    </h4>
                    <p style={{ color: "var(--muted)", fontSize: 14.5, margin: 0, marginTop: 4 }}>
                      {companyInfo.hours}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Google Map Card */}
            <Reveal>
              <div
                style={{
                  border: "1px solid var(--border)",
                  borderRadius: 16,
                  overflow: "hidden",
                  background: "var(--surface)",
                  height: 320,
                  position: "relative",
                }}
              >
                <iframe
                  title="PK IT Consultants Dubai Office Location"
                  src={companyInfo.mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{
                    border: 0,
                    filter: theme === "light" 
                      ? "grayscale(0.4) opacity(0.9)" 
                      : "grayscale(1) invert(0.92) contrast(1.15) opacity(0.85)",
                  }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </Reveal>
          </div>

          {/* Column 2: Form */}
          <div>
            <Suspense fallback={
              <div style={{ display: "flex", flexDirection: "column", gap: 12, padding: 32, background: "var(--surface)", border: "1px solid var(--border-soft)", borderRadius: 16, alignItems: "center", justifyContent: "center" }}>
                <Loader2 className="animate-spin" size={24} color="var(--blue)" />
                <span style={{ fontSize: 14, color: "var(--muted)" }}>Loading Consultation Form...</span>
              </div>
            }>
              <ContactFormSection companyInfo={companyInfo} />
            </Suspense>
          </div>
        </div>
      </div>

      <style>{`
        .form-input:focus {
          border-color: var(--blue) !important;
          outline: none;
          box-shadow: 0 0 0 3px rgba(47, 111, 237, 0.2) !important;
        }
        .whatsapp-btn:hover {
          color: #fff !important;
        }
        .whatsapp-btn:hover svg {
          transform: translateX(2px);
        }
        @media (min-width: 900px) {
          .contact-layout-grid {
            grid-template-columns: 1fr 1.2fr !important;
          }
          .contact-info-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 32px 24px !important;
          }
        }
      `}</style>
    </div>
  );
}
