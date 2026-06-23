"use client";

import { useEffect, useState } from "react";
import { Loader2, Plus, Edit2, Trash2, ArrowLeft, Save, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface IndustryItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  displayOrder: number;
  active: boolean;
  solutions: string[];
}

export default function IndustriesCMS() {
  const [industries, setIndustries] = useState<IndustryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Editor states
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    icon: "Rocket",
    displayOrder: 0,
    active: true,
    solutionsRaw: "",
  });

  async function loadIndustries() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/industries");
      if (!res.ok) throw new Error("Failed to load industries");
      const data = await res.json();
      setIndustries(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadIndustries();
  }, []);

  const handleOpenCreate = () => {
    setEditingId(null);
    setFormData({
      name: "",
      slug: "",
      description: "",
      icon: "Rocket",
      displayOrder: industries.length,
      active: true,
      solutionsRaw: "",
    });
    setFormError("");
    setEditorOpen(true);
  };

  const handleOpenEdit = (ind: IndustryItem) => {
    setEditingId(ind.id);
    setFormData({
      name: ind.name,
      slug: ind.slug,
      description: ind.description,
      icon: ind.icon,
      displayOrder: ind.displayOrder,
      active: ind.active,
      solutionsRaw: ind.solutions.join(", "),
    });
    setFormError("");
    setEditorOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this industry?")) return;

    try {
      const res = await fetch(`/api/industries/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to delete industry");
      }
      setIndustries((prev) => prev.filter((ind) => ind.id !== id));
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setFormError("");

    // Process lists
    const solutions = formData.solutionsRaw
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const payload = {
      name: formData.name,
      slug: formData.slug,
      description: formData.description,
      icon: formData.icon,
      displayOrder: Number(formData.displayOrder),
      active: formData.active,
      solutions,
    };

    try {
      const url = editingId ? `/api/industries/${editingId}` : "/api/industries";
      const method = editingId ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to save industry");
      }

      setEditorOpen(false);
      loadIndustries();
    } catch (err: any) {
      setFormError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading && industries.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <Loader2 className="animate-spin text-[#0066FF]" size={32} />
        <span className="ml-3 text-slate-300">Loading industries...</span>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* 1. LIST VIEW */}
      {!editorOpen ? (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-100 font-display">Industries CMS</h1>
              <p className="text-sm text-slate-400 mt-1">Manage target sectors, sector descriptions, and dynamic targeted solution badges.</p>
            </div>
            <Button onClick={handleOpenCreate} className="bg-[#0066FF] hover:bg-[#297FFF] flex items-center gap-1.5 px-4">
              <Plus size={16} /> Add Industry
            </Button>
          </div>

          {error && (
            <div className="flex items-center gap-3 p-4 bg-rose-500/10 border border-rose-500/20 text-rose-300 rounded-lg text-sm">
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          <div className="bg-[#060F24] border border-[#0E204A] rounded-xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-[#0E204A] bg-[#0C1A3D]/40 text-slate-400 font-medium select-none">
                    <th className="py-4 px-6">Display Order</th>
                    <th className="py-4 px-6">Name</th>
                    <th className="py-4 px-6">Slug</th>
                    <th className="py-4 px-6">Icon</th>
                    <th className="py-4 px-6">Status</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#0E204A] text-slate-300">
                  {industries.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-slate-500">No industries found. Click "Add Industry" to start.</td>
                    </tr>
                  ) : (
                    industries.map((ind) => (
                      <tr key={ind.id} className="hover:bg-[#0C1A3D]/20 transition duration-150">
                        <td className="py-4 px-6 font-mono text-xs">{ind.displayOrder}</td>
                        <td className="py-4 px-6 font-semibold text-slate-100">{ind.name}</td>
                        <td className="py-4 px-6 text-slate-400 font-mono text-xs">{ind.slug}</td>
                        <td className="py-4 px-6 font-mono text-xs">{ind.icon}</td>
                        <td className="py-4 px-6">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold ${ind.active ? "bg-emerald-500/10 text-emerald-400" : "bg-slate-500/10 text-slate-400"}`}>
                            {ind.active ? "Active" : "Inactive"}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-right space-x-2">
                          <button onClick={() => handleOpenEdit(ind)} className="p-1.5 text-slate-400 hover:text-white hover:bg-[#0C1A3D] rounded transition">
                            <Edit2 size={15} />
                          </button>
                          <button onClick={() => handleDelete(ind.id)} className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded transition">
                            <Trash2 size={15} />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        /* 2. EDITOR FORM VIEW */
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <button onClick={() => setEditorOpen(false)} className="p-2 text-slate-400 hover:text-slate-200 hover:bg-[#060F24] rounded-lg border border-[#0E204A]">
              <ArrowLeft size={16} />
            </button>
            <div>
              <h1 className="text-xl font-bold text-slate-100 font-display">{editingId ? "Edit Industry" : "New Industry"}</h1>
              <p className="text-xs text-slate-400 mt-0.5">Configure details, solutions, and regulatory specs for this industry sector.</p>
            </div>
          </div>

          <form onSubmit={handleSave} className="space-y-6">
            {formError && (
              <div className="flex items-center gap-3 p-4 bg-rose-500/10 border border-rose-500/20 text-rose-300 rounded-lg text-sm">
                <AlertCircle size={18} />
                <span>{formError}</span>
              </div>
            )}

            <div className="bg-[#060F24] border border-[#0E204A] rounded-xl p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-400">Industry Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    className="w-full bg-[#0C1A3D] border border-[#142D66] rounded-lg px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#0066FF] transition"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-400">Slug (e.g. healthcare)</label>
                  <input
                    type="text"
                    name="slug"
                    value={formData.slug}
                    onChange={handleFormChange}
                    className="w-full bg-[#0C1A3D] border border-[#142D66] rounded-lg px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#0066FF] transition font-mono text-xs"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-400">Icon Name</label>
                  <select
                    name="icon"
                    value={formData.icon}
                    onChange={handleFormChange}
                    className="w-full bg-[#0C1A3D] border border-[#142D66] rounded-lg px-3.5 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-[#0066FF] transition"
                  >
                    <option value="Heart">Heart</option>
                    <option value="GraduationCap">GraduationCap</option>
                    <option value="ShoppingBag">ShoppingBag</option>
                    <option value="Hammer">Hammer</option>
                    <option value="Factory">Factory</option>
                    <option value="Building">Building</option>
                    <option value="Building2">Building2</option>
                    <option value="Rocket">Rocket</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-400">Display Order</label>
                  <input
                    type="number"
                    name="displayOrder"
                    value={formData.displayOrder}
                    onChange={handleFormChange}
                    className="w-full bg-[#0C1A3D] border border-[#142D66] rounded-lg px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#0066FF] transition font-mono"
                    required
                  />
                </div>

                <div className="flex items-center h-full pt-6 pl-2">
                  <label className="flex items-center gap-2 cursor-pointer select-none text-sm text-slate-300">
                    <input
                      type="checkbox"
                      name="active"
                      checked={formData.active}
                      onChange={handleFormChange}
                      className="w-4 h-4 rounded accent-[#0066FF] bg-[#0C1A3D] border border-[#142D66]"
                    />
                    Active (visible on website)
                  </label>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-400">Description</label>
                <textarea
                  name="description"
                  rows={4}
                  value={formData.description}
                  onChange={handleFormChange}
                  className="w-full bg-[#0C1A3D] border border-[#142D66] rounded-lg px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#0066FF] transition resize-y"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-400">Solutions Delivered (Comma separated)</label>
                <input
                  type="text"
                  name="solutionsRaw"
                  value={formData.solutionsRaw}
                  placeholder="Solution 1, Solution 2, Solution 3"
                  className="w-full bg-[#0C1A3D] border border-[#142D66] rounded-lg px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#0066FF] transition"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Button type="button" onClick={() => setEditorOpen(false)} variant="secondary" className="px-5 border-[#0E204A] text-slate-300">
                Cancel
              </Button>
              <Button type="submit" disabled={saving} className="bg-[#0066FF] hover:bg-[#297FFF] px-6 py-2 flex items-center gap-1.5">
                {saving ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Saving...
                  </>
                ) : (
                  <>
                    <Save size={16} /> Save Industry
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
