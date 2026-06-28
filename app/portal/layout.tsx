"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, Briefcase, FileText, User, LogOut, ChevronLeft, ChevronRight, X, Menu, Building, Mail } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { COMPANY } from "@/lib/company";

interface ClientProfile {
  id: string;
  fullName: string;
  email: string;
  client: {
    company: string;
  };
}

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [profile, setProfile] = useState<ClientProfile | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (pathname === "/portal/login") return;

    async function fetchProfile() {
      try {
        const res = await fetch("/api/portal/profile");
        if (res.status === 401) {
          router.push("/portal/login");
          return;
        }
        const data = await res.json();
        if (data.success) {
          setProfile(data.clientUser);
        }
      } catch (err) {
        console.error("Failed to load client profile", err);
      }
    }
    fetchProfile();
  }, [pathname, router]);

  // If path is login, don't wrap with layout chrome
  if (pathname === "/portal/login") {
    return <>{children}</>;
  }

  async function logout() {
    await fetch("/api/portal/logout", {
      method: "POST",
    });
    router.push("/portal/login");
    router.refresh();
  }

  const links = [
    {
      name: "Dashboard",
      href: "/portal",
      icon: LayoutDashboard,
    },
    {
      name: "Projects",
      href: "/portal/projects",
      icon: Briefcase,
    },
    {
      name: "Documents",
      href: "/portal/documents",
      icon: FileText,
    },
    {
      name: "Invoices",
      href: "/portal/invoices",
      icon: FileText,
    },
    {
      name: "Profile",
      href: "/portal/profile",
      icon: User,
    },
    {
      name: "Communications",
      href: "/portal/communications",
      icon: Mail,
    },
  ];

  return (
    <div className="flex h-screen bg-[#020612] text-slate-100 overflow-hidden font-sans">
      
      {/* 1. MOBILE BACKDROP */}
      {mobileOpen && (
        <div 
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
        />
      )}

      {/* 2. SIDEBAR */}
      <aside 
        className={`
          fixed top-0 bottom-0 left-0 z-50 flex flex-col bg-[#060F24] border-r border-[#0E204A] transition-all duration-300
          lg:translate-x-0 lg:static
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          ${collapsed ? "lg:w-20" : "lg:w-64"}
          w-64 flex-shrink-0
        `}
      >
        {/* Header */}
        <div className="p-5 flex items-center justify-between border-b border-[#0E204A] h-18">
          <div className="flex items-center gap-3 overflow-hidden select-none">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#0066FF] to-[#38BDF8] flex-shrink-0 flex items-center justify-center font-bold text-white text-sm shadow-md shadow-blue-500/20">
              PK
            </div>
            <div className={`transition-all duration-200 ${collapsed ? "lg:opacity-0 lg:w-0 overflow-hidden" : "opacity-100"}`}>
              <h1 className="font-display font-bold text-base leading-none text-slate-100">
                {COMPANY.name.split(" ")[0]} Client
              </h1>
              <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500 block mt-0.5">
                Workplace
              </span>
            </div>
          </div>
          <button 
            onClick={() => setMobileOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-[#0C1A3D] rounded-lg lg:hidden"
          >
            <X size={18} />
          </button>
        </div>

        {/* Links */}
        <nav className="flex-1 py-6 px-3 space-y-1.5 overflow-y-auto">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
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
                <span className={`transition-opacity duration-200 ${collapsed ? "lg:opacity-0 lg:w-0 overflow-hidden" : "opacity-100"}`}>
                  {link.name}
                </span>
                {collapsed && (
                  <span className="absolute left-20 scale-0 group-hover:scale-100 transition-all duration-200 bg-[#0C1A3D] text-slate-200 text-xs px-2.5 py-1.5 rounded-md border border-[#142D66] shadow-xl z-50 pointer-events-none hidden lg:block whitespace-nowrap">
                    {link.name}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-[#0E204A] space-y-4">
          <div className={`flex items-center gap-3 ${collapsed ? "lg:justify-center" : "px-1.5"}`}>
            <div className="w-9 h-9 rounded-full bg-[#0C1A3D] border border-[#142D66] flex items-center justify-center text-xs font-semibold text-blue-400 flex-shrink-0 shadow-inner">
              {profile ? profile.fullName.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2) : "CL"}
            </div>
            <div className={`flex-1 min-w-0 transition-all duration-200 ${collapsed ? "lg:opacity-0 lg:w-0 overflow-hidden" : "opacity-100"}`}>
              <p className="text-xs font-semibold text-slate-200 truncate">
                {profile ? profile.fullName : "Client User"}
              </p>
              <p className="text-[10px] text-slate-500 truncate flex items-center gap-0.5">
                <Building size={9} />
                {profile?.client?.company || "Company"}
              </p>
            </div>
          </div>

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

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="w-full hidden lg:flex items-center justify-center p-1.5 text-slate-500 hover:text-slate-300 hover:bg-[#0C1A3D]/40 border border-[#0E204A] hover:border-[#142D66] rounded-md transition-all duration-200"
          >
            {collapsed ? <ChevronRight size={15} /> : <ChevronLeft size={15} />}
          </button>
        </div>
      </aside>

      {/* 3. MAIN WORKSPACE */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="sticky top-0 z-30 flex items-center justify-between bg-[#020612]/75 backdrop-blur-md border-b border-[#0E204A] px-4 md:px-8 h-18 select-none">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileOpen(true)}
              className="p-2 text-slate-400 hover:text-slate-200 hover:bg-[#0C1A3D]/60 rounded-lg lg:hidden"
            >
              <Menu size={20} />
            </button>

            <div>
              <span className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Client Workspace</span>
              <h2 className="text-slate-200 font-bold text-sm">
                {pathname === "/portal" && "Overview Dashboard"}
                {pathname === "/portal/projects" && "Linked Projects"}
                {pathname === "/portal/documents" && "Secure Documents"}
                {pathname === "/portal/invoices" && "Invoices & Billing"}
                {pathname === "/portal/profile" && "Account Profile"}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-right">
              <span className="text-[10px] text-slate-500 block">Logged in as</span>
              <span className="text-xs text-slate-300 font-medium">{profile?.email}</span>
            </div>
          </div>
        </header>

        {/* Content View */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-10 bg-[#020612]/30">
          <div className="max-w-[1440px] mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
