"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Briefcase, LogOut, ChevronLeft, ChevronRight, X, Settings, Home, Cpu, Network, Layers, HelpCircle, Image, Globe } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface SidebarProps {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

export default function Sidebar({
  mobileOpen,
  setMobileOpen,
  collapsed,
  setCollapsed,
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
      name: "Projects",
      href: "/admin/projects",
      icon: Briefcase,
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

  // Helper component for navigation links
  const NavLinks = () => {
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
                flex items-center gap-3.5 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group relative
                ${isActive 
                  ? "bg-[#0066FF] text-white shadow-lg shadow-blue-500/10" 
                  : "text-slate-400 hover:text-slate-200 hover:bg-[#0C1A3D]/50 border border-transparent hover:border-[#0E204A]"}
              `}
            >
              <Icon size={18} className={`flex-shrink-0 ${isActive ? "text-white" : "text-slate-400 group-hover:text-slate-300"}`} />
              
              {/* Nav label - hidden on collapsed desktop */}
              <span className={`transition-opacity duration-200 ${collapsed ? "lg:opacity-0 lg:w-0 overflow-hidden" : "opacity-100"}`}>
                {link.name}
              </span>

              {/* Tooltip for collapsed view */}
              {collapsed && (
                <span className="absolute left-20 scale-0 group-hover:scale-100 transition-all duration-200 bg-[#0C1A3D] text-slate-200 text-xs px-2.5 py-1.5 rounded-md border border-[#142D66] shadow-xl z-50 pointer-events-none hidden lg:block whitespace-nowrap">
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
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
        />
      )}

      {/* 2. SIDEBAR CONTAINER */}
      <aside 
        className={`
          fixed top-0 bottom-0 left-0 z-50 flex flex-col bg-[#060F24] border-r border-[#0E204A] transition-all duration-300
          lg:translate-x-0 lg:static
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          ${collapsed ? "lg:w-20" : "lg:w-64"}
          w-64
        `}
      >
        {/* BRAND LOGO HEADER */}
        <div className={`p-5 flex items-center justify-between border-b border-[#0E204A] h-18`}>
          <div className="flex items-center gap-3 overflow-hidden select-none">
            {/* Small glowing circle representing logo symbol */}
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#0066FF] to-[#38BDF8] flex-shrink-0 flex items-center justify-center font-bold text-white text-sm shadow-md shadow-blue-500/20">
              PK
            </div>
            <div className={`transition-all duration-200 ${collapsed ? "lg:opacity-0 lg:w-0 overflow-hidden" : "opacity-100"}`}>
              <h1 className="font-display font-bold text-base leading-none text-slate-100">
                PKIT Admin
              </h1>
              <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500 block mt-0.5">
                CRM Portal
              </span>
            </div>
          </div>

          {/* Close button inside mobile drawer */}
          <button 
            onClick={() => setMobileOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-[#0C1A3D] rounded-lg lg:hidden"
          >
            <X size={18} />
          </button>
        </div>

        {/* NAVIGATION LINKS */}
        <NavLinks />

        {/* SIDEBAR FOOTER (USER PROFILE & COLLAPSE TRIGGER) */}
        <div className="p-4 border-t border-[#0E204A] space-y-4">
          {/* User profile card */}
          <div className={`flex items-center gap-3 ${collapsed ? "lg:justify-center" : "px-1.5"}`}>
            {/* Avatar Circle */}
            <div className="w-9 h-9 rounded-full bg-[#0C1A3D] border border-[#142D66] flex items-center justify-center text-xs font-semibold text-blue-400 flex-shrink-0 shadow-inner">
              AD
            </div>

            {/* Profile info - hidden on collapsed desktop */}
            <div className={`flex-1 min-w-0 transition-all duration-200 ${collapsed ? "lg:opacity-0 lg:w-0 overflow-hidden" : "opacity-100"}`}>
              <p className="text-xs font-semibold text-slate-200 truncate">
                PKIT Administrator
              </p>
              <p className="text-[10px] text-slate-500 truncate">
                admin@pkit.com
              </p>
            </div>
          </div>

          {/* Logout button */}
          <Button
            onClick={logout}
            variant="secondary"
            size="sm"
            className={`w-full ${collapsed ? "lg:p-2 lg:justify-center" : "justify-start px-3.5"}`}
          >
            <LogOut size={15} className="text-rose-400" />
            <span className={`transition-opacity duration-200 ${collapsed ? "lg:hidden" : ""}`}>
              Logout
            </span>
          </Button>

          {/* Collapsible toggle button - desktop only */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="w-full hidden lg:flex items-center justify-center p-1.5 text-slate-500 hover:text-slate-300 hover:bg-[#0C1A3D]/40 border border-[#0E204A] hover:border-[#142D66] rounded-md transition-all duration-200"
          >
            {collapsed ? <ChevronRight size={15} /> : <ChevronLeft size={15} />}
          </button>
        </div>
      </aside>
    </>
  );
}