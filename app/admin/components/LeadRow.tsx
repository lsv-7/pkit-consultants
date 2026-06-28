"use client";

import { useState } from "react";
import { Eye } from "lucide-react";
import LeadModal from "./LeadModal";
import { Lead } from "../types";
import { Button } from "@/components/ui/Button";
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

export default function LeadRow({ lead }: Props) {
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
    <tr className="border-t border-[#1E293B]/70 hover:bg-[#1E293B]/20 transition-colors duration-150 text-sm">
      {/* Name */}
      <td className="py-3 px-5 font-semibold text-slate-200">{lead.fullName}</td>

      {/* Company */}
      <td className="py-3 px-5 text-slate-400 hidden lg:table-cell">
        {lead.company || <span className="text-slate-600">-</span>}
      </td>

      {/* Email */}
      <td className="py-3 px-5 text-slate-400 hidden xl:table-cell truncate max-w-xs">{lead.email}</td>

      {/* Phone */}
      <td className="py-3 px-5 text-slate-400 hidden lg:table-cell">{lead.phone}</td>

      {/* Service */}
      <td className="py-3 px-5 text-slate-300 hidden md:table-cell">{lead.service}</td>

      {/* Status */}
      <td className="py-3 px-5">
        <select
          value={status}
          disabled={saving}
          onChange={(e) => updateStatus(e.target.value)}
          className="bg-[#111827] border border-[#1E293B] rounded-lg px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]/20 transition-all duration-150"
        >
          {statuses.map((s) => (
            <option key={s} value={s}>
              {s
                .replaceAll("_", " ")
                .toLowerCase()
                .replace(/\b\w/g, (c) => c.toUpperCase())}
            </option>
          ))}
        </select>
      </td>

      {/* Date Received */}
      <td className="py-3 px-5 text-slate-400 hidden xl:table-cell">
        {new Date(lead.createdAt).toLocaleDateString()}
      </td>

      {/* Actions */}
      <td className="py-3 px-5 text-right">
        <div className="flex items-center justify-end gap-2">
          <Button
            onClick={() => setOpen(true)}
            variant="secondary"
            size="sm"
            className="h-8"
          >
            <Eye size={13} className="text-slate-400" />
            <span>View</span>
          </Button>

          <Button
            onClick={handleConvert}
            disabled={isConverted || converting}
            variant={isConverted ? "secondary" : "indigo"}
            size="sm"
            className="h-8 min-w-[120px]"
          >
            {isConverted ? "Already Converted" : converting ? "Converting..." : "Convert to Client"}
          </Button>
        </div>

        {open && (
          <LeadModal
            lead={lead}
            onClose={() => setOpen(false)}
          />
        )}
      </td>
    </tr>
  );
}