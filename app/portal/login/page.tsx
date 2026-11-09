"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Key, Mail, AlertCircle, Eye, EyeOff, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/Input";
import Link from "next/link";
import { COMPANY } from "@/lib/company";

export default function PortalLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/portal/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (data.success) {
        router.push("/portal");
        router.refresh();
      } else {
        setError(data.message || "Invalid credentials");
      }
    } catch {
      setError("Something went wrong. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative bg-[#071326] overflow-hidden px-4">
      {/* Background decoration & geometric pattern */}
      <div className="bg-islamic-pattern absolute inset-0 opacity-15 pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#2563EB]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#D5AC42]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Form Container */}
      <div className="w-full max-w-md bg-gradient-to-b from-[#101E36] to-[#071326] border border-[#D5AC42]/30 backdrop-blur-md rounded-2xl p-8 relative z-10 shadow-2xl shadow-black/80">
        
        {/* Branding header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rotate-45 border border-[#D5AC42]/70 bg-[#101E36] flex items-center justify-center shadow-lg shadow-[#D5AC42]/20 mx-auto mb-5">
            <span className="-rotate-45 font-serif font-bold text-[#EBD68C] text-base">
              PK
            </span>
          </div>
          <span className="font-sans text-[10px] text-[#D5AC42] font-semibold tracking-[0.24em] uppercase block mb-1">
            DUBAI ENTERPRISE GATEWAY
          </span>
          <h2 className="font-serif font-bold text-2xl text-[#F4F0E8] tracking-tight">
            Client Portal Access
          </h2>
          <p className="text-xs text-[#9CAAC0] mt-1.5 leading-relaxed">
            Log in to inspect milestones, access verified documents, and review invoices.
          </p>
        </div>

        {/* Error banner */}
        {error && (
          <div className="mb-6 p-3.5 bg-rose-500/10 border border-rose-500/20 text-rose-300 rounded-lg text-xs flex items-center gap-2.5">
            <AlertCircle size={16} className="flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-[#9CAAC0] uppercase tracking-wider">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#D5AC42] pointer-events-none">
                <Mail size={16} />
              </span>
              <Input
                type="email"
                placeholder="client@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="pl-10 text-xs bg-[#071326]/70 border-[#D5AC42]/25 text-[#F4F0E8] focus:border-[#D5AC42]"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-bold text-[#9CAAC0] uppercase tracking-wider">
                Password
              </label>
              <Link href="/portal/forgot-password" className="text-[11px] text-[#D5AC42] hover:underline font-semibold">
                Forgot Password?
              </Link>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#D5AC42] pointer-events-none">
                <Key size={16} />
              </span>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="pl-10 pr-10 text-xs bg-[#071326]/70 border-[#D5AC42]/25 text-[#F4F0E8] focus:border-[#D5AC42]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-[#9CAAC0] hover:text-[#F4F0E8]"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Remember me */}
          <div className="flex items-center justify-between pt-1 select-none">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-[#D5AC42]/30 bg-[#071326]/50 text-[#D5AC42] focus:ring-0 w-3.5 h-3.5"
              />
              <span className="text-xs text-[#9CAAC0] group-hover:text-[#F4F0E8] transition-colors">
                Remember this device
              </span>
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="btn-gold-pill w-full justify-center py-3 text-xs tracking-wider"
          >
            {loading ? "Authenticating..." : "Access Portal"}
            {!loading && <ArrowRight size={14} />}
          </button>
        </form>

        {/* Footer */}
        <div className="text-center mt-6 pt-5 border-t border-[#D5AC42]/15 text-[11px] text-[#9CAAC0]">
          Need assistance? Contact your {COMPANY.name.split(" ")[0]} project manager.
        </div>
      </div>
    </div>
  );
}
