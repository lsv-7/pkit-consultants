"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FileText, Download, CreditCard, Calendar, CheckCircle2, AlertCircle, Eye, ArrowRight, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/ToastProvider";

interface Invoice {
  id: string;
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  status: string;
  paymentStatus: string;
  grandTotal: number;
  project?: {
    id: string;
    projectName: string;
  } | null;
}

export default function ClientInvoicesPage() {
  const { toast } = useToast();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [payingInvoiceId, setPayingInvoiceId] = useState<string | null>(null);

  useEffect(() => {
    fetchInvoices();
  }, []);

  async function fetchInvoices() {
    try {
      const res = await fetch("/api/portal/invoices");
      const data = await res.json();
      if (data.success) {
        setInvoices(data.invoices);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handlePayNow(invoiceId: string, invoiceNum: string) {
    if (!confirm(`Do you want to simulate paying invoice ${invoiceNum} via Stripe integration?`)) return;
    setPayingInvoiceId(invoiceId);

    try {
      const res = await fetch(`/api/portal/invoices/${invoiceId}/pay`, {
        method: "POST",
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Payment simulation successful. Invoice status updated to paid.");
        fetchInvoices();
      } else {
        toast.error(data.message || "Failed to process card charge");
      }
    } catch (err) {
      console.error(err);
      toast.error("An unexpected error occurred during card processing");
    } finally {
      setPayingInvoiceId(null);
    }
  }

  if (loading) {
    return (
      <div className="p-12 text-center text-slate-500 select-none">
        Loading invoices and billing information...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="select-none">
        <h2 className="font-display text-xl md:text-2xl font-bold text-slate-100 tracking-tight">
          Invoices & Billing
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Review, download, and settle outstanding balances for your professional services.
        </p>
      </div>

      {/* Main Table (Tablet / Desktop) */}
      <div className="hidden md:block overflow-hidden rounded-xl border border-[#0E204A] bg-[#060F24]/30 backdrop-blur-sm shadow-xl shadow-black/10">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-[#0E204A] bg-[#0C1A3D]/40 text-xs font-semibold uppercase tracking-wider text-slate-400 select-none">
                <th className="p-4.5 font-semibold">Invoice Number</th>
                <th className="p-4.5 font-semibold">Project</th>
                <th className="p-4.5 font-semibold">Issue Date</th>
                <th className="p-4.5 font-semibold">Due Date</th>
                <th className="p-4.5 font-semibold">Amount</th>
                <th className="p-4.5 font-semibold">Status</th>
                <th className="p-4.5 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#0E204A]/60 text-sm">
              {invoices.map((inv) => {
                const isUnpaid = inv.paymentStatus !== "PAID";
                const isPassedDue = new Date(inv.dueDate) < new Date() && isUnpaid && inv.status !== "CANCELLED";
                
                return (
                  <tr key={inv.id} className="hover:bg-[#0C1A3D]/25 transition-colors duration-150">
                    {/* Invoice Number */}
                    <td className="p-4.5 font-mono font-bold text-blue-400">{inv.invoiceNumber}</td>
                    
                    {/* Project */}
                    <td className="p-4.5 text-slate-200 font-medium">
                      {inv.project?.projectName || "General Consulting"}
                    </td>
                    
                    {/* Issue Date */}
                    <td className="p-4.5 text-slate-400">
                      {new Date(inv.invoiceDate).toLocaleDateString()}
                    </td>
                    
                    {/* Due Date */}
                    <td className={`p-4.5 ${isPassedDue ? "text-rose-400 font-bold" : "text-slate-400"}`}>
                      {new Date(inv.dueDate).toLocaleDateString()} {isPassedDue && "(Overdue)"}
                    </td>
                    
                    {/* Amount */}
                    <td className="p-4.5 font-mono font-bold text-slate-200">
                      AED {inv.grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                    
                    {/* Status Badge */}
                    <td className="p-4.5">
                      <Badge variant={inv.paymentStatus === "PAID" ? "green" : isPassedDue ? "red" : "blue"}>
                        {inv.paymentStatus === "PAID" ? "PAID" : isPassedDue ? "OVERDUE" : inv.status}
                      </Badge>
                    </td>
                    
                    {/* Actions */}
                    <td className="p-4.5 text-right">
                      <div className="flex items-center justify-end gap-2.5">
                        <Link href={`/portal/invoices/${inv.id}/preview`}>
                          <Button variant="secondary" size="sm" className="h-8 gap-1">
                            <Eye size={12} />
                            <span>Preview</span>
                          </Button>
                        </Link>
                        
                        {isUnpaid && inv.status !== "CANCELLED" && (
                          <Button
                            variant="indigo"
                            size="sm"
                            className="h-8 gap-1"
                            disabled={payingInvoiceId === inv.id}
                            onClick={() => handlePayNow(inv.id, inv.invoiceNumber)}
                          >
                            {payingInvoiceId === inv.id ? (
                              <Loader2 size={12} className="animate-spin" />
                            ) : (
                              <CreditCard size={12} />
                            )}
                            <span>Pay Now</span>
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {invoices.length === 0 && (
          <div className="p-12 text-center text-slate-500 font-medium select-none">
            No invoices billed to your account.
          </div>
        )}
      </div>

      {/* Mobile Card list */}
      <div className="block md:hidden space-y-4">
        {invoices.map((inv) => {
          const isUnpaid = inv.paymentStatus !== "PAID";
          const isPassedDue = new Date(inv.dueDate) < new Date() && isUnpaid && inv.status !== "CANCELLED";
          
          return (
            <Card key={inv.id} className="border border-[#0E204A] bg-[#060F24]/50 p-4 rounded-xl flex flex-col gap-3">
              <div className="flex justify-between items-center border-b border-[#0E204A]/60 pb-2">
                <span className="font-mono font-bold text-blue-400 text-xs">{inv.invoiceNumber}</span>
                <Badge variant={inv.paymentStatus === "PAID" ? "green" : isPassedDue ? "red" : "blue"}>
                  {inv.paymentStatus === "PAID" ? "PAID" : isPassedDue ? "OVERDUE" : inv.status}
                </Badge>
              </div>
              <div>
                <h4 className="font-semibold text-slate-200 text-sm">{inv.project?.projectName || "General Consulting"}</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">Due: {new Date(inv.dueDate).toLocaleDateString()}</p>
              </div>
              <div className="flex justify-between items-center border-t border-[#0E204A]/40 pt-2.5">
                <span className="font-mono font-bold text-slate-200 text-sm">AED {inv.grandTotal.toLocaleString()}</span>
                <div className="flex gap-2">
                  <Link href={`/portal/invoices/${inv.id}/preview`}>
                    <Button variant="secondary" size="sm" className="h-8 p-2">
                      <Eye size={13} />
                    </Button>
                  </Link>
                  {isUnpaid && inv.status !== "CANCELLED" && (
                    <Button
                      variant="indigo"
                      size="sm"
                      className="h-8 gap-1 text-xs"
                      disabled={payingInvoiceId === inv.id}
                      onClick={() => handlePayNow(inv.id, inv.invoiceNumber)}
                    >
                      {payingInvoiceId === inv.id ? (
                        <Loader2 size={12} className="animate-spin" />
                      ) : (
                        <CreditCard size={12} />
                      )}
                      <span>Pay</span>
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
        {invoices.length === 0 && (
          <div className="p-8 text-center text-slate-500 select-none">
            No invoices found.
          </div>
        )}
      </div>
    </div>
  );
}
