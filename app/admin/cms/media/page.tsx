"use client";

import { useState } from "react";
import { UploadCloud, Image as ImageIcon, Search, Copy, Check, ExternalLink, Grid, List, FolderPlus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface MediaItem {
  id: string;
  name: string;
  url: string;
  size: string;
  type: string;
  dimensions?: string;
  uploadedAt: string;
}

export default function MediaLibraryCMS() {
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Simulated media library items
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([
    {
      id: "1",
      name: "company-logo.png",
      url: "/logo.png",
      size: "24.5 KB",
      type: "image/png",
      dimensions: "180x48",
      uploadedAt: "2026-06-22",
    },
    {
      id: "2",
      name: "favicon.ico",
      url: "/favicon.ico",
      size: "15.0 KB",
      type: "image/x-icon",
      dimensions: "32x32",
      uploadedAt: "2026-06-22",
    },
    {
      id: "3",
      name: "hero-grid-bg.svg",
      url: "/grid.svg",
      size: "8.2 KB",
      type: "image/svg+xml",
      uploadedAt: "2026-06-21",
    },
    {
      id: "4",
      name: "software-architecture-placeholder.jpg",
      url: "/images/services/software.jpg",
      size: "142.1 KB",
      type: "image/jpeg",
      dimensions: "800x600",
      uploadedAt: "2026-06-20",
    },
    {
      id: "5",
      name: "consultancy-team.jpg",
      url: "/images/about/team.jpg",
      size: "284.7 KB",
      type: "image/jpeg",
      dimensions: "1200x800",
      uploadedAt: "2026-06-19",
    },
  ]);

  const handleCopy = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredItems = mediaItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 font-display flex items-center gap-2">
            <ImageIcon className="text-[#0066FF]" size={24} /> Media Library
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Upload and manage assets (images, logos, icons, attachments) for use across website content.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" className="border-[#0E204A] text-slate-300 flex items-center gap-1.5">
            <FolderPlus size={16} /> New Folder
          </Button>
          <Button className="bg-[#0066FF] hover:bg-[#297FFF] flex items-center gap-1.5">
            <UploadCloud size={16} /> Upload Files
          </Button>
        </div>
      </div>

      {/* Upload Drag & Drop Area */}
      <div className="border-2 border-dashed border-[#142D66] hover:border-[#0066FF]/60 bg-[#060F24]/50 rounded-xl p-8 text-center transition cursor-pointer group">
        <div className="max-w-md mx-auto flex flex-col items-center">
          <div className="w-12 h-12 rounded-lg bg-[#0C1A3D] border border-[#142D66] flex items-center justify-center text-slate-400 group-hover:text-[#0066FF] group-hover:border-[#0066FF]/40 transition mb-3">
            <UploadCloud size={24} />
          </div>
          <p className="text-sm font-semibold text-slate-200">Drag and drop file here, or browse local system</p>
          <p className="text-xs text-slate-500 mt-1.5">Supports PNG, JPG, SVG, WebP, GIF, or ICO. Max size 5MB.</p>
          <div className="mt-4 px-4 py-1.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-mono select-none">
            Media integration check: Active/Placeholder mode
          </div>
        </div>
      </div>

      {/* Filters Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-[#060F24] border border-[#0E204A] p-4 rounded-xl">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
          <input
            type="text"
            placeholder="Search media files..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0C1A3D] border border-[#142D66] rounded-lg pl-10 pr-4 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#0066FF] transition"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <div className="flex items-center border border-[#142D66] rounded-lg p-0.5 overflow-hidden">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-md transition ${viewMode === "grid" ? "bg-[#0066FF] text-white" : "text-slate-400 hover:text-slate-200"}`}
            >
              <Grid size={15} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded-md transition ${viewMode === "list" ? "bg-[#0066FF] text-white" : "text-slate-400 hover:text-slate-200"}`}
            >
              <List size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* Grid or List View of items */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-[#060F24] border border-[#0E204A] hover:border-[#142D66] rounded-xl overflow-hidden flex flex-col group relative transition duration-200"
            >
              {/* Thumbnail Container */}
              <div className="aspect-video bg-[#0C1A3D]/40 border-b border-[#0E204A] flex items-center justify-center relative overflow-hidden select-none">
                {item.type.startsWith("image/") ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={item.url}
                    alt={item.name}
                    className="max-h-full max-w-full object-contain p-2 group-hover:scale-105 transition duration-300"
                  />
                ) : (
                  <ImageIcon size={32} className="text-slate-500" />
                )}
                {/* Actions overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 transition duration-200">
                  <button
                    onClick={() => handleCopy(item.id, item.url)}
                    className="p-1.5 bg-[#0C1A3D] border border-[#142D66] text-slate-300 hover:text-white rounded-md hover:bg-[#0066FF] transition"
                    title="Copy path"
                  >
                    {copiedId === item.id ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  </button>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 bg-[#0C1A3D] border border-[#142D66] text-slate-300 hover:text-white rounded-md hover:bg-[#0066FF] transition"
                    title="View original"
                  >
                    <ExternalLink size={14} />
                  </a>
                  <button
                    className="p-1.5 bg-[#0C1A3D] border border-[#142D66] text-slate-400 hover:text-rose-400 rounded-md hover:bg-rose-500/10 transition"
                    title="Delete"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              {/* Details */}
              <div className="p-3 space-y-1">
                <p className="text-xs font-semibold text-slate-200 truncate" title={item.name}>
                  {item.name}
                </p>
                <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono">
                  <span>{item.size}</span>
                  {item.dimensions && <span>{item.dimensions}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-[#060F24] border border-[#0E204A] rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-[#0E204A] bg-[#0C1A3D]/40 text-slate-400 font-medium select-none">
                  <th className="py-3.5 px-6">Name</th>
                  <th className="py-3.5 px-6">Type</th>
                  <th className="py-3.5 px-6">Size</th>
                  <th className="py-3.5 px-6">Dimensions</th>
                  <th className="py-3.5 px-6">Path</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#0E204A] text-slate-300">
                {filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-[#0C1A3D]/20 transition duration-150">
                    <td className="py-3.5 px-6 font-semibold text-slate-100 flex items-center gap-2">
                      <ImageIcon size={16} className="text-[#0066FF] flex-shrink-0" />
                      <span className="truncate max-w-[200px]" title={item.name}>{item.name}</span>
                    </td>
                    <td className="py-3.5 px-6 text-slate-400 font-mono text-xs">{item.type}</td>
                    <td className="py-3.5 px-6 text-slate-400 font-mono text-xs">{item.size}</td>
                    <td className="py-3.5 px-6 text-slate-500 font-mono text-xs">{item.dimensions || "N/A"}</td>
                    <td className="py-3.5 px-6 font-mono text-xs">
                      <span className="bg-[#0C1A3D] px-2 py-1 rounded text-slate-400 border border-[#142D66]">
                        {item.url}
                      </span>
                    </td>
                    <td className="py-3.5 px-6 text-right space-x-2">
                      <button
                        onClick={() => handleCopy(item.id, item.url)}
                        className="p-1.5 text-slate-400 hover:text-white hover:bg-[#0C1A3D] rounded transition"
                      >
                        {copiedId === item.id ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                      </button>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block p-1.5 text-slate-400 hover:text-white hover:bg-[#0C1A3D] rounded transition"
                      >
                        <ExternalLink size={14} />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
