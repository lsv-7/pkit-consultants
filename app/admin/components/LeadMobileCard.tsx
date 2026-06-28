"use client";

import { useState } from "react";
import { Mail, Phone, Cpu, Calendar, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Lead } from "../types";
import LeadModal from "./LeadModal";
import { useToast } from "@/components/ui/ToastProvider";

interface Props {
  lead: Lead;
}

const statuses = [
  "NEW_LEAD",
  "CONTACTED",
  "MEETING_SCHEDULED",
  "QUOTATION_SENT",
  "NEGOTIATION",
  "WON",
  "LOST",
  "CONVERTED",
];

export default function LeadMobileCard({ lead }: Props) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(lead.status);
  const [saving, setSaving] = useState(false);
  const [converting, setConverting] = useState(false);

  async function updateStatus(newStatus: string) {
    setStatus(newStatus);
    setSaving(true);

    await fetch(`/api/leads/${lead.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: newStatus,
      }),
    });

    setSaving(false);
  }

  async function handleConvert() {
    if (converting) return;
    setConverting(true);

    try {
      const res = await fetch(`/api/leads/${lead.id}/convert`, {
        method: "POST",
      });
      const data = await res.json();
      if (data.success) {
        setStatus("CONVERTED");
        toast.success("Lead successfully converted to client.");
        window.location.reload();
      } else {
        toast.error(data.message || "Failed to convert lead.");
      }
    } catch {
      toast.error("An error occurred during conversion.");
    } finally {
      setConverting(false);
    }
  }

  const isConverted = lead.converted || status === "CONVERTED";

  return (
    <>
      <Card className="flex flex-col gap-4 border border-[#1E293B] bg-[#111827]/50 p-5 rounded-xl hover:border-[#1E293B]" hoverEffect>
        {/* Card Header (Name and Company) */}
        <div className="flex justify-between items-start border-b border-[#1E293B]/60 pb-3">
          <div>
            <h3 className="font-semibold text-slate-200 text-sm">{lead.fullName}</h3>
            <p className="text-xs text-slate-500 mt-0.5">{lead.company || "No Company"}</p>
          </div>
          <span className="text-[10px] font-mono text-slate-500 flex items-center gap-1">
            <Calendar size={10} />
            {new Date(lead.createdAt).toLocaleDateString()}
          </span>
        </div>

        {/* Card Body (Details List) */}
        <div className="space-y-2 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Mail size={12} className="text-slate-500" />
            <span className="truncate">{lead.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone size={12} className="text-slate-500" />
            <span>{lead.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <Cpu size={12} className="text-slate-500" />
            <span>{lead.service}</span>
          </div>
        </div>

        {/* Card Actions (Status Select & View Button) */}
        <div className="flex flex-col gap-2.5 pt-3 border-t border-[#1E293B]/60 mt-1">
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <select
                value={status}
                disabled={saving}
                onChange={(e) => updateStatus(e.target.value)}
                className="w-full bg-[#0B1120] border border-[#1E293B] rounded-lg px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]/20"
              >
                {statuses.map((s) => (
                  <option key={s} value={s}>
                    {s.replaceAll("_", " ").toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase())}
                  </option>
                ))}
              </select>
            </div>

            <Button
              onClick={() => setOpen(true)}
              variant="primary"
              size="sm"
              className="flex-shrink-0"
            >
              Details <ChevronRight size={13} />
            </Button>
          </div>

          <Button
            onClick={handleConvert}
            disabled={isConverted || converting}
            variant={isConverted ? "secondary" : "indigo"}
            size="sm"
            className="w-full text-xs font-semibold"
          >
            {isConverted ? "Already Converted" : converting ? "Converting..." : "Convert to Client"}
          </Button>
        </div>
      </Card>

      {open && (
        <LeadModal
          lead={lead}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
