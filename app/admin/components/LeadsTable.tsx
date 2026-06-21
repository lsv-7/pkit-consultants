import { Lead } from "../types";
import LeadRow from "./LeadRow";

interface Props {
  leads: Lead[];
}

export default function LeadsTable({
  leads,
}: Props) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-800">

      <table className="w-full">

        <thead className="bg-slate-900">

          <tr>
            <th className="text-left p-4">Name</th>
            <th className="text-left p-4">Company</th>
            <th className="text-left p-4">Email</th>
            <th className="text-left p-4">Phone</th>
            <th className="text-left p-4">Service</th>
            <th className="text-left p-4">Status</th>
           <th className="text-left p-4">
  Actions
</th>
          </tr>

        </thead>

        <tbody>

          {leads.map((lead) => (
            <LeadRow
              key={lead.id}
              lead={lead}
            />
          ))}

        </tbody>

      </table>

      {leads.length === 0 && (
        <div className="p-8 text-center text-slate-400">
          No consultation requests yet.
        </div>
      )}

    </div>
  );
}