"use client";

import { useEffect, useState } from "react";
import { Loader2, Plus, Edit2, Trash2, ArrowLeft, Save, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/ToastProvider";

interface TechnologyItem {
  id: string;
  name: string;
  logo: string | null;
  category: string;
  displayOrder: number;
}

export default function TechnologiesCMS() {
  const { toast } = useToast();
  const [technologies, setTechnologies] = useState<TechnologyItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Editor states
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    category: "Frontend",
    logo: "",
    displayOrder: 0,
  });

  async function loadTechnologies() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/technologies");
      if (!res.ok) throw new Error("Failed to load technologies");
      const data = await res.json();
      setTechnologies(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTechnologies();
  }, []);

  const handleOpenCreate = () => {
    setEditingId(null);
    setFormData({
      name: "",
      category: "Frontend",
      logo: "",
      displayOrder: technologies.length,
    });
    setFormError("");
    setEditorOpen(true);
  };

  const handleOpenEdit = (t: TechnologyItem) => {
    setEditingId(t.id);
    setFormData({
      name: t.name,
      category: t.category,
      logo: t.logo || "",
      displayOrder: t.displayOrder,
    });
    setFormError("");
    setEditorOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this technology?")) return;

    try {
      const res = await fetch(`/api/technologies/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to delete technology");
      }
      setTechnologies((prev) => prev.filter((t) => t.id !== id));
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setFormError("");

    const payload = {
      name: formData.name,
      category: formData.category,
      logo: formData.logo || null,
      displayOrder: Number(formData.displayOrder),
    };

    try {
      const url = editingId ? `/api/technologies/${editingId}` : "/api/technologies";
      const method = editingId ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to save technology");
      }

      setEditorOpen(false);
      loadTechnologies();
    } catch (err: any) {
      setFormError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading && technologies.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <Loader2 className="animate-spin text-[#2563EB]" size={32} />
        <span className="ml-3 text-slate-300">Loading stack badges...</span>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* 1. LIST VIEW */}
      {!editorOpen ? (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-100 font-display">Technologies CMS</h1>
              <p className="text-sm text-slate-400 mt-1">Manage standard technical skill badges shown inside cards and stack lists.</p>
            </div>
            <Button onClick={handleOpenCreate} className="bg-[#2563EB] hover:bg-[#297FFF] flex items-center gap-1.5 px-4">
              <Plus size={16} /> Add Technology
            </Button>
          </div>

          {error && (
            <div className="flex items-center gap-3 p-4 bg-rose-500/10 border border-rose-500/20 text-rose-300 rounded-lg text-sm">
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          <div className="bg-[#111827] border border-[#1E293B] rounded-xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-[#1E293B] bg-[#111827]/70 text-slate-400 font-medium select-none">
                    <th className="py-4 px-6">Display Order</th>
                    <th className="py-4 px-6">Name</th>
                    <th className="py-4 px-6">Category</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1E293B]/50 text-slate-300">
                  {technologies.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="py-8 text-center text-slate-500">No technologies found. Click &quot;Add Technology&quot; to start.</td>
                    </tr>
                  ) : (
                    technologies.map((t) => (
                      <tr key={t.id} className="hover:bg-[#1E293B]/20 transition duration-150">
                        <td className="py-4 px-6 font-mono text-xs">{t.displayOrder}</td>
                        <td className="py-4 px-6 font-semibold text-slate-100">{t.name}</td>
                        <td className="py-4 px-6 text-slate-400 font-mono text-xs">{t.category}</td>
                        <td className="py-4 px-6 text-right space-x-2">
                          <button onClick={() => handleOpenEdit(t)} className="p-1.5 text-slate-400 hover:text-white hover:bg-[#1E293B] rounded transition">
                            <Edit2 size={15} />
                          </button>
                          <button onClick={() => handleDelete(t.id)} className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded transition">
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
            <button onClick={() => setEditorOpen(false)} className="p-2 text-slate-400 hover:text-slate-200 hover:bg-[#111827] rounded-lg border border-[#1E293B]">
              <ArrowLeft size={16} />
            </button>
            <div>
              <h1 className="text-xl font-bold text-slate-100 font-display">{editingId ? "Edit Technology" : "New Technology"}</h1>
              <p className="text-xs text-slate-400 mt-0.5">Provide name, category, and display sorting order for the technology card.</p>
            </div>
          </div>

          <form onSubmit={handleSave} className="space-y-6">
            {formError && (
              <div className="flex items-center gap-3 p-4 bg-rose-500/10 border border-rose-500/20 text-rose-300 rounded-lg text-sm">
                <AlertCircle size={18} />
                <span>{formError}</span>
              </div>
            )}

            <div className="bg-[#111827] border border-[#1E293B] rounded-xl p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-400">Technology Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    className="w-full bg-[#1E293B] border border-[#1E293B] rounded-lg px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#2563EB] transition"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-400">Category Group</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleFormChange}
                    className="w-full bg-[#1E293B] border border-[#1E293B] rounded-lg px-3.5 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-[#2563EB] transition"
                  >
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="Frontend & Backend">Frontend & Backend</option>
                    <option value="Database">Database</option>
                    <option value="Cloud & SecOps">Cloud & SecOps</option>
                    <option value="AI & Data">AI & Data</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-400">Logo Icon / URL (Optional)</label>
                  <input
                    type="text"
                    name="logo"
                    value={formData.logo}
                    onChange={handleFormChange}
                    className="w-full bg-[#1E293B] border border-[#1E293B] rounded-lg px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#2563EB] transition font-mono text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-400">Display Order</label>
                  <input
                    type="number"
                    name="displayOrder"
                    value={formData.displayOrder}
                    onChange={handleFormChange}
                    className="w-full bg-[#1E293B] border border-[#1E293B] rounded-lg px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#2563EB] transition font-mono"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Button type="button" onClick={() => setEditorOpen(false)} variant="secondary" className="px-5 border-[#1E293B] text-slate-300">
                Cancel
              </Button>
              <Button type="submit" disabled={saving} className="bg-[#2563EB] hover:bg-[#297FFF] px-6 py-2 flex items-center gap-1.5">
                {saving ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Saving...
                  </>
                ) : (
                  <>
                    <Save size={16} /> Save Technology
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
