"use client";

import { useState } from "react";
import { Eye } from "lucide-react";
import LeadModal from "./LeadModal";
import { Lead } from "../types";
import { Button } from "@/components/ui/Button";

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

export default function LeadRow({ lead }: Props) {
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
      <tr className="border-t border-[#0E204A]/60 hover:bg-[#0C1A3D]/25 transition-colors duration-150 text-sm">
        {/* Name */}
        <td className="p-4.5 font-medium text-slate-200">{lead.fullName}</td>

        {/* Company */}
        <td className="p-4.5 text-slate-400 hidden lg:table-cell">
          {lead.company || <span className="text-slate-600">-</span>}
        </td>

        {/* Email */}
        <td className="p-4.5 text-slate-400 hidden xl:table-cell truncate max-w-xs">{lead.email}</td>

        {/* Phone */}
        <td className="p-4.5 text-slate-400 hidden lg:table-cell">{lead.phone}</td>

        {/* Service */}
        <td className="p-4.5 text-slate-300 hidden md:table-cell">{lead.service}</td>

        {/* Status */}
        <td className="p-4.5">
          <select
            value={status}
            disabled={saving}
            onChange={(e) => updateStatus(e.target.value)}
            className="bg-[#060F24] border border-[#0E204A] rounded-lg px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF]/20 transition-all duration-150"
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
        <td className="p-4.5 text-slate-400 hidden xl:table-cell">
          {new Date(lead.createdAt).toLocaleDateString()}
        </td>

        {/* Actions */}
        <td className="p-4.5 text-right">
          <Button
            onClick={() => setOpen(true)}
            variant="secondary"
            size="sm"
            className="h-8"
          >
            <Eye size={13} className="text-slate-400" />
            <span>View</span>
          </Button>
        </td>
      </tr>

      {open && (
        <LeadModal
          lead={lead}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}