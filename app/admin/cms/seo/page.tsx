"use client";

import { useEffect, useState } from "react";
import { Loader2, Save, AlertCircle, CheckCircle, Globe } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface SeoState {
  defaultSeoTitle: string;
  defaultSeoDescription: string;
}

export default function SeoSettingsCMS() {
  const [formData, setFormData] = useState<SeoState>({
    defaultSeoTitle: "",
    defaultSeoDescription: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    async function loadSettings() {
      try {
        const res = await fetch("/api/settings");
        if (!res.ok) throw new Error("Failed to load SEO settings");
        const data = await res.json();
        setFormData({
          defaultSeoTitle: data.defaultSeoTitle || "",
          defaultSeoDescription: data.defaultSeoDescription || "",
        });
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadSettings();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess(false);

    try {
      const res = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to save SEO settings");
      }

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <Loader2 className="animate-spin text-[#0066FF]" size={32} />
        <span className="ml-3 text-slate-300">Loading SEO settings...</span>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-100 font-display flex items-center gap-2">
          <Globe className="text-[#0066FF]" size={24} /> SEO Configuration
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Configure default search engine optimization meta tags used across the public website pages.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="flex items-center gap-3 p-4 bg-rose-500/10 border border-rose-500/20 text-rose-300 rounded-lg text-sm">
            <AlertCircle size={18} className="flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="flex items-center gap-3 p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 rounded-lg text-sm">
            <CheckCircle size={18} className="flex-shrink-0" />
            <span>SEO Settings saved successfully!</span>
          </div>
        )}

        <div className="bg-[#060F24] border border-[#0E204A] rounded-xl p-6 space-y-4">
          <h2 className="text-base font-semibold text-slate-200 border-b border-[#0E204A] pb-3 font-display">
            Default Meta Tags
          </h2>
          
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400">Default SEO Title</label>
              <input
                type="text"
                name="defaultSeoTitle"
                value={formData.defaultSeoTitle}
                onChange={handleChange}
                className="w-full bg-[#0C1A3D] border border-[#142D66] rounded-lg px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#0066FF] transition"
                required
              />
              <span className="text-[11px] text-slate-500 block">
                Recommended length: 50-60 characters. Shows up in search results and browser tab titles.
              </span>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400">Default SEO Description</label>
              <textarea
                name="defaultSeoDescription"
                rows={4}
                value={formData.defaultSeoDescription}
                onChange={handleChange}
                className="w-full bg-[#0C1A3D] border border-[#142D66] rounded-lg px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#0066FF] transition resize-y"
                required
              />
              <span className="text-[11px] text-slate-500 block">
                Recommended length: 150-160 characters. Brief summary of the page for search engine listings.
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={saving} className="bg-[#0066FF] hover:bg-[#297FFF] px-6 py-2.5 flex items-center gap-2">
            {saving ? (
              <>
                <Loader2 size={16} className="animate-spin" /> Saving...
              </>
            ) : (
              <>
                <Save size={16} /> Save SEO Settings
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
