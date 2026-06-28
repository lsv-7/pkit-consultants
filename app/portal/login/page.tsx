"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Shield, Key, Mail, AlertCircle, Eye, EyeOff, Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
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
    } catch (err) {
      setError("Something went wrong. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative bg-[#020617] overflow-hidden px-4">
      {/* Background decoration */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl" />

      {/* Form Container */}
      <div className="w-full max-w-md bg-[#090f24]/60 border border-[#0e204a]/75 backdrop-blur-md rounded-2xl p-8 relative z-10 shadow-2xl shadow-black/60">
        
        {/* Branding header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#0066FF] to-[#38BDF8] flex items-center justify-center font-bold text-white text-lg shadow-lg shadow-blue-500/25 mx-auto mb-4">
            PK
          </div>
          <h2 className="font-display font-bold text-2xl text-slate-100 tracking-tight">
            Client Portal
          </h2>
          <p className="text-xs text-slate-400 mt-1.5">
            Log in to view project progress, access documents, and manage your account.
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
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500 pointer-events-none">
                <Mail size={16} />
              </span>
              <Input
                type="email"
                placeholder="client@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="pl-10 text-xs bg-[#030712]/50 border-[#0e204a] text-slate-200"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Password
              </label>
              <Link href="/portal/forgot-password" className="text-[11px] text-[#0066FF] hover:underline font-semibold">
                Forgot Password?
              </Link>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500 pointer-events-none">
                <Key size={16} />
              </span>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="pl-10 pr-10 text-xs bg-[#030712]/50 border-[#0e204a] text-slate-200"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-200"
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
                className="rounded border-[#0e204a] bg-[#030712]/50 text-[#0066FF] focus:ring-offset-0 focus:ring-0 w-3.5 h-3.5"
              />
              <span className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors">
                Remember this device
              </span>
            </label>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0066FF] hover:bg-blue-600 font-semibold text-xs py-2.5 rounded-lg flex items-center justify-center gap-1.5 shadow-lg shadow-blue-500/10 mt-2"
          >
            {loading ? "Authenticating..." : "Access Portal"}
            {!loading && <ArrowRight size={15} />}
          </Button>
        </form>

        {/* Footer */}
        <div className="text-center mt-6 pt-5 border-t border-[#0e204a]/40 text-[11px] text-slate-500">
          Need assistance? Contact your {COMPANY.name.split(" ")[0]} project manager.
        </div>
      </div>
    </div>
  );
}
