"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";


export default function Navbar() {
  const pathname = usePathname();

if (pathname.startsWith("/admin")) {
  return null;
}
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/90 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="PKIT Consultants"
            width={42}
            height={42}
            priority
          />

          <div>
            <h1 className="font-bold text-lg leading-none">
              PKIT Consultants
            </h1>

            <p className="hidden lg:block text-xs text-slate-400">
  Connecting Business with Technology
</p>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-8">

          <Link
            href="/"
            className="text-slate-300 hover:text-white transition"
          >
            Home
          </Link>

          <Link
            href="/about"
            className="text-slate-300 hover:text-white transition"
          >
            About
          </Link>

          <Link
            href="/services"
            className="text-slate-300 hover:text-white transition"
          >
            Services
          </Link>

          <Link
            href="/contact"
            className="text-slate-300 hover:text-white transition"
          >
            Contact
          </Link>

          <Link
            href="/contact"
            className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg font-medium transition"
          >
            Book Consultation
          </Link>

        </div>

      </div>
    </nav>
  );
}