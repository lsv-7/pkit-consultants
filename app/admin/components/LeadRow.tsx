"use client";
"use client";

import { useState } from "react";
import LeadModal from "./LeadModal";
import { Lead } from "../types";

interface Props {
  lead: Lead;
}

const statuses = [
  "NEW",
  "CONTACTED",
  "IN_PROGRESS",
  "COMPLETED",
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
    <tr className="border-t border-slate-800 hover:bg-slate-900">

      <td className="p-4">{lead.fullName}</td>

      <td className="p-4">{lead.company || "-"}</td>

      <td className="p-4">{lead.email}</td>

      <td className="p-4">{lead.phone}</td>

      <td className="p-4">{lead.service}</td>

      <td className="p-4">
        <select
          value={status}
          disabled={saving}
          onChange={(e) => updateStatus(e.target.value)}
          className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2"
        >
          {statuses.map((s) => (
            <option key={s} value={s}>
              {s.replace("_", " ")}
            </option>
          ))}
        </select>
      </td>
      <td className="p-4">
  {new Date(lead.createdAt).toLocaleDateString()}
</td>

      <td className="p-4">
        <button
          onClick={() => setOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm"
        >
          View
        </button>
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