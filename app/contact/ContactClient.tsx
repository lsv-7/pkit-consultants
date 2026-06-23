"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/ui/Reveal";
import { Mail, Phone, MessageSquare, MapPin, Clock, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

function ContactFormSection() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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
        alert("Submission failed. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please check your connection.");
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
            Thank you for reaching out. A senior technical consultant from PKIT will review your details and contact you within 24 business hours.
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
          background: "var(--surface)",
          border: "1px solid var(--border-soft)",
          borderRadius: 16,
          padding: "36px 32px",
        }}
      >
        <h2 className="font-display" style={{ fontSize: 22, fontWeight: 600, marginBottom: 24 }}>
          Request a Free Consultation
        </h2>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16 }} className="form-row-2">
            <div>
              <label htmlFor="fullName" style={{ display: "none" }}>Full Name</label>
              <input
                id="fullName"
                type="text"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                style={{
                  width: "100%",
                  padding: "13px 16px",
                  borderRadius: 8,
                  background: "var(--surface-2)",
                  border: "1px solid var(--border)",
                  color: "var(--text)",
                  fontSize: 14,
                }}
                className="form-input"
                required
              />
            </div>
            <div>
              <label htmlFor="email" style={{ display: "none" }}>Email Address</label>
              <input
                id="email"
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                style={{
                  width: "100%",
                  padding: "13px 16px",
                  borderRadius: 8,
                  background: "var(--surface-2)",
                  border: "1px solid var(--border)",
                  color: "var(--text)",
                  fontSize: 14,
                }}
                className="form-input"
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
                  background: "var(--surface-2)",
                  border: "1px solid var(--border)",
                  color: "var(--text)",
                  fontSize: 14,
                }}
                className="form-input"
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
                  background: "var(--surface-2)",
                  border: "1px solid var(--border)",
                  color: "var(--text)",
                  fontSize: 14,
                }}
                className="form-input"
                required
              />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16 }} className="form-row-2">
            <div>
              <label htmlFor="service" style={{ display: "none" }}>Select Service</label>
              <select
                id="service"
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                style={{
                  width: "100%",
                  padding: "13px 16px",
                  borderRadius: 8,
                  background: "var(--surface-2)",
                  border: "1px solid var(--border)",
                  color: formData.service ? "var(--text)" : "var(--muted-2)",
                  fontSize: 14,
                  cursor: "pointer",
                }}
                className="form-input"
                required
              >
                <option value="" style={{ color: "var(--muted-2)" }}>Select Service</option>
                <option value="AI Solutions" style={{ color: "var(--text)" }}>AI Solutions</option>
                <option value="Software Development" style={{ color: "var(--text)" }}>Software Development</option>
                <option value="Web Development" style={{ color: "var(--text)" }}>Web Development</option>
                <option value="Mobile Apps" style={{ color: "var(--text)" }}>Mobile Apps</option>
                <option value="Cloud Solutions" style={{ color: "var(--text)" }}>Cloud Solutions</option>
                <option value="Cybersecurity" style={{ color: "var(--text)" }}>Cybersecurity</option>
                <option value="IT Consulting" style={{ color: "var(--text)" }}>IT Consulting</option>
                <option value="Digital Transformation" style={{ color: "var(--text)" }}>Digital Transformation</option>
              </select>
            </div>
            <div>
              <label htmlFor="budget" style={{ display: "none" }}>Budget Range</label>
              <select
                id="budget"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                style={{
                  width: "100%",
                  padding: "13px 16px",
                  borderRadius: 8,
                  background: "var(--surface-2)",
                  border: "1px solid var(--border)",
                  color: formData.budget ? "var(--text)" : "var(--muted-2)",
                  fontSize: 14,
                  cursor: "pointer",
                }}
                className="form-input"
              >
                <option value="">Budget Range</option>
                <option value="Under $5,000">Under $5,000</option>
                <option value="$5,000 - $15,000">$5,000 - $15,000</option>
                <option value="$15,000 - $35,000">$15,000 - $35,000</option>
                <option value="$35,000+">$35,000+</option>
              </select>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16 }} className="form-row-2">
            <div>
              <label htmlFor="contactMethod" style={{ display: "none" }}>Preferred Contact Method</label>
              <select
                id="contactMethod"
                value={formData.contactMethod}
                onChange={(e) => setFormData({ ...formData, contactMethod: e.target.value })}
                style={{
                  width: "100%",
                  padding: "13px 16px",
                  borderRadius: 8,
                  background: "var(--surface-2)",
                  border: "1px solid var(--border)",
                  color: formData.contactMethod ? "var(--text)" : "var(--muted-2)",
                  fontSize: 14,
                  cursor: "pointer",
                }}
                className="form-input"
              >
                <option value="">Preferred Contact Method</option>
                <option value="Email">Email</option>
                <option value="Phone">Phone</option>
                <option value="WhatsApp">WhatsApp</option>
              </select>
            </div>
            <div>
              <label htmlFor="timeline" style={{ display: "none" }}>Project Timeline</label>
              <select
                id="timeline"
                value={formData.timeline}
                onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                style={{
                  width: "100%",
                  padding: "13px 16px",
                  borderRadius: 8,
                  background: "var(--surface-2)",
                  border: "1px solid var(--border)",
                  color: formData.timeline ? "var(--text)" : "var(--muted-2)",
                  fontSize: 14,
                  cursor: "pointer",
                }}
                className="form-input"
              >
                <option value="">Project Timeline</option>
                <option value="Immediate">Immediate</option>
                <option value="Within 1 Month">Within 1 Month</option>
                <option value="Within 3 Months">Within 3 Months</option>
                <option value="6+ Months">6+ Months</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="projectDescription" style={{ display: "none" }}>Project Description</label>
            <textarea
              id="projectDescription"
              rows={5}
              placeholder="Tell us about your project requirements..."
              value={formData.projectDescription}
              onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })}
              style={{
                width: "100%",
                padding: "13px 16px",
                borderRadius: 8,
                background: "var(--surface-2)",
                border: "1px solid var(--border)",
                color: "var(--text)",
                fontSize: 14,
                lineHeight: 1.5,
                resize: "vertical",
              }}
              className="form-input"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              justifyContent: "center",
              paddingBlock: 14,
              fontSize: 15,
              cursor: loading ? "not-allowed" : "pointer",
            }}
            className="btn-primary"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" /> Submitting Request...
              </>
            ) : (
              <>
                Request Consultation <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>
      </div>
    </Reveal>
  );
}

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

export default function ContactClient({ companyInfo }: ContactClientProps) {
  const { theme } = useTheme();

  return (
    <div className="pkit-root-page" style={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}>
      {/* Background patterns */}
      <div className="bg-grid" style={{ opacity: 0.35 }} />
      <div className="glow-blue" style={{ top: -150, left: "10%" }} />
      <div className="glow-blue" style={{ bottom: -200, right: "15%" }} />

      <div className="max-wrap section-pad" style={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div style={{ marginBottom: 64 }}>
          <SectionHeader
            eyebrow="Get In Touch"
            heading="Initiate Your Architecture Review"
            description="Discuss your project specs, AI integrations, or consulting roadmap. Complete the form or contact our Dubai office directly."
          />
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
                  background: "var(--surface)",
                  border: "1px solid var(--border-soft)",
                  borderRadius: 16,
                  padding: 32,
                  display: "grid",
                  gridTemplateColumns: "1fr",
                  gap: 24,
                }}
                className="contact-info-grid"
              >
                {/* Phone & Call */}
                <div style={{ display: "flex", gap: 16 }}>
                  <div className="icon-box" style={{ width: 40, height: 40 }}>
                    <Phone size={18} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: 13, color: "var(--muted-2)", textTransform: "uppercase", letterSpacing: "0.05em" }} className="font-mono">
                      Phone & Call
                    </h4>
                    <a href={`tel:${companyInfo.phone.replace(/\s+/g, "")}`} style={{ color: "var(--text)", textDecoration: "none", fontSize: 16, fontWeight: 600, display: "block", marginTop: 4 }}>
                      {companyInfo.phone}
                    </a>
                  </div>
                </div>

                {/* WhatsApp Chat Card */}
                <div style={{ display: "flex", gap: 16 }}>
                  <div className="icon-box" style={{ width: 40, height: 40, color: "#25D366", background: "rgba(37,211,102,0.08)", border: "1px solid rgba(37,211,102,0.25)" }}>
                    <MessageSquare size={18} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: 13, color: "var(--muted-2)", textTransform: "uppercase", letterSpacing: "0.05em" }} className="font-mono">
                      WhatsApp Business
                    </h4>
                    <a
                      href={companyInfo.whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "#25D366", textDecoration: "none", fontSize: 15, fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 6, marginTop: 4 }}
                      className="whatsapp-btn"
                    >
                      Chat on WhatsApp <ArrowRight size={14} />
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div style={{ display: "flex", gap: 16 }}>
                  <div className="icon-box" style={{ width: 40, height: 40 }}>
                    <Mail size={18} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: 13, color: "var(--muted-2)", textTransform: "uppercase", letterSpacing: "0.05em" }} className="font-mono">
                      Email Address
                    </h4>
                    <a href={`mailto:${companyInfo.email}`} style={{ color: "var(--text)", textDecoration: "none", fontSize: 16, fontWeight: 600, display: "block", marginTop: 4 }}>
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
                  title="PKIT Consultants Dubai Office Location"
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
              <ContactFormSection />
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
