"use client";

import { useEffect, useState } from "react";
import { Loader2, Save, AlertCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface SettingsState {
  companyName: string;
  tagline: string;
  email: string;
  phone: string;
  whatsapp: string;
  officeAddress: string;
  googleMapsLink: string;
  workingHours: string;
  logoUrl: string;
  faviconUrl: string;
  linkedin: string;
  instagram: string;
  facebook: string;
  twitter: string;
  youtube: string;
  ceoName: string;
  ceoDesignation: string;
  ceoSignatureUrl: string;
}

export default function WebsiteSettingsCMS() {
  const [formData, setFormData] = useState<SettingsState>({
    companyName: "",
    tagline: "",
    email: "",
    phone: "",
    whatsapp: "",
    officeAddress: "",
    googleMapsLink: "",
    workingHours: "",
    logoUrl: "",
    faviconUrl: "",
    linkedin: "",
    instagram: "",
    facebook: "",
    twitter: "",
    youtube: "",
    ceoName: "",
    ceoDesignation: "",
    ceoSignatureUrl: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    async function loadSettings() {
      try {
        const res = await fetch("/api/settings");
        if (!res.ok) throw new Error("Failed to load settings");
        const data = await res.json();
        setFormData({
          companyName: data.companyName || "",
          tagline: data.tagline || "",
          email: data.email || "",
          phone: data.phone || "",
          whatsapp: data.whatsapp || "",
          officeAddress: data.officeAddress || "",
          googleMapsLink: data.googleMapsLink || "",
          workingHours: data.workingHours || "",
          logoUrl: data.logoUrl || "",
          faviconUrl: data.faviconUrl || "",
          linkedin: data.linkedin || "",
          instagram: data.instagram || "",
          facebook: data.facebook || "",
          twitter: data.twitter || "",
          youtube: data.youtube || "",
          ceoName: data.ceoName || "",
          ceoDesignation: data.ceoDesignation || "",
          ceoSignatureUrl: data.ceoSignatureUrl || "",
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
        throw new Error(data.message || "Failed to save settings");
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
        <span className="ml-3 text-slate-300">Loading settings...</span>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-100 font-display">Website Settings</h1>
        <p className="text-sm text-slate-400 mt-1">Configure company coordinates, branding URLs, and social links across the public site.</p>
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
            <span>Settings saved successfully!</span>
          </div>
        )}

        {/* Branding & Essentials */}
        <div className="bg-[#111827] border border-[#1E293B] rounded-xl p-6 space-y-4">
          <h2 className="text-base font-semibold text-slate-200 border-b border-[#1E293B] pb-3 font-display">Essential Settings</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400">Company Name</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className="w-full bg-[#1E293B] border border-[#1E293B] rounded-lg px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#2563EB] transition"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400">Tagline</label>
              <input
                type="text"
                name="tagline"
                value={formData.tagline}
                onChange={handleChange}
                className="w-full bg-[#1E293B] border border-[#1E293B] rounded-lg px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#2563EB] transition"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400">Logo Path / URL</label>
              <input
                type="text"
                name="logoUrl"
                value={formData.logoUrl}
                onChange={handleChange}
                className="w-full bg-[#1E293B] border border-[#1E293B] rounded-lg px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#2563EB] transition"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400">Favicon Path / URL</label>
              <input
                type="text"
                name="faviconUrl"
                value={formData.faviconUrl}
                onChange={handleChange}
                className="w-full bg-[#1E293B] border border-[#1E293B] rounded-lg px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#2563EB] transition"
                required
              />
            </div>
          </div>
        </div>

        {/* Invoice & Signatory Settings */}
        <div className="bg-[#111827] border border-[#1E293B] rounded-xl p-6 space-y-4">
          <h2 className="text-base font-semibold text-slate-200 border-b border-[#1E293B] pb-3 font-display">Invoice Signatory Settings</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400">Managing Director / Signatory Name</label>
              <input
                type="text"
                name="ceoName"
                value={formData.ceoName}
                onChange={handleChange}
                className="w-full bg-[#1E293B] border border-[#1E293B] rounded-lg px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#2563EB] transition"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400">Signatory Designation</label>
              <input
                type="text"
                name="ceoDesignation"
                value={formData.ceoDesignation}
                onChange={handleChange}
                className="w-full bg-[#1E293B] border border-[#1E293B] rounded-lg px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#2563EB] transition"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400">Digital Signature Image Path (Optional)</label>
              <input
                type="text"
                name="ceoSignatureUrl"
                value={formData.ceoSignatureUrl}
                onChange={handleChange}
                className="w-full bg-[#1E293B] border border-[#1E293B] rounded-lg px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#2563EB] transition"
                placeholder="e.g. /signature.png"
              />
            </div>
          </div>
        </div>

        {/* Contact Coordinates */}
        <div className="bg-[#111827] border border-[#1E293B] rounded-xl p-6 space-y-4">
          <h2 className="text-base font-semibold text-slate-200 border-b border-[#1E293B] pb-3 font-display">Contact Info</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-[#1E293B] border border-[#1E293B] rounded-lg px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#2563EB] transition"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400">Phone Number</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-[#1E293B] border border-[#1E293B] rounded-lg px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#2563EB] transition"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400">WhatsApp Link / Number</label>
              <input
                type="text"
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleChange}
                className="w-full bg-[#1E293B] border border-[#1E293B] rounded-lg px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#2563EB] transition"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400">Office Address</label>
              <input
                type="text"
                name="officeAddress"
                value={formData.officeAddress}
                onChange={handleChange}
                className="w-full bg-[#1E293B] border border-[#1E293B] rounded-lg px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#2563EB] transition"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400">Working Hours</label>
              <input
                type="text"
                name="workingHours"
                value={formData.workingHours}
                onChange={handleChange}
                className="w-full bg-[#1E293B] border border-[#1E293B] rounded-lg px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#2563EB] transition"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-400">Google Maps Embed Link (Src URL only)</label>
            <textarea
              name="googleMapsLink"
              rows={2}
              value={formData.googleMapsLink}
              onChange={handleChange}
              className="w-full bg-[#1E293B] border border-[#1E293B] rounded-lg px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#2563EB] transition resize-y font-mono text-xs"
              required
            />
          </div>
        </div>

        {/* Social Accounts */}
        <div className="bg-[#111827] border border-[#1E293B] rounded-xl p-6 space-y-4">
          <h2 className="text-base font-semibold text-slate-200 border-b border-[#1E293B] pb-3 font-display">Social Media Channels</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400">LinkedIn Profile Link</label>
              <input
                type="text"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
                className="w-full bg-[#1E293B] border border-[#1E293B] rounded-lg px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#2563EB] transition"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400">Instagram Link</label>
              <input
                type="text"
                name="instagram"
                value={formData.instagram}
                onChange={handleChange}
                className="w-full bg-[#1E293B] border border-[#1E293B] rounded-lg px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#2563EB] transition"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400">Facebook Page Link</label>
              <input
                type="text"
                name="facebook"
                value={formData.facebook}
                onChange={handleChange}
                className="w-full bg-[#1E293B] border border-[#1E293B] rounded-lg px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#2563EB] transition"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400">Twitter / X Link</label>
              <input
                type="text"
                name="twitter"
                value={formData.twitter}
                onChange={handleChange}
                className="w-full bg-[#1E293B] border border-[#1E293B] rounded-lg px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#2563EB] transition"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400">YouTube Channel Link</label>
              <input
                type="text"
                name="youtube"
                value={formData.youtube}
                onChange={handleChange}
                className="w-full bg-[#1E293B] border border-[#1E293B] rounded-lg px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#2563EB] transition"
              />
            </div>
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
                <Save size={16} /> Save Settings
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
