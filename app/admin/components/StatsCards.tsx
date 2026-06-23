import { Users, Sparkles, PhoneCall, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Lead } from "../types";

interface Props {
  leads: Lead[];
}

export default function StatsCards({ leads }: Props) {
  const total = leads.length;

  const newLeads = leads.filter(
    (lead) => lead.status === "NEW" || lead.status === "NEW_LEAD"
  ).length;

  const contacted = leads.filter(
    (lead) => lead.status === "CONTACTED"
  ).length;

  const completed = leads.filter(
    (lead) => lead.status === "COMPLETED" || lead.status === "WON"
  ).length;

  const stats = [
    {
      title: "Total Leads",
      value: total,
      icon: Users,
      color: "text-blue-400 bg-blue-500/10 border-blue-500/20",
      description: "Lifetime received requests",
    },
    {
      title: "New Leads",
      value: newLeads,
      icon: Sparkles,
      color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
      description: "Awaiting first response",
    },
    {
      title: "Contacted",
      value: contacted,
      icon: PhoneCall,
      color: "text-amber-400 bg-amber-500/10 border-amber-500/20",
      description: "Leads currently in pipeline",
    },
    {
      title: "Completed",
      value: completed,
      icon: CheckCircle2,
      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
      description: "Successfully processed",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6">
      {stats.map((item) => {
        const Icon = item.icon;
        return (
          <Card key={item.title} className="flex flex-col justify-between" hoverEffect>
            <div className="flex items-start justify-between">
              <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">
                {item.title}
              </span>
              
              <div className={`p-2 rounded-lg border ${item.color}`}>
                <Icon size={16} />
              </div>
            </div>

            <div className="mt-4">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-100 tracking-tight">
                {item.value}
              </h2>
              
              <p className="text-[11px] text-slate-500 mt-1 truncate">
                {item.description}
              </p>
            </div>
          </Card>
        );
      })}
    </div>
  );
}