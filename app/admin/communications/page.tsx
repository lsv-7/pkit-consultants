"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Mail, Search, RefreshCcw, Eye, X, AlertCircle, CheckCircle2, Loader2, Calendar } from "lucide-react";
import { useToast } from "@/components/ui/ToastProvider";

interface EmailLog {
  id: string;
  recipient: string;
  subject: string;
  body: string;
  type: string;
  status: string;
  errorMessage: string | null;
  createdBy: string;
  createdAt: string;
}

export default function CommunicationsAdminPage() {
  const { toast } = useToast();
  const [logs, setLogs] = useState<EmailLog[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filters
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [typeFilter, setTypeFilter] = useState("ALL");
  
  // Details Modal
  const [viewingLog, setViewingLog] = useState<EmailLog | null>(null);
  const [retryingId, setRetryingId] = useState<string | null>(null);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const query = new URLSearchParams({
        search,
        status: statusFilter,
        type: typeFilter,
      });
      const res = await fetch(`/api/admin/communications?${query.toString()}`);
      const data = await res.json();
      if (data.success) {
        setLogs(data.logs);
      } else {
        toast.error(data.message || "Failed to load logs");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error connecting to server");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [search, statusFilter, typeFilter]);

  const handleRetry = async (logId: string) => {
    try {
      setRetryingId(logId);
      const res = await fetch("/api/admin/communications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emailLogId: logId }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Job enqueued for dispatch retry.");
        fetchLogs(); // refresh list
      } else {
        toast.error(data.message || "Failed to enqueue retry");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to execute retry");
    } finally {
      setRetryingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="mb-6 select-none">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-slate-100 tracking-tight">
          System Communications Log
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Monitor all outgoing client notifications, check deliverability audits, and trigger manual email retries.
        </p>
      </div>

      {/* Filters Bar */}
      <div className="bg-[#111827]/40 border border-[#1E293B] rounded-xl p-4 flex flex-col md:flex-row gap-4 items-center justify-between select-none">
        <div className="relative w-full md:max-w-xs">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500 pointer-events-none">
            <Search size={14} />
          </span>
          <input
            type="text"
            placeholder="Search recipient or subject..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#0B1120]/75 border border-[#1E293B] rounded-lg pl-9 pr-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-[#2563EB]"
          />
        </div>

        <div className="flex flex-wrap gap-3 w-full md:w-auto">
          {/* Status filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#0B1120]/75 border border-[#1E293B] rounded-lg px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-[#2563EB]"
          >
            <option value="ALL">All Statuses</option>
            <option value="SENT">Sent</option>
            <option value="FAILED">Failed</option>
            <option value="PENDING">Pending</option>
          </select>

          {/* Type filter */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="bg-[#0B1120]/75 border border-[#1E293B] rounded-lg px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-[#2563EB]"
          >
            <option value="ALL">All Types</option>
            <option value="WELCOME">Welcome</option>
            <option value="PORTAL_CREDENTIALS">Credentials</option>
            <option value="INVOICE">Invoices</option>
            <option value="PAYMENT_RECEIPT">Receipts</option>
            <option value="PASSWORD_RESET">Password Resets</option>
            <option value="CONSULTATION_CONFIRMATION">Booking Confirmations</option>
            <option value="ADMIN_NOTIFICATION">Admin Alerts</option>
            <option value="PROJECT_STATUS">Project Updates</option>
            <option value="GENERAL">General Notice</option>
          </select>

          <Button variant="secondary" onClick={fetchLogs} size="sm" className="h-8.5 gap-1.5 ml-auto md:ml-0">
            <RefreshCcw size={13} className={loading ? "animate-spin" : ""} />
            <span>Sync</span>
          </Button>
        </div>
      </div>

      {/* Communications list */}
      <div className="overflow-hidden rounded-xl border border-[#1E293B] bg-[#111827]/40 backdrop-blur-sm shadow-xl shadow-black/10">
        {loading ? (
          <div className="p-24 text-center text-slate-500">
            <Loader2 size={32} className="animate-spin mx-auto mb-4 text-[#2563EB]" />
            Loading communication logs...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-[#1E293B] bg-[#111827]/70 text-xs font-semibold uppercase tracking-wider text-slate-400 select-none">
                  <th className="py-4 px-5 font-semibold">Recipient</th>
                  <th className="py-4 px-5 font-semibold">Subject</th>
                  <th className="py-4 px-5 font-semibold">Type</th>
                  <th className="py-4 px-5 font-semibold">Status</th>
                  <th className="py-4 px-5 font-semibold">Sent Date</th>
                  <th className="py-4 px-5 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1E293B]/50 text-sm">
                {logs.map((log) => (
                  <tr key={log.id} className="hover:bg-[#1E293B]/20 transition-colors duration-150">
                    <td className="py-3 px-5 font-semibold text-slate-200">
                      <div>{log.recipient}</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">By: {log.createdBy}</div>
                    </td>
                    <td className="py-3 px-5 text-slate-300 font-medium truncate max-w-xs">{log.subject}</td>
                    <td className="py-3 px-5 text-slate-400 font-semibold text-xs tracking-wider">{log.type.replaceAll("_", " ")}</td>
                    <td className="py-3 px-5">
                      <Badge
                        variant={
                          log.status === "SENT"
                            ? "green"
                            : log.status === "FAILED"
                            ? "red"
                            : "blue"
                        }
                      >
                        {log.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-5 text-slate-500 text-xs">
                      {new Date(log.createdAt).toLocaleString()}
                    </td>
                    <td className="py-3 px-5 text-right flex justify-end gap-1.5">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setViewingLog(log)}
                        className="text-slate-400 hover:text-slate-200 hover:bg-[#1E293B] h-8 w-8 p-0"
                        title="View Email Body"
                      >
                        <Eye size={13} />
                      </Button>
                      {log.status === "FAILED" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          disabled={retryingId === log.id}
                          onClick={() => handleRetry(log.id)}
                          className="text-emerald-400 hover:text-emerald-300 hover:bg-[#1E293B] h-8 w-8 p-0"
                          title="Retry Sending"
                        >
                          <RefreshCcw size={13} className={retryingId === log.id ? "animate-spin" : ""} />
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!loading && logs.length === 0 && (
          <div className="p-16 text-center text-slate-500 font-medium select-none">
            <Mail className="mx-auto mb-3 text-slate-600" size={32} />
            No communication logs found matching selection.
          </div>
        )}
      </div>

      {/* Details View Modal */}
      {viewingLog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-2xl bg-[#111827] border border-[#1E293B] rounded-xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center bg-[#1E293B]/20 border-b border-[#1E293B]/70 px-5 py-4 select-none">
              <div>
                <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">Email Dispatch Auditor</h3>
                <p className="text-[10px] text-slate-400 mt-0.5">ID: {viewingLog.id}</p>
              </div>
              <button onClick={() => setViewingLog(null)} className="text-slate-400 hover:text-slate-200 transition-colors">
                <X size={16} />
              </button>
            </div>

            <div className="p-5 space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4 text-xs select-none">
                <div>
                  <span className="block text-slate-500 font-semibold mb-0.5">To:</span>
                  <span className="text-slate-300 font-medium">{viewingLog.recipient}</span>
                </div>
                <div>
                  <span className="block text-slate-500 font-semibold mb-0.5">Status:</span>
                  <Badge variant={viewingLog.status === "SENT" ? "green" : viewingLog.status === "FAILED" ? "red" : "blue"}>
                    {viewingLog.status}
                  </Badge>
                </div>
                <div>
                  <span className="block text-slate-500 font-semibold mb-0.5">Subject:</span>
                  <span className="text-slate-300 font-medium">{viewingLog.subject}</span>
                </div>
                <div>
                  <span className="block text-slate-500 font-semibold mb-0.5">Date:</span>
                  <span className="text-slate-300 font-medium">{new Date(viewingLog.createdAt).toLocaleString()}</span>
                </div>
              </div>

              {viewingLog.errorMessage && (
                <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-300 rounded-lg text-xs flex gap-2.5">
                  <AlertCircle size={16} className="flex-shrink-0" />
                  <div>
                    <strong className="block font-semibold">Delivery Failure Details:</strong>
                    <span className="block mt-1 font-mono text-[11px]">{viewingLog.errorMessage}</span>
                  </div>
                </div>
              )}

              <div className="space-y-1.5">
                <span className="block text-xs text-slate-500 font-semibold select-none">Rendered HTML Content:</span>
                <div className="border border-[#1E293B] rounded-lg overflow-hidden bg-white max-h-96 overflow-y-auto p-4">
                  <div dangerouslySetInnerHTML={{ __html: viewingLog.body }} />
                </div>
              </div>
            </div>

            <div className="bg-[#1E293B]/20 border-t border-[#1E293B] px-5 py-3.5 flex justify-end gap-2.5">
              <Button size="sm" variant="secondary" onClick={() => setViewingLog(null)}>
                Close Auditor
              </Button>
              {viewingLog.status === "FAILED" && (
                <Button
                  size="sm"
                  variant="indigo"
                  onClick={() => {
                    handleRetry(viewingLog.id);
                    setViewingLog(null);
                  }}
                  className="gap-1.5"
                >
                  <RefreshCcw size={13} />
                  <span>Retry Dispatch</span>
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
