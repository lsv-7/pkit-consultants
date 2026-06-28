"use client";

import { useState } from "react";
import { UploadCloud, Image as ImageIcon, Search, Copy, Check, ExternalLink, Grid, List } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/ToastProvider";

interface MediaItem {
  id: string;
  name: string;
  url: string;
  size: string;
  type: string;
  uploadedAt: string;
}

const PUBLIC_ASSETS: MediaItem[] = [
  {
    id: "1",
    name: "file.svg",
    url: "/file.svg",
    size: "0.4 KB",
    type: "image/svg+xml",
    uploadedAt: "2026-06-22",
  },
  {
    id: "2",
    name: "window.svg",
    url: "/window.svg",
    size: "0.4 KB",
    type: "image/svg+xml",
    uploadedAt: "2026-06-22",
  },
  {
    id: "3",
    name: "invoice.css",
    url: "/invoice.css",
    size: "12.0 KB",
    type: "text/css",
    uploadedAt: "2026-06-22",
  },
];

export default function MediaLibraryCMS() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [mediaItems] = useState<MediaItem[]>(PUBLIC_ASSETS);

  const handleCopy = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    toast.success("Asset path copied to clipboard.");
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
            <ImageIcon className="text-[#2563EB]" size={24} /> Media Library
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Browse public assets currently deployed in the site&apos;s static file directory.
          </p>
        </div>
      </div>

      <div className="border border-[#1E293B] bg-[#111827]/50 rounded-xl p-8 text-center">
        <div className="max-w-md mx-auto flex flex-col items-center">
          <div className="w-12 h-12 rounded-lg bg-[#1E293B] border border-[#1E293B] flex items-center justify-center text-slate-400 mb-3">
            <UploadCloud size={24} />
          </div>
          <p className="text-sm font-semibold text-slate-200">Upload integration pending</p>
          <p className="text-xs text-slate-500 mt-1.5">
            Add files to the <code className="text-slate-400">/public</code> directory or connect cloud storage before enabling uploads here.
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-[#111827] border border-[#1E293B] p-4 rounded-xl">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
          <input
            type="text"
            placeholder="Search media files..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#1E293B] border border-[#1E293B] rounded-lg pl-10 pr-4 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#2563EB] transition"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <div className="flex items-center border border-[#1E293B] rounded-lg p-0.5 overflow-hidden">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-md transition ${viewMode === "grid" ? "bg-[#1E293B] text-blue-400" : "text-slate-500 hover:text-slate-300"}`}
              aria-label="Grid view"
            >
              <Grid size={16} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded-md transition ${viewMode === "list" ? "bg-[#1E293B] text-blue-400" : "text-slate-500 hover:text-slate-300"}`}
              aria-label="List view"
            >
              <List size={16} />
            </button>
          </div>
        </div>
      </div>

      {filteredItems.length === 0 ? (
        <div className="text-center py-16 text-slate-500 text-sm">No media files match your search.</div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredItems.map((item) => (
            <div key={item.id} className="bg-[#111827] border border-[#1E293B] rounded-xl overflow-hidden group hover:border-[#2563EB]/40 transition">
              <div className="aspect-square bg-[#1E293B] flex items-center justify-center p-6">
                <ImageIcon size={32} className="text-slate-600" />
              </div>
              <div className="p-3 space-y-2">
                <p className="text-xs font-semibold text-slate-200 truncate">{item.name}</p>
                <p className="text-[10px] text-slate-500">{item.size} · {item.type}</p>
                <div className="flex gap-1">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="flex-1 text-[10px] py-1 h-7"
                    onClick={() => handleCopy(item.id, item.url)}
                  >
                    {copiedId === item.id ? <Check size={12} /> : <Copy size={12} />}
                    Copy
                  </Button>
                  <a href={item.url} target="_blank" rel="noopener noreferrer">
                    <Button variant="secondary" size="sm" className="text-[10px] py-1 h-7 px-2">
                      <ExternalLink size={12} />
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-[#111827] border border-[#1E293B] rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-[#1E293B]/50 text-slate-400 text-xs uppercase">
              <tr>
                <th className="text-left p-3">File</th>
                <th className="text-left p-3 hidden sm:table-cell">Type</th>
                <th className="text-left p-3 hidden md:table-cell">Size</th>
                <th className="text-right p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => (
                <tr key={item.id} className="border-t border-[#1E293B]/60 hover:bg-[#1E293B]/20">
                  <td className="p-3 text-slate-200">{item.name}</td>
                  <td className="p-3 text-slate-500 hidden sm:table-cell">{item.type}</td>
                  <td className="p-3 text-slate-500 hidden md:table-cell">{item.size}</td>
                  <td className="p-3 text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="secondary" size="sm" onClick={() => handleCopy(item.id, item.url)}>
                        {copiedId === item.id ? <Check size={12} /> : <Copy size={12} />}
                      </Button>
                      <a href={item.url} target="_blank" rel="noopener noreferrer">
                        <Button variant="secondary" size="sm"><ExternalLink size={12} /></Button>
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
