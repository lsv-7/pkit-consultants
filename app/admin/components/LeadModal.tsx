"use client";

import { useState } from "react";
import { Phone, Mail, MessageSquare, Calendar, ShieldCheck, X, FileText, User, Building, Landmark, Compass, Award } from "lucide-react";
import { Lead } from "../types";
import { Button } from "@/components/ui/Button";

interface Props {
  lead: Lead;
  onClose: () => void;
}

export default function LeadModal({ lead, onClose }: Props) {
  const [notes, setNotes] = useState(lead.notes || "");
  const [saving, setSaving] = useState(false);
  const [savingNotes, setSavingNotes] = useState(false);

  async function convertToProject() {
    try {
      setSaving(true);
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          leadId: lead.id,
          projectName: `${lead.fullName}'s Project`,
          clientName: lead.fullName,
          email: lead.email,
          phone: lead.phone,
          company: lead.company,
          service: lead.service,
          description: lead.projectDescription,
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert("Project created successfully!");
        onClose();
      } else {
        alert("Failed to create project.");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setSaving(false);
    }
  }

  async function saveNotes() {
    try {
      setSavingNotes(true);
      await fetch(`/api/leads/${lead.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: lead.status,
          notes,
        }),
      });
      alert("Notes saved successfully.");
    } catch (error) {
      console.error(error);
      alert("Failed to save notes.");
    } finally {
      setSavingNotes(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-[#020612]/75 backdrop-blur-sm flex items-center justify-center z-50 overflow-y-auto p-4 md:p-6 animate-fade-in">
      <div className="bg-[#060F24] border border-[#0E204A] rounded-xl w-full max-w-4xl p-6 md:p-8 shadow-2xl shadow-black/50 relative max-h-[90vh] overflow-y-auto animate-scale-in">
        
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 md:top-6 md:right-6 p-2 text-slate-500 hover:text-slate-200 hover:bg-[#0C1A3D] rounded-lg transition-colors"
        >
          <X size={18} />
        </button>

        {/* MODAL HEADER */}
        <div className="mb-6 border-b border-[#0E204A]/60 pb-4">
          <span className="text-[10px] font-mono tracking-wider text-[#0066FF] uppercase font-bold">
            Lead Details Profile
          </span>
          <h2 className="text-2xl font-display font-bold text-slate-100 mt-1">
            {lead.fullName}
          </h2>
        </div>

        {/* MODAL BODY GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* LEFT/MID CONTENT (Information Cards) */}
          <div className="md:col-span-2 space-y-6">
            
            {/* Primary Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#020612]/30 p-4 border border-[#0E204A]/50 rounded-lg">
              <Info title="Full Name" value={lead.fullName} icon={User} />
              <Info title="Company" value={lead.company || "-"} icon={Building} />
              <Info title="Email Address" value={lead.email} icon={Mail} />
              <Info title="Phone Number" value={lead.phone} icon={Phone} />
              <Info title="Requested Service" value={lead.service} icon={Compass} />
              <Info title="Estimated Budget" value={lead.budget || "-"} icon={Landmark} />
              <Info title="Desired Timeline" value={lead.timeline || "-"} icon={Calendar} />
              <Info title="Preferred Contact" value={lead.contactMethod || "-"} icon={ShieldCheck} />
            </div>

            {/* Project Description Container */}
            <div>
              <h4 className="text-slate-300 text-xs font-semibold uppercase tracking-wider mb-2 flex items-center gap-1.5 select-none">
                <FileText size={14} className="text-slate-500" />
                Project Description
              </h4>
              <div className="bg-[#020612]/40 border border-[#0E204A] rounded-lg p-4 text-sm text-slate-300 leading-relaxed min-h-24">
                {lead.projectDescription || "No project description provided."}
              </div>
            </div>

            {/* Quick Dial Contacts */}
            <div>
              <h4 className="text-slate-300 text-xs font-semibold uppercase tracking-wider mb-3 select-none">
                Quick Actions
              </h4>
              <div className="flex flex-wrap gap-2.5">
                <a
                  href={`tel:${lead.phone}`}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-400 border border-emerald-500/20 rounded-lg text-xs font-medium transition-colors"
                >
                  <Phone size={14} /> Call Client
                </a>

                <a
                  href={`https://wa.me/${lead.phone.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-700/10 hover:bg-emerald-700/20 text-emerald-300 border border-emerald-600/20 rounded-lg text-xs font-medium transition-colors"
                >
                  <MessageSquare size={14} /> WhatsApp Chat
                </a>

                <a
                  href={`mailto:${lead.email}`}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 border border-blue-500/20 rounded-lg text-xs font-medium transition-colors"
                >
                  <Mail size={14} /> Send Email
                </a>
              </div>
            </div>

          </div>

          {/* RIGHT CONTENT (Internal Notes) */}
          <div className="flex flex-col h-full bg-[#020612]/20 border border-[#0E204A]/60 rounded-lg p-5">
            <h4 className="text-slate-300 text-xs font-semibold uppercase tracking-wider mb-3 select-none">
              Internal Team Notes
            </h4>
            
            <textarea
              rows={8}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Record internal team logs, status updates, or meeting outcomes..."
              className="flex-1 w-full rounded-lg bg-[#020612]/50 border border-[#0E204A] p-3 text-xs text-slate-300 placeholder:text-slate-600 focus:outline-none focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF]/20 resize-none min-h-36"
            />
            
            <Button
              onClick={saveNotes}
              loading={savingNotes}
              variant="secondary"
              size="sm"
              className="mt-3 w-full"
            >
              Save Internal Notes
            </Button>
          </div>

        </div>

        {/* MODAL FOOTER BUTTONS */}
        <div className="mt-8 pt-4 border-t border-[#0E204A]/60 flex justify-end gap-3 flex-wrap">
          <Button
            onClick={onClose}
            variant="outline"
            size="md"
          >
            Close
          </Button>

          <Button
            onClick={convertToProject}
            disabled={lead.converted}
            loading={saving}
            variant={lead.converted ? "success" : "indigo"}
            size="md"
          >
            {lead.converted ? "✓ Project Active" : "Convert to Project"}
          </Button>
        </div>

      </div>

      <style>{`
        .animate-fade-in {
          animation: fadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-scale-in {
          animation: scaleIn 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.96); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

function Info({
  title,
  value,
  icon: Icon,
}: {
  title: string;
  value: string;
  icon: React.ComponentType<{ size: number; className?: string }>;
}) {
  return (
    <div className="flex gap-3 items-start py-1.5">
      <div className="p-2 rounded bg-[#0C1A3D] text-slate-400 mt-0.5">
        <Icon size={14} />
      </div>
      <div className="min-w-0">
        <span className="text-[10px] text-slate-500 uppercase tracking-wider font-mono select-none block">
          {title}
        </span>
        <p className="text-sm font-semibold text-slate-300 truncate mt-0.5">
          {value}
        </p>
      </div>
    </div>
  );
}