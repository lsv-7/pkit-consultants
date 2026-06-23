"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { KeyRound, Loader2, ArrowLeft, ShieldCheck } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

export default function LoginPage() {
  const router = useRouter();
  const { theme } = useTheme();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  async function login(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();
      setLoading(false);

      if (!data.success) {
        setErrorMsg("Invalid email or password. Please try again.");
        return;
      }

      // Redirect upon success
      window.location.href = "/admin";
    } catch (err) {
      console.error(err);
      setErrorMsg("An unexpected error occurred. Please check your network.");
      setLoading(false);
    }
  }

  return (
    <div
      className="pkit-root-page"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        overflow: "hidden",
      }}
    >
      {/* Background patterns */}
      <div className="bg-grid" style={{ opacity: 0.4 }} />
      <div
        className="glow-blue"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 500,
          height: 500,
        }}
      />

      {/* Floating Login Container */}
      <div
        style={{
          width: "100%",
          maxWidth: 420,
          background: "var(--surface)",
          border: "1px solid var(--border-soft)",
          borderRadius: 16,
          padding: "40px 32px",
          position: "relative",
          zIndex: 1,
          boxShadow: theme === "light" 
            ? "0 20px 48px -12px rgba(15, 23, 42, 0.08)" 
            : "0 24px 64px -16px rgba(0, 0, 0, 0.7)",
        }}
      >
        {/* Back Link */}
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontSize: 12,
            color: "var(--muted)",
            textDecoration: "none",
            marginBottom: 28,
            transition: "color 0.2s",
          }}
          className="back-home-link"
        >
          <ArrowLeft size={13} /> Return to Home
        </Link>

        {/* Brand header */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div
            style={{
              width: 52,
              height: 52,
              background: "var(--blue-soft)",
              border: "1px solid rgba(47, 111, 237, 0.25)",
              borderRadius: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px",
              color: "var(--cyan)",
            }}
          >
            <KeyRound size={22} />
          </div>
          <h1 className="font-display" style={{ fontSize: 24, fontWeight: 700, margin: 0, color: "var(--text)" }}>
            Client Portal Login
          </h1>
          <p style={{ color: "var(--muted)", fontSize: 13.5, marginTop: 8 }}>
            Access your active projects and billing history.
          </p>
        </div>

        {/* Error message block */}
        {errorMsg && (
          <div
            style={{
              background: "rgba(239, 68, 68, 0.08)",
              border: "1px solid rgba(239, 68, 68, 0.2)",
              borderRadius: 8,
              padding: "12px 14px",
              fontSize: 13,
              color: "#F87171",
              marginBottom: 20,
              lineHeight: 1.4,
            }}
          >
            {errorMsg}
          </div>
        )}

        {/* Form */}
        <form onSubmit={login} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div>
            <label
              htmlFor="login-email"
              style={{
                display: "block",
                fontSize: 12.5,
                fontWeight: 500,
                color: "var(--muted)",
                marginBottom: 6,
              }}
            >
              Email Address
            </label>
            <input
              id="login-email"
              type="email"
              placeholder="name@company.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 14px",
                borderRadius: 8,
                background: "var(--surface-2)",
                border: "1px solid var(--border)",
                color: "var(--text)",
                fontSize: 14,
              }}
              className="login-input"
            />
          </div>

          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <label
                htmlFor="login-password"
                style={{
                  fontSize: 12.5,
                  fontWeight: 500,
                  color: "var(--muted)",
                }}
              >
                Password
              </label>
            </div>
            <input
              id="login-password"
              type="password"
              placeholder="••••••••"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 14px",
                borderRadius: 8,
                background: "var(--surface-2)",
                border: "1px solid var(--border)",
                color: "var(--text)",
                fontSize: 14,
              }}
              className="login-input"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              justifyContent: "center",
              paddingBlock: 12,
              fontSize: 14,
              cursor: loading ? "not-allowed" : "pointer",
              marginTop: 8,
            }}
            className="btn-primary"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" /> Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* Security Footer Info */}
        <div
          style={{
            marginTop: 32,
            paddingTop: 20,
            borderTop: "1px solid var(--border-soft)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            color: "var(--muted-2)",
            fontSize: 12,
          }}
        >
          <ShieldCheck size={14} color="#10B981" />
          <span>Secured client-consultant session</span>
        </div>
      </div>

      <style>{`
        .login-input:focus {
          border-color: var(--blue) !important;
          outline: none;
          box-shadow: 0 0 0 3px rgba(47, 111, 237, 0.2) !important;
        }
        .back-home-link:hover {
          color: var(--text) !important;
        }
      `}</style>
    </div>
  );
}