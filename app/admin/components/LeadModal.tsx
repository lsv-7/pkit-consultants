"use client";

import { Lead } from "../types";

interface Props {
  lead: Lead;
  onClose: () => void;
}

export default function LeadModal({
  lead,
  onClose,
}: Props) {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

      <div className="bg-slate-900 rounded-xl w-full max-w-3xl p-8">

        <div className="flex justify-between items-center mb-8">

          <h2 className="text-3xl font-bold">
            Lead Details
          </h2>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-2xl"
          >
            ×
          </button>

        </div>

        <div className="grid md:grid-cols-2 gap-6">

          <div>
            <p className="text-slate-400">Full Name</p>
            <p className="font-semibold">{lead.fullName}</p>
          </div>

          <div>
            <p className="text-slate-400">Company</p>
            <p>{lead.company || "-"}</p>
          </div>

          <div>
            <p className="text-slate-400">Email</p>
            <p>{lead.email}</p>
          </div>

          <div>
            <p className="text-slate-400">Phone</p>
            <p>{lead.phone}</p>
          </div>

          <div>
            <p className="text-slate-400">Service</p>
            <p>{lead.service}</p>
          </div>

          <div>
            <p className="text-slate-400">Budget</p>
            <p>{lead.budget || "-"}</p>
          </div>

          <div>
            <p className="text-slate-400">Timeline</p>
            <p>{lead.timeline || "-"}</p>
          </div>

          <div>
            <p className="text-slate-400">
              Preferred Contact
            </p>
            <p>{lead.contactMethod || "-"}</p>
          </div>

        </div>

        <div className="mt-8">

          <p className="text-slate-400 mb-2">
            Project Description
          </p>

          <div className="bg-slate-800 rounded-lg p-4">
            {lead.projectDescription || "No description"}
          </div>

        </div>

        <div className="mt-8 flex justify-end">

          <button
            onClick={onClose}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg"
          >
            Close
          </button>

        </div>

      </div>

    </div>
  );
}