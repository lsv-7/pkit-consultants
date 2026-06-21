import { Lead } from "../types";

interface Props {
  leads: Lead[];
}

export default function StatsCards({ leads }: Props) {
  const total = leads.length;

  const newLeads = leads.filter(
    (lead) => lead.status === "NEW"
  ).length;

  const contacted = leads.filter(
    (lead) => lead.status === "CONTACTED"
  ).length;

  const completed = leads.filter(
    (lead) => lead.status === "COMPLETED"
  ).length;

  const cards = [
    {
      title: "Total Leads",
      value: total,
      color: "bg-slate-900 border-slate-800",
    },
    {
      title: "New Leads",
      value: newLeads,
      color: "bg-blue-900/40 border-blue-700",
    },
    {
      title: "Contacted",
      value: contacted,
      color: "bg-yellow-900/40 border-yellow-700",
    },
    {
      title: "Completed",
      value: completed,
      color: "bg-green-900/40 border-green-700",
    },
  ];

  return (
    <div className="grid md:grid-cols-4 gap-6 mb-10">
      {cards.map((card) => (
        <div
          key={card.title}
          className={`${card.color} border rounded-xl p-6`}
        >
          <p className="text-slate-300">
            {card.title}
          </p>

          <h2 className="text-5xl font-bold mt-3">
            {card.value}
          </h2>
        </div>
      ))}
    </div>
  );
}