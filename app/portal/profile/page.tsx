"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { User, Building, Shield, Check, AlertCircle, Eye, EyeOff, Key } from "lucide-react";

export default function PortalProfilePage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Fields
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [address, setAddress] = useState("");

  // Password fields
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch("/api/portal/profile");
        const data = await res.json();
        if (data.success) {
          const user = data.clientUser;
          setFullName(user.fullName || "");
          setEmail(user.email || "");
          
          if (user.client) {
            setCompany(user.client.company || "");
            setContactPerson(user.client.contactPerson || "");
            setPhone(user.client.phone || "");
            setWebsite(user.client.website || "");
            setAddress(user.client.address || "");
          }
        }
      } catch (err) {
        console.error("Error fetching profile details:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, []);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMsg("");
    setErrorMsg("");

    if (password && password !== confirmPassword) {
      setErrorMsg("Passwords do not match");
      setSaving(false);
      return;
    }

    try {
      const res = await fetch("/api/portal/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          company,
          contactPerson,
          phone,
          website,
          address,
          password: password || undefined,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSuccessMsg("Your account profile was updated successfully.");
        setPassword("");
        setConfirmPassword("");
      } else {
        setErrorMsg(data.message || "Failed to update profile details");
      }
    } catch (err) {
      setErrorMsg("An error occurred. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-slate-400 font-medium">
        Loading profile details...
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      
      {/* Header */}
      <div className="mb-6 select-none">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-slate-100 tracking-tight">
          Account Profile
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Review system identity keys, customize contact points, and secure your session credentials.
        </p>
      </div>

      {/* Message banners */}
      {successMsg && (
        <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 rounded-lg text-xs flex items-center gap-2">
          <Check size={15} className="flex-shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-3.5 bg-rose-500/10 border border-rose-500/20 text-rose-300 rounded-lg text-xs flex items-center gap-2">
          <AlertCircle size={15} className="flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleUpdateProfile} className="space-y-6">
        
        {/* Card 1: Identity & Credentials */}
        <Card className="border border-[#0E204A] bg-[#060F24]/50 p-6 rounded-xl space-y-4">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
            <User size={15} className="text-blue-500" />
            Personal Credentials
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Full Name
              </label>
              <Input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="text-xs bg-[#020612]/70 border-[#0E204A] text-slate-200"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Portal Email (Read-Only)
              </label>
              <div className="px-3 py-2 bg-[#020612]/30 border border-[#0E204A]/60 rounded-lg text-xs text-slate-500 font-mono">
                {email}
              </div>
            </div>
          </div>
        </Card>

        {/* Card 2: Company Info */}
        <Card className="border border-[#0E204A] bg-[#060F24]/50 p-6 rounded-xl space-y-4">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
            <Building size={15} className="text-blue-500" />
            Company details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Company Name
              </label>
              <Input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                required
                className="text-xs bg-[#020612]/70 border-[#0E204A] text-slate-200"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Contact Person Name
              </label>
              <Input
                type="text"
                value={contactPerson}
                onChange={(e) => setContactPerson(e.target.value)}
                required
                className="text-xs bg-[#020612]/70 border-[#0E204A] text-slate-200"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Phone Contact
              </label>
              <Input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="text-xs bg-[#020612]/70 border-[#0E204A] text-slate-200"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Website
              </label>
              <Input
                type="text"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="e.g. www.company.com"
                className="text-xs bg-[#020612]/70 border-[#0E204A] text-slate-200"
              />
            </div>

            <div className="space-y-1.5 md:col-span-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Address
              </label>
              <Input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="e.g. 123 Tech Boulevard"
                className="text-xs bg-[#020612]/70 border-[#0E204A] text-slate-200"
              />
            </div>
          </div>
        </Card>

        {/* Card 3: Change Password */}
        <Card className="border border-[#0E204A] bg-[#060F24]/50 p-6 rounded-xl space-y-4">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
            <Key size={15} className="text-blue-500" />
            Update Portal Password
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                New Password
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Leave blank to keep current"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="text-xs bg-[#020612]/70 border-[#0E204A] text-slate-200 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-500 hover:text-slate-300"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Confirm New Password
              </label>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="text-xs bg-[#020612]/70 border-[#0E204A] text-slate-200"
              />
            </div>
          </div>
        </Card>

        <Button
          type="submit"
          disabled={saving}
          className="w-full bg-[#0066FF] hover:bg-blue-600 font-semibold text-xs py-2.5 shadow-lg shadow-blue-500/10"
        >
          {saving ? "Saving Changes..." : "Save Profile Details"}
        </Button>

      </form>

    </div>
  );
}
