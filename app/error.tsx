"use client";

import { useEffect } from "react";
import Link from "next/link";
import { COMPANY } from "@/lib/company";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.error(error);
    }
  }, [error]);

  return (
    <div
      className="max-wrap"
      style={{
        minHeight: "70vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 24px",
        textAlign: "center",
      }}
    >
      <p className="eyebrow" style={{ marginBottom: 16 }}>
        Something went wrong
      </p>
      <h1 className="font-display" style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 700, marginBottom: 16 }}>
        We hit an unexpected error
      </h1>
      <p style={{ color: "var(--muted)", maxWidth: 520, lineHeight: 1.7, marginBottom: 32 }}>
        {COMPANY.name} encountered a temporary issue loading this page. Please try again, or contact us if the problem persists.
      </p>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
        <button type="button" onClick={reset} className="btn-primary">
          Try Again
        </button>
        <Link href="/" className="btn-secondary">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
