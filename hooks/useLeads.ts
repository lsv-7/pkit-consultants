"use client";

import { useEffect, useState } from "react";
import { Lead } from "../types";

export default function useLeads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchLeads() {
    setLoading(true);

    const res = await fetch("/api/leads");

    const data = await res.json();

    setLeads(data);

    setLoading(false);
  }

  useEffect(() => {
    fetchLeads();
  }, []);

  return {
    leads,
    loading,
    refresh: fetchLeads,
  };
}