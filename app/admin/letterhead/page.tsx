"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  FileSignature,
  Printer,
  Download,
  ArrowLeft,
  Copy,
  Check,
  RefreshCw,
  Sparkles,
  Building2,
  Calendar,
  User,
  FileText,
  ShieldCheck,
  Eye,
  Edit3
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { COMPANY } from "@/lib/company";
import { formatDisplayDate, formatDateInput } from "@/lib/date";

interface LetterheadData {
  refNo: string;
  date: string;
  recipientName: string;
  recipientTitle: string;
  recipientCompany: string;
  recipientAddress: string;
  subject: string;
  salutation: string;
  body: string;
  closing: string;
  includeSignature: boolean;
  signatoryName: string;
  signatoryTitle: string;
  signatoryCompany: string;
}

const TEMPLATES = {
  proposal: {
    label: "Strategic IT Proposal",
    data: {
      refNo: "PKIT/PROP/2026/0412",
      recipientName: "Mohammed Al Mansoori",
      recipientTitle: "Chief Technology Officer",
      recipientCompany: "Emirates Strategic Enterprises",
      recipientAddress: "Downtown Commercial District, Dubai, UAE",
      subject: "STRATEGIC ENTERPRISE IT CONSULTING & AI WORKFLOW AUTOMATION PROPOSAL",
      salutation: "Dear Mr. Al Mansoori,",
      body: `We are pleased to submit this strategic proposal on behalf of PK IT Consultants for the comprehensive digital transformation and AI workflow engineering initiatives discussed for your organization.

Our enterprise engagement model connects business objectives directly with advanced technology, deploying seasoned senior architects to engineer resilient, high-performance systems aligned with UAE corporate governance and global security benchmarks.

Key engagement deliverables encompassed within this roadmap include:
• Comprehensive Enterprise Cloud Architecture & Security Audit
• Custom Autonomous AI Agent Pipelines with Private Governance
• Mission-Critical Legacy System Modernization & Microservices
• 24/7 Enterprise SLA Support, Knowledge Transfer, and Operational Handoff

We remain at your service to discuss commercial parameters, project milestones, and resource scheduling at your convenience. We look forward to an impactful technology partnership.`,
      closing: "Sincerely,",
      includeSignature: true,
      signatoryName: "M. Prasanna Kumar",
      signatoryTitle: "Founder & Managing Director",
      signatoryCompany: "PK IT Consultants",
    },
  },
  commencement: {
    label: "Project Kickoff Notice",
    data: {
      refNo: "PKIT/OPS/2026/0188",
      recipientName: "Fatima Al Hashimi",
      recipientTitle: "VP of Digital Transformation",
      recipientCompany: "Gulf Regional Technologies LLC",
      recipientAddress: "Dubai Silicon Oasis, Dubai, UAE",
      subject: "NOTICE OF OFFICIAL PROJECT COMMENCEMENT — ENTERPRISE DIGITAL ARCHITECTURE",
      salutation: "Dear Ms. Al Hashimi,",
      body: `This formal communication serves to confirm the official commencement of your project with PK IT Consultants, effective from the date indicated above.

Our senior engineering task force has finalized initial sprint allocations, environment topologies, and security clearance verifications. Your designated Lead Solution Architect will conduct the inaugural sprint planning and requirements review session this week.

Immediate technical milestones:
• Secure Repository Provisioning & VPN Access Configuration
• Sprint 0 Architecture Blueprint Sign-off & Threat Model Review
• Bi-weekly Stakeholder Steering Committee Schedule Confirmation

Thank you for placing your trust in PK IT Consultants. We are committed to delivering engineering excellence.`,
      closing: "Warm regards,",
      includeSignature: true,
      signatoryName: "M. Prasanna Kumar",
      signatoryTitle: "Founder & Managing Director",
      signatoryCompany: "PK IT Consultants",
    },
  },
  transmittal: {
    label: "NDA / Document Transmittal",
    data: {
      refNo: "PKIT/LEGAL/2026/0095",
      recipientName: "Legal & Compliance Directorate",
      recipientTitle: "Head of Corporate Governance",
      recipientCompany: "Al Naboodah Technology Group",
      recipientAddress: "Business Bay, Dubai, UAE",
      subject: "TRANSMITTAL OF MUTUAL NON-DISCLOSURE AGREEMENT & PROPRIETARY SPECIFICATIONS",
      salutation: "Dear Corporate Counsel,",
      body: `Enclosed please find the executed Mutual Non-Disclosure Agreement (M-NDA) between your esteemed organization and PK IT Consultants.

This document formally protects all technical specifications, architectural diagrams, pricing disclosures, and strategic discussions conducted between our respective organizations.

Kindly retain one fully executed counterpart for your permanent corporate records and return the counter-signed copy to legal@pkitconsultants.com.

Should your legal team require any clarifications regarding operational clauses, please do not hesitate to contact our Dubai corporate office.`,
      closing: "Respectfully,",
      includeSignature: true,
      signatoryName: "M. Prasanna Kumar",
      signatoryTitle: "Founder & Managing Director",
      signatoryCompany: "PK IT Consultants",
    },
  },
  advisory: {
    label: "Executive Advisory Notice",
    data: {
      refNo: "PKIT/ADV/2026/0315",
      recipientName: "Executive Steering Committee",
      recipientTitle: "Board of Directors",
      recipientCompany: "Oasis Logistics Corporation",
      recipientAddress: "Jebel Ali Free Zone, Dubai, UAE",
      subject: "EXECUTIVE TECHNICAL ADVISORY: CLOUD INFRASTRUCTURE SECURITY & RESILIENCE",
      salutation: "Distinguished Members of the Board,",
      body: `Following our comprehensive technical infrastructure evaluation, PK IT Consultants presents this executive advisory memorandum highlighting strategic imperatives for your enterprise cloud environment.

Our assessment reveals critical opportunities to elevate system availability to 99.99%, reinforce zero-trust endpoint protection, and automate infrastructure failover across regional UAE cloud zones.

Recommended strategic priorities:
• Immediate migration of monolithic database endpoints to managed multi-region clusters
• Automated container vulnerability scanning within CI/CD release pipelines
• Role-Based Access Control (RBAC) audit across all cloud service accounts

Our senior advisory team is prepared to present complete architectural findings and executive briefings upon request.`,
      closing: "Sincerely,",
      includeSignature: true,
      signatoryName: "M. Prasanna Kumar",
      signatoryTitle: "Founder & Managing Director",
      signatoryCompany: "PK IT Consultants",
    },
  },
};

export default function LetterheadPage() {
  const [selectedTemplateKey, setSelectedTemplateKey] = useState<keyof typeof TEMPLATES>("proposal");
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");
  const [settings, setSettings] = useState<any>(null);

  const [formData, setFormData] = useState<LetterheadData>({
    refNo: TEMPLATES.proposal.data.refNo,
    date: formatDateInput(new Date()),
    recipientName: TEMPLATES.proposal.data.recipientName,
    recipientTitle: TEMPLATES.proposal.data.recipientTitle,
    recipientCompany: TEMPLATES.proposal.data.recipientCompany,
    recipientAddress: TEMPLATES.proposal.data.recipientAddress,
    subject: TEMPLATES.proposal.data.subject,
    salutation: TEMPLATES.proposal.data.salutation,
    body: TEMPLATES.proposal.data.body,
    closing: TEMPLATES.proposal.data.closing,
    includeSignature: TEMPLATES.proposal.data.includeSignature,
    signatoryName: TEMPLATES.proposal.data.signatoryName,
    signatoryTitle: TEMPLATES.proposal.data.signatoryTitle,
    signatoryCompany: TEMPLATES.proposal.data.signatoryCompany,
  });

  useEffect(() => {
    async function loadSettings() {
      try {
        const res = await fetch("/api/settings");
        if (res.ok) {
          const data = await res.json();
          setSettings(data);
        }
      } catch (e) {
        // Fallback to company constant
      }
    }
    loadSettings();
  }, []);

  const handleTemplateChange = (key: keyof typeof TEMPLATES) => {
    setSelectedTemplateKey(key);
    const tmpl = TEMPLATES[key];
    setFormData((prev) => ({
      ...prev,
      refNo: tmpl.data.refNo,
      recipientName: tmpl.data.recipientName,
      recipientTitle: tmpl.data.recipientTitle,
      recipientCompany: tmpl.data.recipientCompany,
      recipientAddress: tmpl.data.recipientAddress,
      subject: tmpl.data.subject,
      salutation: tmpl.data.salutation,
      body: tmpl.data.body,
      closing: tmpl.data.closing,
      includeSignature: tmpl.data.includeSignature,
      signatoryName: tmpl.data.signatoryName,
      signatoryTitle: tmpl.data.signatoryTitle,
      signatoryCompany: tmpl.data.signatoryCompany,
    }));
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = () => {
    const fullText = `${formData.refNo}\nDate: ${formData.date}\n\nTo:\n${formData.recipientName}\n${formData.recipientTitle}\n${formData.recipientCompany}\n${formData.recipientAddress}\n\nSUBJECT: ${formData.subject}\n\n${formData.salutation}\n\n${formData.body}\n\n${formData.closing}\n${formData.signatoryName}\n${formData.signatoryTitle}\n${formData.signatoryCompany}`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const companyName = settings?.companyName || COMPANY.name;
  const tagline = settings?.tagline || COMPANY.tagline;
  const phone = settings?.phone || COMPANY.phone;
  const email = settings?.email || COMPANY.email;
  const officeAddress = settings?.officeAddress || "Deira, Dubai, United Arab Emirates";
  const website = COMPANY.website;

  return (
    <>
      {/* Load letterhead styles */}
      <link rel="stylesheet" href="/letterhead.css" />

      {/* Screen Toolbar / Control Header */}
      <div className="no-print space-y-6 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0B1528] border border-[#1E293B] p-5 rounded-2xl shadow-xl">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-600/10 text-blue-400 border border-blue-500/20 rounded-xl">
              <FileSignature size={24} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-white tracking-tight">Official Corporate Letterhead</h1>
                <span className="px-2.5 py-0.5 text-[11px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full">
                  UAE Tech Spec
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Modern A4 corporate correspondence template for {companyName} • Print-ready vector output
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={handleCopyText}
              className="gap-1.5 h-9 bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700"
            >
              {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
              <span>{copied ? "Copied" : "Copy Text"}</span>
            </Button>

            <Button
              variant="indigo"
              size="sm"
              onClick={handlePrint}
              className="gap-1.5 h-9 bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20 font-medium"
            >
              <Printer size={14} />
              <span>Print / Save as PDF</span>
            </Button>
          </div>
        </div>

        {/* View Toggle on Mobile */}
        <div className="flex lg:hidden bg-slate-900 border border-slate-800 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab("edit")}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors ${
              activeTab === "edit" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            <Edit3 size={14} />
            <span>Composer</span>
          </button>
          <button
            onClick={() => setActiveTab("preview")}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors ${
              activeTab === "preview" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            <Eye size={14} />
            <span>A4 Sheet Preview</span>
          </button>
        </div>
      </div>

      {/* Main Workspace Layout */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Left Form Composer Panel */}
        <div
          className={`no-print w-full lg:w-[420px] xl:w-[460px] flex-shrink-0 bg-[#0B1528] border border-[#1E293B] rounded-2xl p-6 shadow-xl space-y-6 ${
            activeTab === "preview" ? "hidden lg:block" : "block"
          }`}
        >
          {/* Preset Template Selector */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Select Preset Document
            </label>
            <div className="grid grid-cols-2 gap-2">
              {(Object.keys(TEMPLATES) as Array<keyof typeof TEMPLATES>).map((key) => {
                const tmpl = TEMPLATES[key];
                const active = selectedTemplateKey === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => handleTemplateChange(key)}
                    className={`text-left p-2.5 rounded-xl border text-xs font-medium transition-all ${
                      active
                        ? "bg-blue-600/15 border-blue-500 text-blue-400 shadow-sm"
                        : "bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-300"
                    }`}
                  >
                    {tmpl.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="h-px bg-slate-800" />

          {/* Reference and Date */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Reference No.
              </label>
              <input
                type="text"
                value={formData.refNo}
                onChange={(e) => setFormData({ ...formData, refNo: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-blue-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Document Date
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Recipient Details */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Building2 size={13} className="text-blue-400" />
              <span>Recipient Information</span>
            </h3>

            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Attention / Name</label>
              <input
                type="text"
                value={formData.recipientName}
                onChange={(e) => setFormData({ ...formData, recipientName: e.target.value })}
                placeholder="e.g. Mohammed Al Mansoori"
                className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Designation</label>
                <input
                  type="text"
                  value={formData.recipientTitle}
                  onChange={(e) => setFormData({ ...formData, recipientTitle: e.target.value })}
                  placeholder="e.g. CTO"
                  className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Company / Organization</label>
                <input
                  type="text"
                  value={formData.recipientCompany}
                  onChange={(e) => setFormData({ ...formData, recipientCompany: e.target.value })}
                  placeholder="e.g. Emirates Tech"
                  className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Address / Location</label>
              <input
                type="text"
                value={formData.recipientAddress}
                onChange={(e) => setFormData({ ...formData, recipientAddress: e.target.value })}
                placeholder="e.g. Dubai, UAE"
                className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="h-px bg-slate-800" />

          {/* Letter Body & Subject */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <FileText size={13} className="text-blue-400" />
              <span>Document Contents</span>
            </h3>

            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Subject Heading</label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="SUBJECT: PROPOSAL..."
                className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-blue-500 font-semibold uppercase"
              />
            </div>

            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Salutation</label>
              <input
                type="text"
                value={formData.salutation}
                onChange={(e) => setFormData({ ...formData, salutation: e.target.value })}
                placeholder="Dear Sir / Madam,"
                className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-[11px] text-slate-400 mb-1">
                Body Text (Supports bullet points •)
              </label>
              <textarea
                rows={9}
                value={formData.body}
                onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-blue-500 leading-relaxed font-sans"
              />
            </div>

            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Closing</label>
              <input
                type="text"
                value={formData.closing}
                onChange={(e) => setFormData({ ...formData, closing: e.target.value })}
                placeholder="Sincerely,"
                className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="h-px bg-slate-800" />

          {/* Authorized Signatory */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <ShieldCheck size={13} className="text-emerald-400" />
                <span>Authorized Signatory</span>
              </label>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.includeSignature}
                  onChange={(e) => setFormData({ ...formData, includeSignature: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            {formData.includeSignature && (
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Signatory Name</label>
                  <input
                    type="text"
                    value={formData.signatoryName}
                    onChange={(e) => setFormData({ ...formData, signatoryName: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Designation</label>
                  <input
                    type="text"
                    value={formData.signatoryTitle}
                    onChange={(e) => setFormData({ ...formData, signatoryTitle: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Preview Panel (A4 Sheet on screen) */}
        <div
          className={`w-full flex-1 flex justify-center overflow-x-auto pb-12 ${
            activeTab === "edit" ? "hidden lg:flex" : "flex"
          }`}
        >
          <div className="letterhead-sheet select-text">
            {/* Top Right Modern Angled Geometric Accents matching reference */}
            <svg
              viewBox="0 0 280 140"
              className="letterhead-accent-top"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Main deep navy polygon */}
              <polygon points="60,0 280,0 280,140 180,140" fill="#0A2540" />
              {/* Electric blue angled chevron/wedge */}
              <polygon points="0,0 60,0 180,140 120,140" fill="#2563EB" opacity="0.95" />
              {/* Gold luxury accent stripe */}
              <polygon points="112,140 120,140 0,0 -8,0" fill="#C89B3C" />
            </svg>

            {/* Bottom Left Modern Angled Geometric Accents matching reference */}
            <svg
              viewBox="0 0 240 110"
              className="letterhead-accent-bottom"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Main deep navy polygon */}
              <polygon points="0,0 130,110 0,110" fill="#0A2540" />
              {/* Electric blue angled chevron */}
              <polygon points="120,110 190,110 155,50 85,50" fill="#2563EB" opacity="0.95" />
              {/* Gold luxury pin-stripe */}
              <polygon points="185,110 192,110 157,50 150,50" fill="#C89B3C" />
            </svg>

            {/* Header Content */}
            <header className="letterhead-header">
              <div className="letterhead-header-top">
                <div className="letterhead-brand-group">
                  {/* Company Logo */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/logo.png"
                    alt={`${companyName} Logo`}
                    className="letterhead-logo-img"
                  />
                  <div className="letterhead-brand-text">
                    <div className="letterhead-company-name">
                      PK IT <span>CONSULTANTS</span>
                    </div>
                    <div className="letterhead-tagline">{tagline}</div>
                  </div>
                </div>
              </div>

              {/* Official Dubai Contact Information Strip */}
              <div className="letterhead-contact-strip">
                <div className="letterhead-contact-item">
                  <span className="letterhead-contact-bullet">•</span>
                  <span>{officeAddress}</span>
                </div>
                <div className="letterhead-contact-item">
                  <span className="letterhead-contact-bullet">•</span>
                  <span>{phone}</span>
                </div>
                <div className="letterhead-contact-item">
                  <span className="letterhead-contact-bullet">•</span>
                  <span>{email}</span>
                </div>
                <div className="letterhead-contact-item">
                  <span className="letterhead-contact-bullet">•</span>
                  <span>{website.replace(/^https?:\/\//, "")}</span>
                </div>
              </div>

              {/* Brand Gradient Rule */}
              <div className="letterhead-rule" />
            </header>

            {/* Document Body Area */}
            <main className="letterhead-main">
              {/* Meta Grid (Reference, Date, Recipient) */}
              <div className="letterhead-meta-row">
                <div className="letterhead-recipient-box">
                  <div className="letterhead-recipient-label">To / Attention</div>
                  <div className="letterhead-recipient-name">{formData.recipientName}</div>
                  {formData.recipientTitle && (
                    <div className="letterhead-recipient-detail">{formData.recipientTitle}</div>
                  )}
                  {formData.recipientCompany && (
                    <div className="letterhead-recipient-detail font-medium text-slate-800">
                      {formData.recipientCompany}
                    </div>
                  )}
                  {formData.recipientAddress && (
                    <div className="letterhead-recipient-detail">{formData.recipientAddress}</div>
                  )}
                </div>

                <div className="letterhead-doc-meta">
                  <div className="letterhead-meta-item">
                    <strong>Ref No:</strong>
                    <span>{formData.refNo}</span>
                  </div>
                  <div className="letterhead-meta-item">
                    <strong>Date:</strong>
                    <span>{formatDisplayDate(formData.date)}</span>
                  </div>
                </div>
              </div>

              {/* Subject Line */}
              {formData.subject && (
                <div className="letterhead-subject-box">
                  <div className="letterhead-subject-text">{formData.subject}</div>
                </div>
              )}

              {/* Salutation & Body Paragraphs */}
              <div className="letterhead-body">
                {formData.salutation && (
                  <p className="font-semibold text-slate-900">{formData.salutation}</p>
                )}

                {formData.body.split("\n\n").map((para, i) => {
                  if (para.trim().startsWith("•") || para.includes("\n•")) {
                    const lines = para.split("\n");
                    return (
                      <div key={i} className="mb-3.5">
                        {lines.map((line, idx) => {
                          if (line.trim().startsWith("•")) {
                            return (
                              <li key={idx} className="ml-4 list-disc text-slate-800">
                                {line.replace(/^[•\-*]\s*/, "")}
                              </li>
                            );
                          }
                          return (
                            <p key={idx} className="mb-2">
                              {line}
                            </p>
                          );
                        })}
                      </div>
                    );
                  }
                  return <p key={i}>{para}</p>;
                })}
              </div>

              {/* Closing & Authorized Signatory Block */}
              <div className="letterhead-closing-area">
                <div className="letterhead-signatory">
                  <div className="letterhead-closing-text">{formData.closing}</div>

                  {formData.includeSignature && (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/signature.png"
                        alt="Authorized Signatory"
                        className="letterhead-signature-img"
                      />
                      <div className="letterhead-signatory-name">{formData.signatoryName}</div>
                      <div className="letterhead-signatory-title">{formData.signatoryTitle}</div>
                      <div className="letterhead-signatory-org">{formData.signatoryCompany}</div>
                    </>
                  )}
                </div>
              </div>
            </main>

            {/* Letterhead Footer */}
            <footer className="letterhead-footer">
              <div className="letterhead-footer-legal">
                <strong>{companyName}</strong>
                <span>
                  Commercial License & Technology Operations • Dubai, United Arab Emirates
                </span>
              </div>
              <div className="letterhead-page-num">Page 1 of 1</div>
            </footer>
          </div>
        </div>
      </div>
    </>
  );
}
