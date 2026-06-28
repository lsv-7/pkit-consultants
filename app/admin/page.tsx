"use client";

import { useEffect, useState } from "react";
import DashboardHeader from "./components/DashboardHeader";
import LeadsTable from "./components/LeadsTable";
import Toolbar from "./components/Toolbar";
import LeadModal from "./components/LeadModal";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { 
  DollarSign, 
  Users, 
  Briefcase, 
  FileText, 
  ArrowUpRight, 
  ArrowDownRight, 
  Calendar, 
  Clock, 
  Activity, 
  MessageSquare,
  Sparkles,
  RefreshCw,
  FolderKanban,
  CheckCircle2
} from "lucide-react";
import { Lead } from "./types";

interface DashboardMetrics {
  totalRevenue: number;
  activeClientsCount: number;
  activeProjectsCount: number;
  pendingInvoicesCount: number;
  monthlyRevenueData: { month: string; amount: number }[];
  funnelData: { stage: string; count: number; percentage: number }[];
  projectTimeline: any[];
  recentActivities: any[];
}

export default function AdminDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [clients, setClients] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [invoices, setInvoices] = useState<any[]>([]);
  const [communications, setCommunications] = useState<any[]>([]);
  
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    totalRevenue: 0,
    activeClientsCount: 0,
    activeProjectsCount: 0,
    pendingInvoicesCount: 0,
    monthlyRevenueData: [],
    funnelData: [],
    projectTimeline: [],
    recentActivities: []
  });

  async function fetchDashboardData(isRefresh = false) {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);

    try {
      // Parallel fetches to all relevant admin models
      const [leadsRes, clientsRes, projectsRes, invoicesRes, commsRes] = await Promise.all([
        fetch(`/api/leads?search=${search}&status=${status}`),
        fetch("/api/admin/clients"),
        fetch("/api/projects"),
        fetch("/api/admin/invoices"),
        fetch("/api/admin/communications")
      ]);

      const [leadsData, clientsData, projectsData, invoicesData, commsData] = await Promise.all([
        leadsRes.json(),
        clientsRes.json(),
        projectsRes.json(),
        invoicesRes.json(),
        commsRes.json()
      ]);

      const clientList = clientsData.clients || [];
      const projectList = projectsData || [];
      const invoiceList = invoicesData.invoices || [];
      const commsList = commsData.logs || [];

      setLeads(leadsData);
      setClients(clientList);
      setProjects(projectList);
      setInvoices(invoiceList);
      setCommunications(commsList);

      // Compute statistics & charts metrics
      calculateDashboardMetrics(leadsData, clientList, projectList, invoiceList, commsList);
    } catch (err) {
      console.error("Failed to load dashboard metrics", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  const calculateDashboardMetrics = (
    leadsData: Lead[], 
    clientList: any[], 
    projectList: any[], 
    invoiceList: any[],
    commsList: any[]
  ) => {
    // 1. Core KPIs
    const totalRevenue = invoiceList
      .filter((inv: any) => inv.paymentStatus === "PAID")
      .reduce((sum: number, inv: any) => sum + (inv.grandTotal || 0), 0);

    const activeClientsCount = clientList.length;
    const activeProjectsCount = projectList.filter((p: any) => p.status !== "COMPLETED").length;
    const pendingInvoicesCount = invoiceList.filter((inv: any) => inv.paymentStatus === "UNPAID" || inv.paymentStatus === "PARTIALLY_PAID").length;

    // 2. Monthly Revenue Data (last 6 months)
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthlyMap: Record<string, number> = {};
    
    // Seed last 6 months with 0
    const now = new Date();
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = `${monthNames[d.getMonth()]} ${d.getFullYear().toString().slice(-2)}`;
      monthlyMap[key] = 0;
    }

    invoiceList.forEach((inv: any) => {
      if (inv.paymentStatus === "PAID" && inv.invoiceDate) {
        const d = new Date(inv.invoiceDate);
        const key = `${monthNames[d.getMonth()]} ${d.getFullYear().toString().slice(-2)}`;
        if (key in monthlyMap) {
          monthlyMap[key] += inv.grandTotal || 0;
        }
      }
    });

    const monthlyRevenueData = Object.entries(monthlyMap).map(([month, amount]) => ({
      month,
      amount
    }));

    // 3. Lead Funnel calculation
    const totalLeads = leadsData.length || 1;
    const newCount = leadsData.filter(l => l.status === "NEW" || l.status === "NEW_LEAD").length;
    const contactedCount = leadsData.filter(l => l.status === "CONTACTED" || l.status === "IN_PROGRESS").length;
    const wonCount = leadsData.filter(l => l.status === "WON" || l.status === "COMPLETED" || l.status === "CONVERTED").length;

    const funnelData = [
      { stage: "New Enquiry", count: newCount, percentage: Math.round((newCount / totalLeads) * 100) },
      { stage: "Consulting / Contacted", count: contactedCount, percentage: Math.round((contactedCount / totalLeads) * 100) },
      { stage: "Converted Client", count: wonCount, percentage: Math.round((wonCount / totalLeads) * 100) }
    ];

    // 4. Project timeline (Recent 4)
    const projectTimeline = projectList
      .slice(0, 4)
      .map((p: any) => ({
        id: p.id,
        name: p.projectName,
        client: p.clientName || p.company || "Direct Client",
        progress: p.progress || 0,
        status: p.status
      }));

    // 5. Recent Activity Timeline (Combine leads, communications, and invoice logging)
    const recentActivities: any[] = [];
    
    leadsData.slice(0, 3).forEach(l => {
      recentActivities.push({
        id: `lead-${l.id}`,
        type: "lead",
        title: "New consultation request",
        description: `${l.fullName} from ${l.company || "Individual"} requested consultation.`,
        time: new Date(l.createdAt),
        icon: Sparkles,
        color: "text-blue-400 bg-blue-500/10 border-blue-500/20"
      });
    });

    commsList.slice(0, 3).forEach((c: any) => {
      recentActivities.push({
        id: `comm-${c.id}`,
        type: "comm",
        title: "Sent Email Client Update",
        description: `Subject: ${c.subject} sent to ${c.recipient}.`,
        time: new Date(c.createdAt),
        icon: MessageSquare,
        color: "text-purple-400 bg-purple-500/10 border-purple-500/20"
      });
    });

    invoiceList.slice(0, 2).forEach((inv: any) => {
      recentActivities.push({
        id: `inv-${inv.id}`,
        type: "invoice",
        title: `Invoice ${inv.invoiceNumber} logged`,
        description: `Status: ${inv.paymentStatus} — Amount: AED ${(inv.grandTotal || 0).toLocaleString()}`,
        time: new Date(inv.createdAt),
        icon: FileText,
        color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
      });
    });

    // Sort activities by time descending
    recentActivities.sort((a, b) => b.time.getTime() - a.time.getTime());

    setMetrics({
      totalRevenue,
      activeClientsCount,
      activeProjectsCount,
      pendingInvoicesCount,
      monthlyRevenueData,
      funnelData,
      projectTimeline,
      recentActivities: recentActivities.slice(0, 5)
    });
  };

  useEffect(() => {
    fetchDashboardData();
  }, [search, status]);

  // Handle auto-opening Lead Modal from search URL parameter
  useEffect(() => {
    if (leads.length > 0) {
      const params = new URLSearchParams(window.location.search);
      const leadId = params.get("leadId");
      if (leadId) {
        const found = leads.find((l) => l.id === leadId);
        if (found) {
          setSelectedLead(found);
        }
      }
    }
  }, [leads]);

  const handleCloseModal = () => {
    setSelectedLead(null);
    const url = new URL(window.location.href);
    url.searchParams.delete("leadId");
    window.history.pushState({}, "", url.toString());
  };

  // Helper to render pulse skeletons
  if (loading) {
    return (
      <div className="space-y-6 animate-pulse select-none">
        <div className="h-8 bg-slate-800 rounded-lg w-1/4"></div>
        <div className="h-10 bg-slate-800 rounded-lg w-full"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-slate-800 border border-[#1E293B] rounded-xl"></div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="h-80 bg-slate-800 rounded-xl lg:col-span-2"></div>
          <div className="h-80 bg-slate-800 rounded-xl"></div>
        </div>
      </div>
    );
  }

  // Generate SVG coordinates dynamically for the Line Chart
  const generateRevenuePath = () => {
    const width = 500;
    const height = 180;
    const paddingX = 40;
    const paddingY = 20;
    const data = metrics.monthlyRevenueData;
    if (data.length === 0) return { points: [], linePath: "", areaPath: "", maxVal: 50000, height, paddingY };
    
    const maxVal = Math.max(...data.map(d => d.amount), 50000);

    const points = data.map((d, index) => {
      const x = paddingX + (index * (width - paddingX * 2)) / (data.length - 1);
      const y = height - paddingY - (d.amount * (height - paddingY * 2)) / maxVal;
      return { x, y };
    });

    const linePath = points.reduce((path, p, idx) => {
      return idx === 0 ? `M ${p.x} ${p.y}` : `${path} L ${p.x} ${p.y}`;
    }, "");

    const areaPath = points.length > 0 
      ? `${linePath} L ${points[points.length - 1].x} ${height - paddingY} L ${points[0].x} ${height - paddingY} Z`
      : "";

    return { points, linePath, areaPath, maxVal, height, paddingY };
  };

  const { points, linePath, areaPath, maxVal, height, paddingY } = generateRevenuePath();

  return (
    <div className="space-y-6">
      {/* 1. HEADER WIDGET */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 select-none">
        <DashboardHeader />
        <Button 
          variant="secondary" 
          size="sm" 
          onClick={() => fetchDashboardData(true)} 
          disabled={refreshing}
          className="gap-2 border-[#1E293B] bg-[#111827]/40 hover:bg-[#1E293B]/60 text-slate-300 font-medium h-10 px-4 rounded-xl"
        >
          <RefreshCw size={14} className={refreshing ? "animate-spin" : ""} />
          <span>Refresh Cockpit</span>
        </Button>
      </div>

      {/* 2. SEARCH & STAGES FILTER TOOLBAR */}
      <Toolbar
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
        refresh={() => fetchDashboardData(true)}
      />

      {/* 3. PREMIUM KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <Card className="bg-[#111827]/60 border-[#1E293B] p-5 flex flex-col justify-between hover:border-[#2563EB]/40 group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-blue-500/5 to-transparent rounded-bl-full pointer-events-none" />
          <div className="flex items-start justify-between">
            <span className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">Total Collected Revenue</span>
            <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 group-hover:bg-blue-500/20 transition-colors">
              <DollarSign size={16} />
            </div>
          </div>
          <div className="mt-4 select-all">
            <p className="text-2xl md:text-3xl font-display font-black text-slate-100 tracking-tight font-mono">
              AED {metrics.totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 0 })}
            </p>
            <div className="flex items-center gap-1.5 mt-2">
              <span className="text-[10px] flex items-center font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                <ArrowUpRight size={10} className="mr-0.5" /> +14.2%
              </span>
              <span className="text-[10px] text-slate-500">vs last quarter</span>
            </div>
          </div>
        </Card>

        <Card className="bg-[#111827]/60 border-[#1E293B] p-5 flex flex-col justify-between hover:border-[#2563EB]/40 group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-cyan-500/5 to-transparent rounded-bl-full pointer-events-none" />
          <div className="flex items-start justify-between">
            <span className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">Active Clients Directory</span>
            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 group-hover:bg-cyan-500/20 transition-colors">
              <Users size={16} />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-2xl md:text-3xl font-display font-black text-slate-100 tracking-tight font-mono">
              {metrics.activeClientsCount} Clients
            </p>
            <div className="flex items-center gap-1.5 mt-2">
              <span className="text-[10px] flex items-center font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                <ArrowUpRight size={10} className="mr-0.5" /> +8.1%
              </span>
              <span className="text-[10px] text-slate-500">active accounts</span>
            </div>
          </div>
        </Card>

        <Card className="bg-[#111827]/60 border-[#1E293B] p-5 flex flex-col justify-between hover:border-[#2563EB]/40 group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-amber-500/5 to-transparent rounded-bl-full pointer-events-none" />
          <div className="flex items-start justify-between">
            <span className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">Active Client Solutions</span>
            <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 group-hover:bg-amber-500/20 transition-colors">
              <Briefcase size={16} />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-2xl md:text-3xl font-display font-black text-slate-100 tracking-tight font-mono">
              {metrics.activeProjectsCount} Projects
            </p>
            <div className="flex items-center gap-1.5 mt-2">
              <span className="text-[10px] flex items-center font-bold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded-full">
                <FolderKanban size={10} className="mr-0.5" /> Running
              </span>
              <span className="text-[10px] text-slate-500">pipeline operations</span>
            </div>
          </div>
        </Card>

        <Card className="bg-[#111827]/60 border-[#1E293B] p-5 flex flex-col justify-between hover:border-[#2563EB]/40 group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-rose-500/5 to-transparent rounded-bl-full pointer-events-none" />
          <div className="flex items-start justify-between">
            <span className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">Unpaid / Pending Invoices</span>
            <div className="p-2 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 group-hover:bg-rose-500/20 transition-colors">
              <FileText size={16} />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-2xl md:text-3xl font-display font-black text-slate-100 tracking-tight font-mono">
              {metrics.pendingInvoicesCount} Pending
            </p>
            <div className="flex items-center gap-1.5 mt-2">
              <span className="text-[10px] flex items-center font-bold text-rose-400 bg-rose-500/10 border border-rose-500/20 px-2 py-0.5 rounded-full">
                <ArrowDownRight size={10} className="mr-0.5" /> Overdue
              </span>
              <span className="text-[10px] text-slate-500">awaiting settlement</span>
            </div>
          </div>
        </Card>
      </div>

      {/* 4. INTERACTIVE GRAPHICAL CHART PANELS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Revenue Trend Line Chart */}
        <Card className="lg:col-span-2 bg-[#111827]/60 border-[#1E293B] p-6 hover:border-[#1E293B]/80 transition">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                <Activity size={14} className="text-blue-400" />
                Revenue Collection History
              </h3>
              <p className="text-[10px] text-slate-500 mt-1">AED collections logged monthly over the last 6 months</p>
            </div>
            <span className="text-[10px] font-mono text-slate-400 border border-[#1E293B] rounded px-2.5 py-1">
              Active currency: AED
            </span>
          </div>

          <div className="relative h-56 w-full flex items-end select-none">
            {metrics.monthlyRevenueData.length > 0 ? (
              <div className="relative w-full h-full">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 500 180" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#2563EB" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#2563EB" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  
                  {/* Grid Lines */}
                  {[0, 0.25, 0.5, 0.75, 1].map((ratio, idx) => {
                    const y = paddingY + ratio * (height - paddingY * 2);
                    return (
                      <line 
                        key={idx}
                        x1="30" 
                        y1={y} 
                        x2="470" 
                        y2={y} 
                        stroke="#1E293B" 
                        strokeWidth="1" 
                        strokeDasharray="4 4"
                      />
                    );
                  })}

                  {/* Gradient Area path */}
                  {areaPath && <path d={areaPath} fill="url(#chartGradient)" />}

                  {/* Main Line path */}
                  {linePath && (
                    <path 
                      d={linePath} 
                      fill="none" 
                      stroke="#2563EB" 
                      strokeWidth="2.5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                    />
                  )}

                  {/* Points circles */}
                  {points?.map((p, idx) => (
                    <g key={idx} className="group/dot cursor-pointer">
                      <circle 
                        cx={p.x} 
                        cy={p.y} 
                        r="5" 
                        fill="#111827" 
                        stroke="#2563EB" 
                        strokeWidth="2" 
                      />
                      <circle 
                        cx={p.x} 
                        cy={p.y} 
                        r="10" 
                        fill="#2563EB" 
                        fillOpacity="0"
                        className="hover:fill-opacity-10 transition duration-150" 
                      />
                    </g>
                  ))}
                </svg>

                {/* X-Axis labels */}
                <div className="absolute bottom-0 left-0 right-0 flex justify-between px-10 text-[10px] font-mono text-slate-500">
                  {metrics.monthlyRevenueData.map((d, index) => (
                    <span key={index}>{d.month}</span>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center w-full h-full text-slate-500 text-xs">
                No monthly collections registered yet.
              </div>
            )}
          </div>
        </Card>

        {/* Lead Funnel Pipeline Bar */}
        <Card className="bg-[#111827]/60 border-[#1E293B] p-6 hover:border-[#1E293B]/80 transition">
          <div className="mb-6">
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <CheckCircle2 size={14} className="text-cyan-400" />
              Pipeline Funnel
            </h3>
            <p className="text-[10px] text-slate-500 mt-1">Conversion statistics of recent visitor enquirings</p>
          </div>

          <div className="space-y-4 pt-1">
            {metrics.funnelData.map((item, index) => (
              <div key={item.stage} className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-medium text-slate-300">{item.stage}</span>
                  <span className="font-mono font-bold text-slate-200">
                    {item.count} <span className="text-slate-500 text-[10px]">({item.percentage || 0}%)</span>
                  </span>
                </div>
                
                <div className="w-full bg-[#0B1120] border border-[#1E293B]/70 rounded-full h-2 overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 bg-gradient-to-r 
                      ${index === 0 ? "from-blue-600 to-blue-500" : ""}
                      ${index === 1 ? "from-cyan-500 to-cyan-400" : ""}
                      ${index === 2 ? "from-emerald-500 to-emerald-400" : ""}
                    `}
                    style={{ width: `${item.percentage || 2}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-4 border-t border-[#1E293B]/40 text-center">
            <p className="text-[10px] text-slate-400 leading-relaxed">
              Visitor leads generated this month are being routed to <strong className="text-slate-200">Discovery</strong> workflows automatically.
            </p>
          </div>
        </Card>
      </div>

      {/* 5. TIMELINES & DOUBLE PANELS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Recent Activity Logs Timeline */}
        <Card className="lg:col-span-2 bg-[#111827]/60 border-[#1E293B] p-6 hover:border-[#1E293B]/80 transition">
          <div className="mb-6">
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <Activity size={14} className="text-purple-400" />
              Recent Operations Log
            </h3>
            <p className="text-[10px] text-slate-500 mt-1">Audit trail of lead registrations, update dispatches, and invoices.</p>
          </div>

          <div className="space-y-5 relative before:absolute before:left-5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#1E293B] pl-2 pt-1">
            {metrics.recentActivities.length > 0 ? (
              metrics.recentActivities.map((act) => {
                const Icon = act.icon;
                return (
                  <div key={act.id} className="flex gap-4 relative group">
                    <div className={`w-9.5 h-9.5 rounded-xl border flex items-center justify-center flex-shrink-0 z-10 transition duration-150 group-hover:scale-105 ${act.color}`}>
                      <Icon size={14} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="text-xs font-semibold text-slate-200">{act.title}</h4>
                        <span className="text-[10px] font-mono text-slate-500 flex items-center gap-1">
                          <Clock size={10} />
                          {new Date(act.time).toLocaleDateString([], { month: "short", day: "numeric" })}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                        {act.description}
                      </p>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="p-8 text-center text-slate-500 text-xs pl-8 select-none">
                No operations logged in the audit trail.
              </div>
            )}
          </div>
        </Card>

        {/* Right Column: Running Solutions List */}
        <Card className="bg-[#111827]/60 border-[#1E293B] p-6 hover:border-[#1E293B]/80 transition flex flex-col justify-between">
          <div>
            <div className="mb-6">
              <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                <FolderKanban size={14} className="text-amber-400" />
                Active Solutions Timelines
              </h3>
              <p className="text-[10px] text-slate-500 mt-1">Review completion rates of running projects</p>
            </div>

            <div className="space-y-4 pt-1">
              {metrics.projectTimeline.length > 0 ? (
                metrics.projectTimeline.map((proj) => (
                  <div key={proj.id} className="p-3 bg-[#0B1120]/40 border border-[#1E293B]/50 rounded-xl space-y-2">
                    <div className="flex justify-between items-start">
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-slate-200 truncate">{proj.name}</p>
                        <p className="text-[10px] text-slate-500 truncate mt-0.5">{proj.client}</p>
                      </div>
                      <Badge variant={proj.status === "COMPLETED" ? "green" : "blue"}>
                        {proj.status.replaceAll("_", " ").toLowerCase()}
                      </Badge>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex justify-between text-[9px] text-slate-400 font-semibold font-mono">
                        <span>Progress</span>
                        <span>{proj.progress}%</span>
                      </div>
                      <div className="w-full bg-[#0B1120] rounded-full h-1 overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-[#2563EB] to-[#38BDF8] h-full"
                          style={{ width: `${proj.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-slate-500 text-xs py-8 select-none">
                  No active client projects currently running.
                </div>
              )}
            </div>
          </div>

          <div className="pt-4 border-t border-[#1E293B]/40 mt-4 flex items-center justify-between">
            <span className="text-[10px] text-slate-500 font-medium">Auto-monitoring enabled</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-md shadow-emerald-500/50" />
          </div>
        </Card>
      </div>

      {/* 6. LEADS REGISTRY TABLE VIEW */}
      <LeadsTable leads={leads} />

      {/* 7. DYNAMIC DETAIL MODAL ACTION */}
      {selectedLead && (
        <LeadModal
          lead={selectedLead}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}