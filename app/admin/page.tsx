"use client";

import { useEffect, useState } from "react";

import DashboardHeader from "./components/DashboardHeader";
import StatsCards from "./components/StatsCards";
import LeadsTable from "./components/LeadsTable";
import Toolbar from "./components/Toolbar";

import { Lead } from "./types";

export default function AdminDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  async function fetchLeads() {
    setLoading(true);

    const res = await fetch(
      `/api/leads?search=${search}&status=${status}`
    );

    const data = await res.json();

    setLeads(data);

    setLoading(false);
  }

  useEffect(() => {
  const timer = setTimeout(() => {
    fetchLeads();
  }, 500);

  return () => clearTimeout(timer);
}, [search, status]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-10">

      <DashboardHeader />

      <Toolbar
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
        refresh={fetchLeads}
      />

      <StatsCards leads={leads} />

      <LeadsTable leads={leads} />

    </div>
  );
}