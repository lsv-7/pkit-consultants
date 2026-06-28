"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, Clock } from "lucide-react";
import AdminSearch from "@/components/sections/AdminSearch";
import NotificationDropdown from "@/components/sections/NotificationDropdown";
import ProfileDropdown from "@/components/sections/ProfileDropdown";
import CommandPalette from "@/components/sections/CommandPalette";

interface TopbarProps {
  setMobileOpen: (open: boolean) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  adminProfile?: { name: string; email: string; role: string } | null;
}

export default function Topbar({
  setMobileOpen,
  collapsed,
  setCollapsed,
  adminProfile,
}: TopbarProps) {
  const pathname = usePathname();
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Generate page title and breadcrumbs from route
  const getBreadcrumbs = () => {
    const paths = pathname.split("/").filter(Boolean);
    return paths.map((path, idx) => {
      const isLast = idx === paths.length - 1;
      const formatted = path.charAt(0).toUpperCase() + path.slice(1);
      return (
        <span key={path} className="flex items-center gap-1.5">
          {idx > 0 && <span className="text-slate-600 font-mono">/</span>}
          <span className={isLast ? "text-slate-200 font-semibold" : "text-slate-500 hover:text-slate-400 transition"}>
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
    <header className="sticky top-0 z-30 flex items-center justify-between bg-[#0B1120]/75 backdrop-blur-md border-b border-[#1E293B] px-6 md:px-8 h-18 select-none">
      {/* LEFT SECTION: MOBILE TOGGLE & BREADCRUMBS */}
      <div className="flex items-center gap-4">
        {/* Mobile Hamburger menu */}
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 text-slate-400 hover:text-slate-200 hover:bg-[#1E293B]/50 rounded-lg lg:hidden transition"
        >
          <Menu size={20} />
        </button>

        {/* Desktop Breadcrumbs & Page title */}
        <div className="hidden sm:flex flex-col">
          <div className="flex items-center gap-1.5 text-[11px] font-mono tracking-wide">
            {getBreadcrumbs()}
          </div>
        </div>
        <h1 className="sm:hidden font-display text-base font-semibold text-slate-200">
          {getPageTitle()}
        </h1>
      </div>

      {/* RIGHT SECTION: CLOCK, SEARCH BAR, NOTIFICATIONS, PROFILE */}
      <div className="flex items-center gap-4 md:gap-6">
        {/* Dynamic Digital Clock */}
        <div className="hidden md:flex items-center gap-2 text-xs font-mono text-slate-400 bg-[#1E293B]/40 border border-[#1E293B]/60 px-3.5 py-1.5 rounded-full shadow-inner select-none">
          <Clock size={12} className="text-blue-400" />
          <span>{time}</span>
        </div>

        {/* Global Search Bar */}
        <AdminSearch />

        {/* Notifications Bell */}
        <NotificationDropdown />

        {/* User profile avatar badge */}
        <div className="pl-2 border-l border-[#1E293B]">
          <ProfileDropdown adminProfile={adminProfile} />
        </div>
      </div>

      {/* Command Palette Keyboard Shortcut Listener & Modal */}
      <CommandPalette />
    </header>
  );
}

