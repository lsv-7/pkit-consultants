"use client";

import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

interface AdminProfile {
  name: string;
  email: string;
  role: string;
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [adminProfile, setAdminProfile] = useState<AdminProfile | null>(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch("/api/admin/profile");
        const data = await res.json();
        if (data.success) {
          setAdminProfile(data.admin);
        }
      } catch (err) {
        console.error("Failed to load admin profile", err);
      }
    }
    fetchProfile();
  }, []);

  return (
    <div className="flex h-screen bg-[#0B1120] text-slate-100 overflow-hidden font-sans">
      <Sidebar
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        adminProfile={adminProfile}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Topbar
          setMobileOpen={setMobileOpen}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          adminProfile={adminProfile}
        />

        <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-10 bg-[#0B1120]/10">
          <div className="max-w-[1440px] mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}