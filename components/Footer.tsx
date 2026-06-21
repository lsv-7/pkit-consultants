"use client";

import { usePathname } from "next/navigation";
export default function Footer() {
  const pathname = usePathname();

if (pathname.startsWith("/admin")) {
  return null;
}
  return (
    <footer className="bg-slate-950 text-white py-6 text-center">
      <p>© 2026 PKIT Consultants. All Rights Reserved.</p>
    </footer>
  );
}