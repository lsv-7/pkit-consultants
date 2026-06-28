"use client";

import { Lead } from "../types";
import LeadRow from "./LeadRow";
import LeadMobileCard from "./LeadMobileCard";

interface Props {
  leads: Lead[];
}

export default function LeadsTable({ leads }: Props) {
  return (
    <div className="w-full">
      {/* 1. DESKTOP/TABLET TABLE VIEW (Hidden on Mobile) */}
      <div className="hidden md:block overflow-hidden rounded-xl border border-[#1E293B] bg-[#111827]/40 backdrop-blur-sm shadow-xl shadow-black/10">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-[#1E293B] bg-[#111827]/70 text-xs font-semibold uppercase tracking-wider text-slate-400 select-none">
                <th className="py-4 px-5 font-semibold">Name</th>
                <th className="py-4 px-5 font-semibold hidden lg:table-cell">Company</th>
                <th className="py-4 px-5 font-semibold hidden xl:table-cell">Email</th>
                <th className="py-4 px-5 font-semibold hidden lg:table-cell">Phone</th>
                <th className="py-4 px-5 font-semibold hidden md:table-cell">Service</th>
                <th className="py-4 px-5 font-semibold">Status</th>
                <th className="py-4 px-5 font-semibold hidden xl:table-cell">Received</th>
                <th className="py-4 px-5 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E293B]/50">
              {leads.map((lead) => (
                <LeadRow key={lead.id} lead={lead} />
              ))}
            </tbody>
          </table>
        </div>

        {leads.length === 0 && (
          <div className="p-12 text-center text-slate-500 font-medium select-none">
            No consultation requests found.
          </div>
        )}
      </div>

      {/* 2. MOBILE CARD LIST VIEW (Hidden on Tablet/Desktop) */}
      <div className="block md:hidden space-y-4">
        {leads.map((lead) => (
          <LeadMobileCard key={lead.id} lead={lead} />
        ))}

        {leads.length === 0 && (
          <div className="p-12 text-center text-slate-500 border border-[#1E293B] rounded-xl bg-[#111827]/30">
            No consultation requests found.
          </div>
        )}
      </div>
    </div>
  );
}