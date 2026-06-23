"use client";

import { useState } from "react";
import { Mail, Phone, Cpu, Calendar, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Lead } from "../types";
import LeadModal from "./LeadModal";

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
];

export default function LeadMobileCard({ lead }: Props) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(lead.status);
  const [saving, setSaving] = useState(false);

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

  return (
    <>
      <Card className="flex flex-col gap-4 border border-[#0E204A] bg-[#060F24]/50 p-5 rounded-xl hover:border-[#142D66]" hoverEffect>
        {/* Card Header (Name and Company) */}
        <div className="flex justify-between items-start border-b border-[#0E204A]/60 pb-3">
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
        <div className="flex items-center justify-between gap-3 pt-3 border-t border-[#0E204A]/60 mt-1">
          <div className="flex-1">
            <select
              value={status}
              disabled={saving}
              onChange={(e) => updateStatus(e.target.value)}
              className="w-full bg-[#020612] border border-[#0E204A] rounded-lg px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF]/20"
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
