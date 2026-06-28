"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Mail, Search, Eye, X, Loader2, Calendar } from "lucide-react";
import { useToast } from "@/components/ui/ToastProvider";
import { COMPANY } from "@/lib/company";

interface EmailLog {
  id: string;
  subject: string;
  body: string;
  type: string;
  createdAt: string;
}

export default function ClientCommunicationsPage() {
  const { toast } = useToast();
  const [logs, setLogs] = useState<EmailLog[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Details Modal
  const [viewingLog, setViewingLog] = useState<EmailLog | null>(null);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/portal/communications");
      const data = await res.json();
      if (data.success) {
        setLogs(data.logs);
      } else {
        toast.error(data.message || "Failed to load communication history");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error connecting to portal server");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="mb-6 select-none">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-slate-100 tracking-tight">
          Communication History
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Review all notifications, invoices, payment receipts, and project updates dispatched to your registered address.
        </p>
      </div>

      {/* Communications list */}
      <div className="grid grid-cols-1 gap-4">
        {loading ? (
          <div className="p-24 text-center text-slate-500">
            <Loader2 size={32} className="animate-spin mx-auto mb-4 text-[#0066FF]" />
            Loading notifications history...
          </div>
        ) : (
          logs.map((log) => (
            <Card
              key={log.id}
              className="border border-[#0E204A] bg-[#060F24]/50 p-5 rounded-xl flex flex-col sm:flex-row justify-between sm:items-center gap-4 hover:border-[#0066FF]/40 transition-all duration-200"
              hoverEffect
            >
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-500/15 flex items-center justify-center text-blue-400 mt-1 flex-shrink-0 select-none">
                  <Mail size={16} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-200 text-sm leading-snug">{log.subject}</h3>
                  <div className="flex flex-wrap gap-2.5 items-center mt-2 text-[11px] text-slate-500 select-none font-medium">
                    <span className="bg-[#0b193d]/50 border border-[#0e204a]/60 px-2 py-0.5 rounded text-slate-400 text-[10px] tracking-wider uppercase">
                      {log.type.replaceAll("_", " ")}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={11} />
                      {new Date(log.createdAt).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <Button
                variant="indigo"
                size="sm"
                onClick={() => setViewingLog(log)}
                className="gap-1.5 h-9 shrink-0 select-none"
              >
                <Eye size={13} />
                <span>View Message</span>
              </Button>
            </Card>
          ))
        )}

        {!loading && logs.length === 0 && (
          <div className="p-16 text-center text-slate-500 border border-[#0E204A] rounded-xl bg-[#060F24]/30 select-none">
            <Mail className="mx-auto mb-3 text-slate-600" size={32} />
            No correspondence history registered.
          </div>
        )}
      </div>

      {/* Details View Modal */}
      {viewingLog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-2xl bg-[#090f24] border border-[#0e204a] rounded-xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center bg-[#0C1A3D]/40 border-b border-[#0e204a] px-5 py-4 select-none">
              <div>
                <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">Message Correspondence</h3>
                <p className="text-[10px] text-slate-400 mt-0.5">Date Received: {new Date(viewingLog.createdAt).toLocaleString()}</p>
              </div>
              <button onClick={() => setViewingLog(null)} className="text-slate-400 hover:text-slate-200 transition-colors">
                <X size={16} />
              </button>
            </div>

            <div className="p-5 space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider select-none">Subject Line:</span>
                <h4 className="text-slate-200 font-semibold text-sm leading-snug">{viewingLog.subject}</h4>
              </div>

              <div className="space-y-1.5 pt-2">
                <div className="border border-[#0e204a] rounded-lg overflow-hidden bg-white max-h-96 overflow-y-auto p-4">
                  <div dangerouslySetInnerHTML={{ __html: viewingLog.body }} />
                </div>
              </div>
            </div>

            <div className="bg-[#0C1A3D]/20 border-t border-[#0e204a] px-5 py-3.5 flex justify-end">
              <Button size="sm" variant="secondary" onClick={() => setViewingLog(null)}>
                Close Message
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
