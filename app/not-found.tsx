import Link from "next/link";
import { COMPANY } from "@/lib/company";

export default function NotFound() {
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
        404 — Page Not Found
      </p>
      <h1 className="font-display" style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 700, marginBottom: 16 }}>
        This page doesn&apos;t exist
      </h1>
      <p style={{ color: "var(--muted)", maxWidth: 480, lineHeight: 1.7, marginBottom: 32 }}>
        The page you requested may have moved or been removed. Return to {COMPANY.name} to continue browsing our services.
      </p>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
        <Link href="/" className="btn-primary">
          Back to Home
        </Link>
        <Link href="/contact" className="btn-secondary">
          Contact Us
        </Link>
      </div>
    </div>
  );
}
