"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, Loader2, X, AlertCircle } from "lucide-react";

interface SearchResultItem {
  id: string;
  title: string;
  subtitle?: string;
  type: "lead" | "client" | "project";
}

export default function AdminSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<{ leads: any[]; clients: any[]; projects: any[] }>({
    leads: [],
    clients: [],
    projects: [],
  });
  const [isOpen, setIsOpen] = useState(false);
  const [mobileOverlayOpen, setMobileOverlayOpen] = useState(false);
  
  // Keyboard navigation states
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const mobileInputRef = useRef<HTMLInputElement>(null);

  // Debounced search
  useEffect(() => {
    if (!query.trim()) {
      setResults({ leads: [], clients: [], projects: [] });
      setLoading(false);
      setSelectedIndex(-1);
      return;
    }

    setLoading(true);
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/admin/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        if (data.success) {
          setResults({
            leads: data.leads || [],
            clients: data.clients || [],
            projects: data.projects || [],
          });
        }
      } catch (err) {
        console.error("Global search failed", err);
      } finally {
        setLoading(false);
        setSelectedIndex(-1);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Flatten results for easy keyboard index traversal
  const getFlatResults = (): SearchResultItem[] => {
    const flat: SearchResultItem[] = [];
    results.leads.forEach((l) =>
      flat.push({ id: l.id, title: l.fullName, subtitle: l.company || l.email, type: "lead" })
    );
    results.clients.forEach((c) =>
      flat.push({ id: c.id, title: c.contactPerson, subtitle: c.company || c.email, type: "client" })
    );
    results.projects.forEach((p) =>
      flat.push({ id: p.id, title: p.projectName, subtitle: `${p.clientName} (${p.status})`, type: "project" })
    );
    return flat;
  };

  const flatResults = getFlatResults();

  // Handle select/click result
  const handleSelect = (item: SearchResultItem) => {
    setIsOpen(false);
    setMobileOverlayOpen(false);
    setQuery("");
    
    if (item.type === "lead") {
      router.push(`/admin?leadId=${item.id}`);
    } else if (item.type === "project") {
      router.push(`/admin/projects`);
    } else if (item.type === "client") {
      router.push(`/admin/projects`);
    }
  };

  // Keyboard navigation inside dropdown
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false);
      setMobileOverlayOpen(false);
      inputRef.current?.blur();
      mobileInputRef.current?.blur();
      return;
    }

    if (!isOpen || flatResults.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1 >= flatResults.length ? 0 : prev + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 < 0 ? flatResults.length - 1 : prev - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (selectedIndex >= 0 && selectedIndex < flatResults.length) {
        handleSelect(flatResults[selectedIndex]);
      }
    }
  };

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const totalResultsCount = flatResults.length;

  return (
    <div ref={containerRef} className="relative flex-1 max-w-lg md:max-w-xs lg:max-w-md w-full">
      {/* ─── DESKTOP/TABLET INPUT ─── */}
      <div className="relative hidden md:block group">
        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 group-focus-within:text-blue-400 transition-colors">
          {loading ? <Loader2 size={14} className="animate-spin text-blue-400" /> : <Search size={15} />}
        </span>
        <input
          ref={inputRef}
          type="text"
          placeholder="Search CRM... (Ctrl + K)"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          className="w-full pl-9 pr-12 py-2 text-xs rounded-lg bg-[#060F24] border border-[#0E204A] text-slate-300 placeholder:text-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-all"
        />
        {query && (
          <button
            onClick={() => {
              setQuery("");
              setResults({ leads: [], clients: [], projects: [] });
            }}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-slate-300"
          >
            <X size={13} />
          </button>
        )}
      </div>

      {/* ─── MOBILE SEARCH TRIGGER BUTTON ─── */}
      <button
        onClick={() => {
          setMobileOverlayOpen(true);
          setTimeout(() => mobileInputRef.current?.focus(), 100);
        }}
        className="p-2 text-slate-400 hover:text-slate-200 hover:bg-[#0C1A3D]/60 rounded-lg md:hidden transition-all duration-200"
      >
        <Search size={18} />
      </button>

      {/* ─── MOBILE OVERLAY MODAL ─── */}
      {mobileOverlayOpen && (
        <div className="fixed inset-0 z-50 bg-[#020612]/95 backdrop-blur-md flex flex-col p-4 md:hidden">
          <div className="flex items-center gap-3 border-b border-[#0E204A] pb-3">
            <Search size={18} className="text-blue-400" />
            <input
              ref={mobileInputRef}
              type="text"
              placeholder="Search leads, clients, projects..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setIsOpen(true);
              }}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent text-slate-100 placeholder:text-slate-600 focus:outline-none text-sm"
            />
            <button
              onClick={() => {
                setMobileOverlayOpen(false);
                setIsOpen(false);
                setQuery("");
              }}
              className="p-1 text-slate-400 hover:text-slate-200 bg-[#0C1A3D]/50 rounded-md"
            >
              <X size={18} />
            </button>
          </div>

          {/* Results Area for Mobile */}
          <div className="flex-1 overflow-y-auto mt-4 space-y-4">
            {loading && (
              <div className="flex items-center justify-center py-10 gap-2 text-slate-500 text-xs">
                <Loader2 size={16} className="animate-spin text-blue-500" /> Searching...
              </div>
            )}
            {!loading && totalResultsCount === 0 && query.trim() && (
              <div className="text-center py-10 text-slate-500 text-xs flex flex-col items-center gap-2">
                <AlertCircle size={20} className="text-slate-600" /> No matching items found.
              </div>
            )}
            {!loading && totalResultsCount > 0 && (
              <div className="space-y-4 pb-20">
                {renderGroupMobile("Leads", results.leads, "lead")}
                {renderGroupMobile("Clients", results.clients, "client")}
                {renderGroupMobile("Projects", results.projects, "project")}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ─── DESKTOP RESULT DROPDOWN ─── */}
      {isOpen && query.trim() && !mobileOverlayOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 z-50 overflow-hidden rounded-xl border border-[#0E204A] bg-[#060F24] shadow-2xl shadow-black/80 max-h-[380px] overflow-y-auto scrollbar-thin scrollbar-thumb-[#142D66]">
          {loading && (
            <div className="flex items-center justify-center p-8 gap-2 text-slate-500 text-xs">
              <Loader2 size={14} className="animate-spin text-blue-500" /> Searching CRM...
            </div>
          )}

          {!loading && totalResultsCount === 0 && (
            <div className="p-6 text-center text-slate-500 text-xs">No records found.</div>
          )}

          {!loading && totalResultsCount > 0 && (
            <div className="p-2 space-y-2 select-none">
              {renderGroupDesktop("Leads", results.leads, "lead")}
              {renderGroupDesktop("Clients", results.clients, "client")}
              {renderGroupDesktop("Projects", results.projects, "project")}
            </div>
          )}
        </div>
      )}
    </div>
  );

  // Render desktop group helper
  function renderGroupDesktop(title: string, list: any[], type: "lead" | "client" | "project") {
    if (list.length === 0) return null;

    return (
      <div>
        <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
          {title}
        </div>
        <div className="space-y-0.5 mt-1">
          {list.map((item) => {
            // Find global index in flatResults
            const globalIdx = flatResults.findIndex((x) => x.id === item.id && x.type === type);
            const isSelected = selectedIndex === globalIdx;

            let mainVal = "";
            let subVal = "";

            if (type === "lead") {
              mainVal = item.fullName;
              subVal = item.company || item.email;
            } else if (type === "client") {
              mainVal = item.contactPerson;
              subVal = item.company || item.email;
            } else if (type === "project") {
              mainVal = item.projectName;
              subVal = `${item.clientName} (${item.status.replaceAll("_", " ")})`;
            }

            return (
              <button
                key={item.id}
                onClick={() => handleSelect({ id: item.id, title: mainVal, type })}
                onMouseEnter={() => setSelectedIndex(globalIdx)}
                className={`w-full text-left px-3 py-2 rounded-lg flex flex-col transition-all duration-150 ${
                  isSelected ? "bg-[#0066FF] text-white" : "hover:bg-[#0C1A3D]/40 text-slate-300"
                }`}
              >
                <span className="text-xs font-medium">{mainVal}</span>
                <span className={`text-[10px] mt-0.5 ${isSelected ? "text-blue-200" : "text-slate-500"}`}>
                  {subVal}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Render mobile group helper
  function renderGroupMobile(title: string, list: any[], type: "lead" | "client" | "project") {
    if (list.length === 0) return null;

    return (
      <div className="space-y-2">
        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 border-b border-[#0E204A]/60 pb-1">
          {title}
        </div>
        <div className="space-y-1">
          {list.map((item) => {
            let mainVal = "";
            let subVal = "";

            if (type === "lead") {
              mainVal = item.fullName;
              subVal = item.company || item.email;
            } else if (type === "client") {
              mainVal = item.contactPerson;
              subVal = item.company || item.email;
            } else if (type === "project") {
              mainVal = item.projectName;
              subVal = `${item.clientName} (${item.status.replaceAll("_", " ")})`;
            }

            return (
              <button
                key={item.id}
                onClick={() => handleSelect({ id: item.id, title: mainVal, type })}
                className="w-full text-left px-3.5 py-2.5 rounded-lg bg-[#060F24] border border-[#0E204A] hover:border-blue-500/50 flex flex-col active:bg-[#0C1A3D]/50 transition-colors"
              >
                <span className="text-xs font-semibold text-slate-200">{mainVal}</span>
                <span className="text-[10px] text-slate-500 mt-1">{subVal}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }
}
