"use client";

import { usePathname } from "next/navigation";
import { Menu, Bell, Search, Command } from "lucide-react";

interface TopbarProps {
  setMobileOpen: (open: boolean) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

export default function Topbar({
  setMobileOpen,
  collapsed,
  setCollapsed,
}: TopbarProps) {
  const pathname = usePathname();

  // Generate page title and breadcrumbs from route
  const getBreadcrumbs = () => {
    const paths = pathname.split("/").filter(Boolean);
    return paths.map((path, idx) => {
      const isLast = idx === paths.length - 1;
      const formatted = path.charAt(0).toUpperCase() + path.slice(1);
      return (
        <span key={path} className="flex items-center gap-1.5">
          {idx > 0 && <span className="text-slate-600">/</span>}
          <span className={isLast ? "text-slate-300 font-medium" : "text-slate-500 hover:text-slate-400"}>
            {formatted}
          </span>
        </span>
      );
    });
  };

  const getPageTitle = () => {
    if (pathname === "/admin") return "Dashboard";
    if (pathname === "/admin/projects") return "Client Projects";
    return "Admin CRM";
  };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between bg-[#020612]/75 backdrop-blur-md border-b border-[#0E204A] px-4 md:px-8 h-18 select-none">
      {/* LEFT SECTION: MOBILE TOGGLE & BREADCRUMBS */}
      <div className="flex items-center gap-4">
        {/* Mobile Hamburger menu */}
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 text-slate-400 hover:text-slate-200 hover:bg-[#0C1A3D]/60 rounded-lg lg:hidden"
        >
          <Menu size={20} />
        </button>

        {/* Desktop Breadcrumbs & Page title */}
        <div className="hidden sm:flex flex-col">
          <div className="flex items-center gap-1.5 text-xs font-mono tracking-wide">
            {getBreadcrumbs()}
          </div>
        </div>
        <h1 className="sm:hidden font-display text-base font-semibold text-slate-200">
          {getPageTitle()}
        </h1>
      </div>

      {/* RIGHT SECTION: SEARCH BAR, NOTIFICATIONS, PROFILE */}
      <div className="flex items-center gap-4 md:gap-6">
        {/* Global Search Bar mockup */}
        <div className="relative hidden md:block w-64 lg:w-80 group">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 group-focus-within:text-blue-400 transition-colors">
            <Search size={15} />
          </span>
          <input
            type="text"
            placeholder="Search CRM..."
            disabled
            className="w-full pl-9 pr-12 py-2 text-xs rounded-lg bg-[#060F24] border border-[#0E204A] text-slate-300 placeholder:text-slate-600 cursor-not-allowed select-none"
          />
          {/* Keyboard shortcut indicator */}
          <span className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none gap-0.5 text-[10px] font-mono text-slate-600">
            <Command size={10} />
            <span>K</span>
          </span>
        </div>

        {/* Notifications Mock Bell */}
        <button className="relative p-2 text-slate-400 hover:text-slate-200 hover:bg-[#0C1A3D]/60 rounded-lg transition-all duration-200">
          <Bell size={18} />
          {/* Notification badge dot */}
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#0066FF] ring-2 ring-[#020612] animate-pulse" />
        </button>

        {/* User profile avatar badge */}
        <div className="flex items-center gap-2 pl-2 border-l border-[#0E204A] cursor-pointer group">
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-blue-500/10 border border-blue-500/25 flex items-center justify-center text-xs font-bold text-blue-400 shadow-md shadow-blue-500/5 group-hover:border-blue-500/50 transition-all duration-200">
              AD
            </div>
            {/* Green Online status dot */}
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-[#020612]" />
          </div>
        </div>
      </div>
    </header>
  );
}
