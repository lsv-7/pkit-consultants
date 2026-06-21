"use client";

import { useState } from "react";
import { Lead } from "../types";

interface Props {
  lead: Lead;
  onClose: () => void;
}

export default function LeadModal({ lead, onClose }: Props) {
  const [notes, setNotes] = useState(lead.notes || "");
  const [saving, setSaving] = useState(false);

  async function convertToProject() {
    try {
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
    }
  }

  async function saveNotes() {
    try {
      setSaving(true);

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
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 overflow-y-auto p-6">
      <div className="bg-slate-900 rounded-xl w-full max-w-4xl p-8">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">
            Lead Details
          </h2>

          <button
            onClick={onClose}
            className="text-3xl hover:text-red-400"
          >
            ×
          </button>
        </div>

        {/* Lead Info */}
        <div className="grid md:grid-cols-2 gap-6">
          <Info title="Full Name" value={lead.fullName} />
          <Info title="Company" value={lead.company || "-"} />
          <Info title="Email" value={lead.email} />
          <Info title="Phone" value={lead.phone} />
          <Info title="Service" value={lead.service} />
          <Info title="Budget" value={lead.budget || "-"} />
          <Info title="Timeline" value={lead.timeline || "-"} />
          <Info
            title="Preferred Contact"
            value={lead.contactMethod || "-"}
          />
        </div>

        {/* Project Description */}
        <div className="mt-8">
          <p className="text-slate-400 mb-2">
            Project Description
          </p>

          <div className="bg-slate-800 rounded-lg p-4 min-h-24">
            {lead.projectDescription || "No description provided."}
          </div>
        </div>

        {/* Notes */}
        <div className="mt-8">
          <p className="text-slate-400 mb-2">
            Internal Notes
          </p>

          <textarea
            rows={6}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full rounded-lg bg-slate-800 border border-slate-700 p-4"
          />
        </div>

        {/* Contact Actions */}
        <div className="mt-8 flex flex-wrap gap-3">

          <a
            href={`tel:${lead.phone}`}
            className="bg-green-600 hover:bg-green-700 px-5 py-3 rounded-lg"
          >
            📞 Call
          </a>

          <a
            href={`https://wa.me/${lead.phone.replace(/\D/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-700 hover:bg-green-800 px-5 py-3 rounded-lg"
          >
            💬 WhatsApp
          </a>

          <a
            href={`mailto:${lead.email}`}
            className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-lg"
          >
            📧 Email
          </a>

        </div>

        {/* Footer Buttons */}
        <div className="mt-8 flex justify-end gap-4 flex-wrap">

          <button
            onClick={saveNotes}
            disabled={saving}
            className="bg-yellow-600 hover:bg-yellow-700 px-6 py-3 rounded-lg"
          >
            {saving ? "Saving..." : "Save Notes"}
          </button>

         <button
  onClick={convertToProject}
  disabled={lead.converted}
  className={`px-6 py-3 rounded-lg ${
    lead.converted
      ? "bg-green-700 cursor-not-allowed"
      : "bg-indigo-600 hover:bg-indigo-700"
  }`}
>
  {lead.converted ? "✓ Project Created" : "Convert to Project"}
</button>

          <button
            onClick={onClose}
            className="bg-slate-700 hover:bg-slate-600 px-6 py-3 rounded-lg"
          >
            Close
          </button>

        </div>

      </div>
    </div>
  );
}

function Info({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-slate-400">
        {title}
      </p>

      <p className="font-medium">
        {value}
      </p>
    </div>
  );
}