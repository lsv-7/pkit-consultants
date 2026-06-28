"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Key, AlertCircle, CheckCircle2, Loader2, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { COMPANY } from "@/lib/company";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const email = searchParams.get("email") || "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (!token || !email) {
      setError("Invalid or broken password reset link. Please request a new link.");
      setLoading(false);
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/portal/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, email, newPassword: password }),
      });

      const data = await res.json();
      if (data.success) {
        setSuccess("Your password has been successfully reset.");
      } else {
        setError(data.message || "Failed to reset password.");
      }
    } catch (err) {
      setError("Something went wrong. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-[#090f24]/60 border border-[#0e204a]/75 backdrop-blur-md rounded-2xl p-8 relative z-10 shadow-2xl shadow-black/60">
      {/* Branding header */}
      <div className="text-center mb-8">
        <h2 className="font-display font-bold text-2xl text-slate-100 tracking-tight">
          Reset Password
        </h2>
        <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
          Create a new password for account <span className="text-[#38BDF8]">{email}</span>.
        </p>
      </div>

      {/* Error banner */}
      {error && (
        <div className="mb-6 p-3.5 bg-rose-500/10 border border-rose-500/20 text-rose-300 rounded-lg text-xs flex items-center gap-2.5">
          <AlertCircle size={16} className="flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Success banner */}
      {success ? (
        <div className="space-y-6 text-center py-4">
          <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto text-emerald-400">
            <CheckCircle2 size={24} />
          </div>
          <p className="text-xs text-slate-300 leading-relaxed px-2">
            {success}
          </p>
          <Link href="/portal/login" className="block w-full">
            <Button className="w-full bg-[#0066FF] hover:bg-blue-600 font-semibold text-xs py-2.5 rounded-lg">
              Go to Login
            </Button>
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* New Password */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              New Password
            </label>
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

          {/* Confirm Password */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Confirm Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500 pointer-events-none">
                <Key size={16} />
              </span>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="pl-10 pr-10 text-xs bg-[#030712]/50 border-[#0e204a] text-slate-200"
              />
            </div>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0066FF] hover:bg-blue-600 font-semibold text-xs py-2.5 rounded-lg flex items-center justify-center gap-1.5 shadow-lg shadow-blue-500/10 mt-2"
          >
            {loading ? (
              <>
                <Loader2 size={15} className="animate-spin" />
                Updating password...
              </>
            ) : (
              "Reset Password"
            )}
          </Button>
        </form>
      )}

      {/* Footer */}
      <div className="text-center mt-6 pt-5 border-t border-[#0e204a]/40 text-[11px] text-slate-500">
        &copy; {new Date().getFullYear()} {COMPANY.name}. Secure Account Services.
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center relative bg-[#020617] overflow-hidden px-4">
      {/* Background decoration */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl" />

      <Suspense fallback={
        <div className="w-full max-w-md bg-[#090f24]/60 border border-[#0e204a]/75 backdrop-blur-md rounded-2xl p-8 relative z-10 shadow-2xl shadow-black/60 text-center py-12 text-slate-400">
          <Loader2 size={32} className="animate-spin mx-auto mb-4 text-[#0066FF]" />
          Loading reset details...
        </div>
      }>
        <ResetPasswordForm />
      </Suspense>
    </div>
  );
}
