"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  UserCheck,
  Settings,
  Home,
  Cpu,
  Layers,
  HelpCircle,
  Image,
  Globe,
  LogOut,
  Command,
  Search,
} from "lucide-react";

interface CommandItem {
  name: string;
  desc: string;
  path?: string;
  action?: string;
  icon: any;
  danger?: boolean;
}

const commands: CommandItem[] = [
  { name: "Dashboard", desc: "Go to Admin Dashboard", path: "/admin", icon: LayoutDashboard },
  { name: "Leads List", desc: "View consultation lead requests", path: "/admin", icon: Users },
  { name: "Active Projects", desc: "Monitor execution pipelines", path: "/admin/projects", icon: Briefcase },
  { name: "Client Accounts", desc: "Search and review clients", path: "/admin/projects", icon: UserCheck },
  { name: "Website Settings", desc: "Update coordinates and SEO tags", path: "/admin/cms/settings", icon: Settings },
  { name: "Homepage CMS", desc: "Edit landing sections and CTA copies", path: "/admin/cms/homepage", icon: Home },
  { name: "Services CMS", desc: "Manage service lists and deliverables", path: "/admin/cms/services", icon: Cpu },
  { name: "Technologies CMS", desc: "Update developer badges", path: "/admin/cms/technologies", icon: Layers },
  { name: "FAQ CMS", desc: "Manage accordion help questions", path: "/admin/cms/faqs", icon: HelpCircle },
  { name: "Media CMS", desc: "Manage uploaded asset paths", path: "/admin/cms/media", icon: Image },
  { name: "SEO Settings", desc: "Manage default meta titles and description", path: "/admin/cms/seo", icon: Globe },
  { name: "Logout", desc: "Terminate admin secure session", action: "logout", icon: LogOut, danger: true },
];

export default function CommandPalette() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Global key listener for Ctrl/Cmd + K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
      setQuery("");
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Filter commands by query
  const filteredCommands = commands.filter(
    (cmd) =>
      cmd.name.toLowerCase().includes(query.toLowerCase()) ||
      cmd.desc.toLowerCase().includes(query.toLowerCase())
  );

  // Keyboard navigation inside command palette
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false);
      return;
    }

    if (filteredCommands.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1 >= filteredCommands.length ? 0 : prev + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 < 0 ? filteredCommands.length - 1 : prev - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      handleSelect(filteredCommands[selectedIndex]);
    }
  };

  const handleSelect = async (cmd: CommandItem) => {
    setIsOpen(false);
    if (cmd.action === "logout") {
      try {
        await fetch("/api/logout", { method: "POST" });
        window.location.href = "/login";
      } catch (err) {
        console.error(err);
      }
    } else if (cmd.path) {
      router.push(cmd.path);
    }
  };

  // Close on click outside backdrop
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4 bg-black/70 backdrop-blur-sm transition-opacity duration-200"
    >
      <div
        ref={containerRef}
        className="w-full max-w-lg rounded-2xl border border-[#0E204A] bg-[#060F24] shadow-2xl shadow-black overflow-hidden flex flex-col transition-all duration-300"
      >
        {/* Input Bar */}
        <div className="flex items-center gap-3 px-4.5 py-3.5 border-b border-[#0E204A] bg-[#0C1A3D]/20">
          <Command size={16} className="text-blue-400" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a command or search shortcuts..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-slate-100 placeholder:text-slate-600 focus:outline-none text-xs"
          />
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded border border-[#0E204A] bg-[#0C1A3D]/40 text-[9px] font-mono text-slate-500 font-semibold select-none">
            ESC
          </kbd>
        </div>

        {/* Command list */}
        <div className="max-h-[300px] overflow-y-auto p-1.5 space-y-0.5 scrollbar-thin scrollbar-thumb-[#142D66] select-none">
          {filteredCommands.length === 0 ? (
            <div className="p-6 text-center text-slate-500 text-xs">No shortcuts matching your search.</div>
          ) : (
            filteredCommands.map((cmd, idx) => {
              const Icon = cmd.icon;
              const isSelected = selectedIndex === idx;

              return (
                <button
                  key={cmd.name}
                  onClick={() => handleSelect(cmd)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl flex items-center justify-between transition-all duration-150 ${
                    isSelected
                      ? cmd.danger
                        ? "bg-rose-500/10 border border-rose-500/30 text-rose-300"
                        : "bg-[#0066FF] text-white"
                      : "border border-transparent text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 border ${
                        isSelected
                          ? cmd.danger
                            ? "bg-rose-500/20 border-rose-500/30 text-rose-400"
                            : "bg-[#0066FF]/20 border-white/20 text-white"
                          : "bg-[#0C1A3D] border-[#0E204A] text-slate-400"
                      }`}
                    >
                      <Icon size={14} />
                    </div>
                    <div className="min-w-0">
                      <p className={`text-xs font-semibold ${isSelected ? "text-white" : "text-slate-200"}`}>
                        {cmd.name}
                      </p>
                      <p className={`text-[10px] mt-0.5 truncate ${isSelected ? "text-blue-200" : "text-slate-500"}`}>
                        {cmd.desc}
                      </p>
                    </div>
                  </div>
                  {isSelected && (
                    <span className="text-[10px] font-mono opacity-80 flex items-center gap-0.5 select-none font-semibold">
                      ENTER ↵
                    </span>
                  )}
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
