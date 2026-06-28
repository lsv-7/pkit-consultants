"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Settings, LogOut } from "lucide-react";
import { COMPANY } from "@/lib/company";

interface ProfileDropdownProps {
  adminProfile?: { name: string; email: string; role: string } | null;
}

export default function ProfileDropdown({ adminProfile }: ProfileDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  async function handleLogout() {
    try {
      await fetch("/api/logout", { method: "POST" });
      window.location.href = "/login";
    } catch {
      window.location.href = "/login";
    }
  }

  const name = adminProfile?.name || `${COMPANY.name.split(" ")[0]} Admin`;
  const email = adminProfile?.email || COMPANY.email;
  const role = adminProfile?.role || "Administrator";
  const initials = name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);

  return (
    <div ref={containerRef} className="relative select-none">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 pl-2 focus:outline-none cursor-pointer group"
        aria-label="Toggle admin profile dropdown"
        aria-expanded={isOpen}
      >
        <div className="relative">
          <div className="w-8 h-8 rounded-full bg-blue-500/10 border border-blue-500/25 flex items-center justify-center text-xs font-bold text-blue-400 shadow-md shadow-blue-500/5 group-hover:border-blue-500/50 transition-all duration-200">
            {initials}
          </div>
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-[#020612]" />
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 rounded-xl border border-[#0E204A] bg-[#060F24] shadow-2xl shadow-black/80 z-50 overflow-hidden">
          <div className="p-4 border-b border-[#0E204A] bg-[#0C1A3D]/20">
            <p className="text-xs font-bold text-slate-200 truncate">{name}</p>
            <p className="text-[10px] text-slate-500 truncate mt-0.5">{email}</p>
            <span className="inline-block mt-2.5 text-[8.5px] uppercase font-bold font-mono tracking-wider text-blue-400 bg-blue-400/5 border border-blue-400/15 px-1.5 py-0.5 rounded">
              {role}
            </span>
          </div>

          <div className="p-1.5 space-y-0.5">
            <button
              onClick={() => {
                setIsOpen(false);
                router.push("/admin/cms/settings");
              }}
              className="w-full text-left px-3 py-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-[#0C1A3D]/50 flex items-center gap-2.5 text-xs font-medium transition-all"
            >
              <Settings size={13} className="text-slate-500" />
              Company Settings
            </button>

            <div className="h-px bg-[#0E204A]/60 my-1" />

            <button
              onClick={handleLogout}
              className="w-full text-left px-3 py-2 rounded-lg text-rose-400 hover:text-rose-300 hover:bg-rose-500/5 flex items-center gap-2.5 text-xs font-semibold transition-all"
            >
              <LogOut size={13} className="text-rose-400" />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
