"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Briefcase, LogOut, ChevronLeft, ChevronRight, X, Settings, Home, Cpu, Network, Layers, HelpCircle, Image, Globe, Users, FileText, Mail } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { COMPANY } from "@/lib/company";

interface SidebarProps {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  adminProfile?: { name: string; email: string; role: string } | null;
}

export default function Sidebar({
  mobileOpen,
  setMobileOpen,
  collapsed,
  setCollapsed,
  adminProfile,
}: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/logout", {
      method: "POST",
    });
    router.push("/login");
    router.refresh();
  }

  const crmLinks = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
    },
    {
      name: "Clients",
      href: "/admin/clients",
      icon: Users,
    },
    {
      name: "Projects",
      href: "/admin/projects",
      icon: Briefcase,
    },
    {
      name: "Invoices",
      href: "/admin/invoices",
      icon: FileText,
    },
    {
      name: "Communications",
      href: "/admin/communications",
      icon: Mail,
    },
  ];

  const cmsLinks = [
    {
      name: "Website Settings",
      href: "/admin/cms/settings",
      icon: Settings,
    },
    {
      name: "Homepage",
      href: "/admin/cms/homepage",
      icon: Home,
    },
    {
      name: "Services",
      href: "/admin/cms/services",
      icon: Cpu,
    },
    {
      name: "Industries",
      href: "/admin/cms/industries",
      icon: Network,
    },
    {
      name: "Technologies",
      href: "/admin/cms/technologies",
      icon: Layers,
    },
    {
      name: "FAQ",
      href: "/admin/cms/faqs",
      icon: HelpCircle,
    },
    {
      name: "Media Library",
      href: "/admin/cms/media",
      icon: Image,
    },
    {
      name: "SEO",
      href: "/admin/cms/seo",
      icon: Globe,
    },
  ];

  // Helper function for navigation links
  const renderNavLinks = () => {
    const renderSection = (title: string, linkList: typeof crmLinks) => (
      <div className="space-y-1.5">
        <div className={`px-3 mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-500 transition-opacity duration-200 ${collapsed ? "lg:opacity-0 lg:w-0 overflow-hidden" : "opacity-100"}`}>
          {title}
        </div>
        {linkList.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href || (link.href !== "/admin" && pathname.startsWith(link.href));
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`
                flex items-center gap-3.5 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 group relative
                ${isActive 
                  ? "bg-gradient-to-r from-[#2563EB]/15 to-[#2563EB]/5 text-white border-l-2 border-[#2563EB] shadow-sm shadow-[#2563EB]/5" 
                  : "text-slate-400 hover:text-slate-100 hover:bg-[#1E293B]/40 border-l-2 border-transparent hover:border-l-[#334155]"}
              `}
            >
              <Icon size={18} className={`flex-shrink-0 ${isActive ? "text-white" : "text-slate-400 group-hover:text-slate-300"}`} />
              
              {/* Nav label - hidden on collapsed desktop */}
              <span className={`transition-opacity duration-200 ${collapsed ? "lg:opacity-0 lg:w-0 overflow-hidden" : "opacity-100"}`}>
                {link.name}
              </span>

              {/* Tooltip for collapsed view */}
              {collapsed && (
                <span className="absolute left-20 scale-0 group-hover:scale-100 transition-all duration-200 bg-[#1E293B] text-slate-200 text-xs px-2.5 py-1.5 rounded-md border border-[#1E293B] shadow-xl z-50 pointer-events-none hidden lg:block whitespace-nowrap">
                  {link.name}
                </span>
              )}
            </Link>
          );
        })}
      </div>
    );

    return (
      <nav className="flex-1 py-6 px-3 space-y-6 overflow-y-auto max-h-[calc(100vh-280px)] scrollbar-thin scrollbar-thumb-[#142D66]">
        {renderSection("CRM Admin", crmLinks)}
        {renderSection("Website CMS", cmsLinks)}
      </nav>
    );
  };

  return (
    <>
      {/* 1. MOBILE BACKDROP OVERLAY */}
      {mobileOpen && (
        <div 
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-[#0B1120]/80 backdrop-blur-sm lg:hidden transition-opacity duration-300"
        />
      )}

      {/* 2. SIDEBAR CONTAINER DRAWER */}
      <aside 
        className={`
          flex flex-col bg-[#111827]/90 backdrop-blur-md border-[#1E293B] shadow-2xl transition-all duration-300 flex-shrink-0 z-40
          
          /* Mobile Panel Overlays */
          fixed top-0 bottom-0 left-0 w-64 border-r rounded-none
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          
          /* Desktop Panel Overlays (Floating shell) */
          lg:static lg:translate-x-0 lg:my-4 lg:ml-4 lg:rounded-2xl lg:border lg:h-[calc(100vh-32px)] lg:shadow-xl lg:shadow-black/40
          ${collapsed ? "lg:w-20" : "lg:w-66"}
        `}
      >
        {/* SIDEBAR HEADER */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-[#1E293B]/70">
          <div className="flex items-center gap-3 select-none overflow-hidden">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#2563EB] to-[#38BDF8] flex items-center justify-center font-display text-white font-black text-lg shadow-md shadow-blue-500/20 flex-shrink-0">
              P
            </div>
            <span className={`font-display font-bold text-sm text-slate-100 tracking-tight transition-all duration-200 ${collapsed ? "lg:opacity-0 lg:w-0 overflow-hidden" : "opacity-100"}`}>
              {COMPANY.name.split(" ")[0]} <span className="text-[#38BDF8] font-medium">{COMPANY.name.split(" ")[1]}</span>
            </span>
          </div>

          {/* Close button inside mobile drawer */}
          <button 
            onClick={() => setMobileOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-[#1E293B]/50 rounded-lg lg:hidden"
          >
            <X size={18} />
          </button>
        </div>

        {/* NAVIGATION LINKS */}
        {renderNavLinks()}

        {/* SIDEBAR FOOTER (USER PROFILE & COLLAPSE TRIGGER) */}
        <div className="p-4 border-t border-[#1E293B]/70 space-y-4">
          {/* User profile card */}
          <div className={`flex items-center gap-3 p-2 rounded-xl bg-[#1E293B]/20 border border-[#1E293B]/30 ${collapsed ? "lg:justify-center lg:p-1 lg:border-transparent lg:bg-transparent" : ""}`}>
            {/* Avatar Circle */}
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#2563EB]/25 to-[#38BDF8]/25 border border-[#2563EB]/40 flex items-center justify-center text-xs font-semibold text-blue-400 flex-shrink-0 shadow-inner">
              {adminProfile ? adminProfile.name.split(" ").map((w: string) => w[0]).join("").toUpperCase().slice(0, 2) : "AD"}
            </div>

            {/* Profile info - hidden on collapsed desktop */}
            <div className={`flex-1 min-w-0 transition-all duration-200 ${collapsed ? "lg:opacity-0 lg:w-0 overflow-hidden" : "opacity-100"}`}>
              <p className="text-xs font-semibold text-slate-200 truncate">
                {adminProfile ? adminProfile.name : `${COMPANY.name} Admin`}
              </p>
              <p className="text-[10px] text-slate-500 truncate mt-0.5">
                {adminProfile ? adminProfile.email : COMPANY.email}
              </p>
            </div>
          </div>

          {/* Logout button */}
          <Button
            onClick={logout}
            variant="secondary"
            size="sm"
            className={`w-full hover:bg-rose-950/20 hover:border-rose-900/40 text-slate-400 hover:text-rose-300 border-[#1E293B]/70 transition-all duration-200 ${collapsed ? "lg:p-2 lg:justify-center" : "justify-start px-3.5"}`}
          >
            <LogOut size={15} className="text-rose-400/80 group-hover:text-rose-400" />
            <span className={`transition-opacity duration-200 ${collapsed ? "lg:hidden" : ""}`}>
              Logout
            </span>
          </Button>

          {/* Collapsible toggle button - desktop only */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="w-full hidden lg:flex items-center justify-center p-1.5 text-slate-500 hover:text-slate-300 hover:bg-[#1E293B]/40 border border-[#1E293B]/70 hover:border-[#2563EB]/60 rounded-md transition-all duration-200"
          >
            {collapsed ? <ChevronRight size={15} /> : <ChevronLeft size={15} />}
          </button>
        </div>
      </aside>
    </>
  );
}