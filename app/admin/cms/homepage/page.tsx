"use client";

import { useEffect, useState } from "react";
import { Loader2, Save, AlertCircle, CheckCircle, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface CardItem {
  title: string;
  desc: string;
  iconName: string;
}

interface ProcessItem {
  num: string;
  stepTitle: string;
  desc: string;
}

interface HomepageState {
  heroTitleNormal: string;
  heroTitleHighlight: string;
  heroSubtitle: string;
  ctaText: string;
  ctaLink: string;
  whyChooseUs: CardItem[];
  devProcess: ProcessItem[];
}

export default function HomepageCMS() {
  const [formData, setFormData] = useState<HomepageState>({
    heroTitleNormal: "",
    heroTitleHighlight: "",
    heroSubtitle: "",
    ctaText: "",
    ctaLink: "",
    whyChooseUs: [],
    devProcess: [],
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    async function loadHomepage() {
      try {
        const res = await fetch("/api/homepage");
        if (!res.ok) throw new Error("Failed to load homepage sections");
        const data = await res.json();
        setFormData({
          heroTitleNormal: data.heroTitleNormal || "",
          heroTitleHighlight: data.heroTitleHighlight || "",
          heroSubtitle: data.heroSubtitle || "",
          ctaText: data.ctaText || "",
          ctaLink: data.ctaLink || "",
          whyChooseUs: Array.isArray(data.whyChooseUs) ? data.whyChooseUs : [],
          devProcess: Array.isArray(data.devProcess) ? data.devProcess : [],
        });
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadHomepage();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Why Choose Us list handlers
  const handleCardChange = (idx: number, field: keyof CardItem, value: string) => {
    setFormData((prev) => {
      const list = [...prev.whyChooseUs];
      list[idx] = { ...list[idx], [field]: value };
      return { ...prev, whyChooseUs: list };
    });
  };

  const addCard = () => {
    setFormData((prev) => ({
      ...prev,
      whyChooseUs: [...prev.whyChooseUs, { title: "New Strengths Card", desc: "Description here.", iconName: "Shield" }],
    }));
  };

  const removeCard = (idx: number) => {
    setFormData((prev) => ({
      ...prev,
      whyChooseUs: prev.whyChooseUs.filter((_, i) => i !== idx),
    }));
  };

  // Dev Process list handlers
  const handleProcessChange = (idx: number, field: keyof ProcessItem, value: string) => {
    setFormData((prev) => {
      const list = [...prev.devProcess];
      list[idx] = { ...list[idx], [field]: value };
      return { ...prev, devProcess: list };
    });
  };

  const addProcess = () => {
    setFormData((prev) => {
      const nextNum = String(prev.devProcess.length + 1).padStart(2, "0");
      return {
        ...prev,
        devProcess: [...prev.devProcess, { num: nextNum, stepTitle: "New Process Stage", desc: "Stage details here." }],
      };
    });
  };

  const removeProcess = (idx: number) => {
    setFormData((prev) => {
      const filtered = prev.devProcess.filter((_, i) => i !== idx);
      // Re-index process numbers
      const reindexed = filtered.map((item, i) => ({
        ...item,
        num: String(i + 1).padStart(2, "0"),
      }));
      return { ...prev, devProcess: reindexed };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess(false);

    try {
      const res = await fetch("/api/homepage", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to save homepage section data");
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
        <Loader2 className="animate-spin text-[#2563EB]" size={32} />
        <span className="ml-3 text-slate-300">Loading homepage content...</span>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-100 font-display">Homepage Content</h1>
        <p className="text-sm text-slate-400 mt-1">Manage titles, description copy, CTA hooks, and structural items shown on the landing page.</p>
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
            <span>Homepage sections saved successfully!</span>
          </div>
        )}

        {/* Hero Copy */}
        <div className="bg-[#111827] border border-[#1E293B] rounded-xl p-6 space-y-4">
          <h2 className="text-base font-semibold text-slate-200 border-b border-[#1E293B] pb-3 font-display">Hero Copy & Call to Action</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400">Hero Heading (Normal Text)</label>
              <input
                type="text"
                name="heroTitleNormal"
                value={formData.heroTitleNormal}
                onChange={handleChange}
                className="w-full bg-[#1E293B] border border-[#1E293B] rounded-lg px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#2563EB] transition"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400">Hero Heading (Highlighted Accent)</label>
              <input
                type="text"
                name="heroTitleHighlight"
                value={formData.heroTitleHighlight}
                onChange={handleChange}
                className="w-full bg-[#1E293B] border border-[#1E293B] rounded-lg px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#2563EB] transition"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-400">Hero Subtitle</label>
            <textarea
              name="heroSubtitle"
              rows={3}
              value={formData.heroSubtitle}
              onChange={handleChange}
              className="w-full bg-[#1E293B] border border-[#1E293B] rounded-lg px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#2563EB] transition resize-y"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400">CTA Button Text</label>
              <input
                type="text"
                name="ctaText"
                value={formData.ctaText}
                onChange={handleChange}
                className="w-full bg-[#1E293B] border border-[#1E293B] rounded-lg px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#2563EB] transition"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400">CTA Redirect Link</label>
              <input
                type="text"
                name="ctaLink"
                value={formData.ctaLink}
                onChange={handleChange}
                className="w-full bg-[#1E293B] border border-[#1E293B] rounded-lg px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#2563EB] transition"
                required
              />
            </div>
          </div>
        </div>

        {/* Why Choose Us Cards */}
        <div className="bg-[#111827] border border-[#1E293B] rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-[#1E293B] pb-3">
            <h2 className="text-base font-semibold text-slate-200 font-display">Why Choose Us Cards</h2>
            <Button type="button" onClick={addCard} variant="secondary" size="sm" className="flex items-center gap-1 text-[#38BDF8] border-[#1E293B] hover:bg-[#1E293B]">
              <Plus size={14} /> Add Card
            </Button>
          </div>

          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-1">
            {formData.whyChooseUs.length === 0 ? (
              <p className="text-xs text-slate-500 text-center py-4">No cards added. Click &quot;Add Card&quot; to begin.</p>
            ) : (
              formData.whyChooseUs.map((card, idx) => (
                <div key={idx} className="bg-[#111827]/70 border border-[#1E293B]/60 rounded-lg p-4 space-y-3 relative group">
                  <button
                    type="button"
                    onClick={() => removeCard(idx)}
                    className="absolute top-4 right-4 text-slate-500 hover:text-rose-400 transition"
                  >
                    <Trash2 size={16} />
                  </button>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-8">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-400">Card Title</label>
                      <input
                        type="text"
                        value={card.title}
                        onChange={(e) => handleCardChange(idx, "title", e.target.value)}
                        className="w-full bg-[#1E293B] border border-[#1E293B] rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-[#2563EB] transition"
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-400">Icon (Lucide name: Cpu, Brain, Shield, etc.)</label>
                      <input
                        type="text"
                        value={card.iconName}
                        onChange={(e) => handleCardChange(idx, "iconName", e.target.value)}
                        className="w-full bg-[#1E293B] border border-[#1E293B] rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-[#2563EB] transition"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5 pr-8">
                    <label className="text-xs font-semibold text-slate-400">Description</label>
                    <textarea
                      value={card.desc}
                      rows={2}
                      onChange={(e) => handleCardChange(idx, "desc", e.target.value)}
                      className="w-full bg-[#1E293B] border border-[#1E293B] rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-[#2563EB] transition resize-y"
                      required
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Process Roadmap Stages */}
        <div className="bg-[#111827] border border-[#1E293B] rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-[#1E293B] pb-3">
            <h2 className="text-base font-semibold text-slate-200 font-display">Development Process Stages</h2>
            <Button type="button" onClick={addProcess} variant="secondary" size="sm" className="flex items-center gap-1 text-[#38BDF8] border-[#1E293B] hover:bg-[#1E293B]">
              <Plus size={14} /> Add Stage
            </Button>
          </div>

          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-1">
            {formData.devProcess.length === 0 ? (
              <p className="text-xs text-slate-500 text-center py-4">No stages added. Click &quot;Add Stage&quot; to begin.</p>
            ) : (
              formData.devProcess.map((step, idx) => (
                <div key={idx} className="bg-[#111827]/70 border border-[#1E293B]/60 rounded-lg p-4 space-y-3 relative">
                  <button
                    type="button"
                    onClick={() => removeProcess(idx)}
                    className="absolute top-4 right-4 text-slate-500 hover:text-rose-400 transition"
                  >
                    <Trash2 size={16} />
                  </button>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pr-8">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-400">Step Index (e.g. 01)</label>
                      <input
                        type="text"
                        value={step.num}
                        onChange={(e) => handleProcessChange(idx, "num", e.target.value)}
                        className="w-full bg-[#1E293B] border border-[#1E293B] rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-[#2563EB] transition text-center font-mono"
                        required
                      />
                    </div>

                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-xs font-semibold text-slate-400">Stage Title</label>
                      <input
                        type="text"
                        value={step.stepTitle}
                        onChange={(e) => handleProcessChange(idx, "stepTitle", e.target.value)}
                        className="w-full bg-[#1E293B] border border-[#1E293B] rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-[#2563EB] transition"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5 pr-8">
                    <label className="text-xs font-semibold text-slate-400">Description</label>
                    <textarea
                      value={step.desc}
                      rows={2}
                      onChange={(e) => handleProcessChange(idx, "desc", e.target.value)}
                      className="w-full bg-[#1E293B] border border-[#1E293B] rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-[#2563EB] transition resize-y"
                      required
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={saving} className="bg-[#2563EB] hover:bg-[#297FFF] px-6 py-2.5 flex items-center gap-2">
            {saving ? (
              <>
                <Loader2 size={16} className="animate-spin" /> Saving...
              </>
            ) : (
              <>
                <Save size={16} /> Save Sections
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
