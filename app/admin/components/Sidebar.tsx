"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/logout", {
      method: "POST",
    });

    router.push("/login");
    router.refresh();
  }

  const links = [
    {
      name: "Dashboard",
      href: "/admin",
    },
    {
      name: "Projects",
      href: "/admin/projects",
    },
  ];

  return (
    <aside className="w-64 min-h-screen bg-slate-900 border-r border-slate-800 flex flex-col">

      <div className="p-6 border-b border-slate-800">
        <h1 className="text-2xl font-bold text-white">
          PKIT Admin
        </h1>

        <p className="text-slate-400 text-sm mt-1">
          CRM Dashboard
        </p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`block p-3 rounded-lg transition ${
              pathname === link.href
                ? "bg-blue-600 text-white"
                : "hover:bg-slate-800 text-slate-300"
            }`}
          >
            {link.name}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800">

        <div className="mb-4">
          <p className="text-sm font-semibold">
            PKIT Admin
          </p>

          <p className="text-xs text-slate-400">
            Administrator
          </p>
        </div>

        <button
          onClick={logout}
          className="w-full bg-red-600 hover:bg-red-700 py-3 rounded-lg font-medium transition"
        >
          Logout
        </button>

      </div>

    </aside>
  );
}