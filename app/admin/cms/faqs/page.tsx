"use client";

import { useEffect, useState } from "react";
import { Loader2, Plus, Edit2, Trash2, ArrowLeft, Save, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/ToastProvider";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  displayOrder: number;
  active: boolean;
}

export default function FAQsCMS() {
  const { toast } = useToast();
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Editor states
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    category: "General",
    displayOrder: 0,
    active: true,
  });

  async function loadFAQs() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/faqs");
      if (!res.ok) throw new Error("Failed to load FAQs");
      const data = await res.json();
      setFaqs(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadFAQs();
  }, []);

  const handleOpenCreate = () => {
    setEditingId(null);
    setFormData({
      question: "",
      answer: "",
      category: "General",
      displayOrder: faqs.length,
      active: true,
    });
    setFormError("");
    setEditorOpen(true);
  };

  const handleOpenEdit = (f: FAQItem) => {
    setEditingId(f.id);
    setFormData({
      question: f.question,
      answer: f.answer,
      category: f.category,
      displayOrder: f.displayOrder,
      active: f.active,
    });
    setFormError("");
    setEditorOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this FAQ?")) return;

    try {
      const res = await fetch(`/api/faqs/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to delete FAQ");
      }
      setFaqs((prev) => prev.filter((f) => f.id !== id));
    } catch (err: any) {
      toast.error(err.message);
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

    const payload = {
      question: formData.question,
      answer: formData.answer,
      category: formData.category,
      displayOrder: Number(formData.displayOrder),
      active: formData.active,
    };

    try {
      const url = editingId ? `/api/faqs/${editingId}` : "/api/faqs";
      const method = editingId ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to save FAQ");
      }

      setEditorOpen(false);
      loadFAQs();
    } catch (err: any) {
      setFormError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading && faqs.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <Loader2 className="animate-spin text-[#2563EB]" size={32} />
        <span className="ml-3 text-slate-300">Loading FAQs...</span>
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
              <h1 className="text-2xl font-bold text-slate-100 font-display">FAQs CMS</h1>
              <p className="text-sm text-slate-400 mt-1">Manage frequently asked questions, answers, and visual sorting order on the public site.</p>
            </div>
            <Button onClick={handleOpenCreate} className="bg-[#2563EB] hover:bg-[#297FFF] flex items-center gap-1.5 px-4">
              <Plus size={16} /> Add FAQ
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
                    <th className="py-4 px-6">Question</th>
                    <th className="py-4 px-6">Category</th>
                    <th className="py-4 px-6">Status</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1E293B]/50 text-slate-300">
                  {faqs.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-slate-500">No FAQs found. Click &quot;Add FAQ&quot; to start.</td>
                    </tr>
                  ) : (
                    faqs.map((f) => (
                      <tr key={f.id} className="hover:bg-[#1E293B]/20 transition duration-150">
                        <td className="py-4 px-6 font-mono text-xs">{f.displayOrder}</td>
                        <td className="py-4 px-6 font-semibold text-slate-100 max-w-sm truncate">{f.question}</td>
                        <td className="py-4 px-6 text-slate-400 font-mono text-xs">{f.category}</td>
                        <td className="py-4 px-6">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold ${f.active ? "bg-emerald-500/10 text-emerald-400" : "bg-slate-500/10 text-slate-400"}`}>
                            {f.active ? "Active" : "Inactive"}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-right space-x-2">
                          <button onClick={() => handleOpenEdit(f)} className="p-1.5 text-slate-400 hover:text-white hover:bg-[#1E293B] rounded transition">
                            <Edit2 size={15} />
                          </button>
                          <button onClick={() => handleDelete(f.id)} className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded transition">
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
              <h1 className="text-xl font-bold text-slate-100 font-display">{editingId ? "Edit FAQ" : "New FAQ"}</h1>
              <p className="text-xs text-slate-400 mt-0.5">Configure question, detailed answer copy, and category tag grouping.</p>
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
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-400">Question</label>
                <input
                  type="text"
                  name="question"
                  value={formData.question}
                  onChange={handleFormChange}
                  className="w-full bg-[#1E293B] border border-[#1E293B] rounded-lg px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#2563EB] transition"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-400">Category Tag</label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleFormChange}
                    placeholder="e.g. Engagements, General, Support"
                    className="w-full bg-[#1E293B] border border-[#1E293B] rounded-lg px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#2563EB] transition"
                    required
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

                <div className="flex items-center h-full pt-6 pl-2">
                  <label className="flex items-center gap-2 cursor-pointer select-none text-sm text-slate-300">
                    <input
                      type="checkbox"
                      name="active"
                      checked={formData.active}
                      onChange={handleFormChange}
                      className="w-4 h-4 rounded accent-[#2563EB] bg-[#1E293B] border border-[#1E293B]"
                    />
                    Active (visible on website)
                  </label>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-400">Answer</label>
                <textarea
                  name="answer"
                  rows={5}
                  value={formData.answer}
                  onChange={handleFormChange}
                  className="w-full bg-[#1E293B] border border-[#1E293B] rounded-lg px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#2563EB] transition resize-y"
                  required
                />
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
                    <Save size={16} /> Save FAQ
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
