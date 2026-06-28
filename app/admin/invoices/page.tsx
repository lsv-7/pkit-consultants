"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Search, FileText, Download, Edit2, Copy, Trash2, CreditCard, Calendar, User, DollarSign, X, Check, Eye, Mail, Loader2 } from "lucide-react";
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
  subtotal: number;
  vatRate: number;
  vatAmount: number;
  discount: number;
  grandTotal: number;
  client: {
    id: string;
    company: string;
    contactPerson: string;
    email: string;
  };
  project?: {
    id: string;
    projectName: string;
  } | null;
}

export default function InvoicesPage() {
  const { toast } = useToast();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  
  // Payment Modal state
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [sendingId, setSendingId] = useState<string | null>(null);
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("BANK_TRANSFER");
  const [transactionId, setTransactionId] = useState("");
  const [paymentRef, setPaymentRef] = useState("");
  const [recordingPayment, setRecordingPayment] = useState(false);

  useEffect(() => {
    fetchInvoices();
  }, []);

  async function fetchInvoices() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/invoices");
      const data = await res.json();
      if (data.success) {
        setInvoices(data.invoices);
      }
    } catch (err) {
      console.error("Failed to load invoices", err);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string, num: string) {
    if (!confirm(`Are you sure you want to delete invoice ${num}? This action cannot be undone.`)) return;
    try {
      const res = await fetch(`/api/admin/invoices/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Invoice deleted successfully");
        fetchInvoices();
      } else {
        toast.error(data.message || "Failed to delete invoice");
      }
    } catch (err) {
      console.error("Error deleting invoice", err);
    }
  }

  async function handleDuplicate(id: string) {
    try {
      const res = await fetch(`/api/admin/invoices/${id}/duplicate`, {
        method: "POST",
      });
      const data = await res.json();
      if (data.success) {
        toast.success(`Invoice duplicated successfully as ${data.invoice.invoiceNumber}`);
        fetchInvoices();
      } else {
        toast.error(data.message || "Failed to duplicate invoice");
      }
    } catch (err) {
      console.error("Error duplicating invoice", err);
    }
  }

  async function handleSendInvoice(id: string) {
    try {
      setSendingId(id);
      const res = await fetch(`/api/admin/invoices/${id}/send`, {
        method: "POST",
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Invoice successfully emailed to client.");
        fetchInvoices();
      } else {
        toast.error(data.message || "Failed to email invoice");
      }
    } catch (err) {
      console.error("Error sending invoice email", err);
      toast.error("Failed to email invoice");
    } finally {
      setSendingId(null);
    }
  }

  function openPaymentModal(invoice: Invoice) {
    setSelectedInvoice(invoice);
    setPaymentAmount(invoice.grandTotal.toString());
    setPaymentMethod("BANK_TRANSFER");
    setTransactionId("");
    setPaymentRef("");
    setPaymentModalOpen(true);
  }

  async function handleRecordPayment(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedInvoice) return;
    setRecordingPayment(true);

    try {
      const res = await fetch(`/api/admin/invoices/${selectedInvoice.id}/payments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: parseFloat(paymentAmount),
          paymentMethod,
          transactionId,
          paymentReference: paymentRef,
        }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Payment logged successfully.");
        setPaymentModalOpen(false);
        fetchInvoices();
      } else {
        toast.error(data.message || "Failed to log payment");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while logging payment");
    } finally {
      setRecordingPayment(false);
    }
  }

  // Filtered invoices
  const filteredInvoices = invoices.filter((inv) => {
    const matchesSearch =
      inv.invoiceNumber.toLowerCase().includes(search.toLowerCase()) ||
      inv.client.company.toLowerCase().includes(search.toLowerCase()) ||
      inv.client.contactPerson.toLowerCase().includes(search.toLowerCase()) ||
      (inv.project?.projectName || "").toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "ALL" ||
      inv.status === statusFilter ||
      (statusFilter === "UNPAID" && inv.paymentStatus === "UNPAID") ||
      (statusFilter === "PAID" && inv.paymentStatus === "PAID") ||
      (statusFilter === "PARTIALLY_PAID" && inv.paymentStatus === "PARTIALLY_PAID");

    return matchesSearch && matchesStatus;
  });

  // Calculate metrics
  const totalInvoiced = invoices.reduce((sum, inv) => sum + inv.grandTotal, 0);
  const totalPaid = invoices
    .filter((inv) => inv.paymentStatus === "PAID")
    .reduce((sum, inv) => sum + inv.grandTotal, 0);
  const totalPending = totalInvoiced - totalPaid;
  const overdueCount = invoices.filter((inv) => {
    const isUnpaid = inv.paymentStatus !== "PAID";
    const isPassedDue = new Date(inv.dueDate) < new Date();
    return isUnpaid && isPassedDue && inv.status !== "CANCELLED";
  }).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 select-none">
        <div>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-slate-100 tracking-tight">
            Invoices
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Create, manage, duplicate, and track invoice statuses and billing history.
          </p>
        </div>
        <Link href="/admin/invoices/create">
          <Button variant="indigo" size="sm" className="gap-1.5 h-10">
            <Plus size={15} />
            <span>Create Invoice</span>
          </Button>
        </Link>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-[#111827]/40 border-[#1E293B] p-4 flex items-center gap-4 hover:border-[#2563EB]/40 transition duration-300">
          <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/25 flex items-center justify-center text-blue-400">
            <DollarSign size={20} />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold tracking-wider text-slate-500">Total Billed</p>
            <p className="text-lg font-bold text-slate-100 font-mono mt-0.5">AED {totalInvoiced.toLocaleString()}</p>
          </div>
        </Card>

        <Card className="bg-[#111827]/40 border-[#1E293B] p-4 flex items-center gap-4 hover:border-[#2563EB]/40 transition duration-300">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400">
            <Check size={20} />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold tracking-wider text-slate-500">Collected</p>
            <p className="text-lg font-bold text-slate-100 font-mono mt-0.5">AED {totalPaid.toLocaleString()}</p>
          </div>
        </Card>

        <Card className="bg-[#111827]/40 border-[#1E293B] p-4 flex items-center gap-4 hover:border-[#2563EB]/40 transition duration-300">
          <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-amber-400">
            <Calendar size={20} />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold tracking-wider text-slate-500">Outstanding</p>
            <p className="text-lg font-bold text-slate-100 font-mono mt-0.5">AED {totalPending.toLocaleString()}</p>
          </div>
        </Card>

        <Card className="bg-[#111827]/40 border-[#1E293B] p-4 flex items-center gap-4 hover:border-[#2563EB]/40 transition duration-300">
          <div className="w-10 h-10 rounded-lg bg-rose-500/10 border border-rose-500/25 flex items-center justify-center text-rose-400">
            <CreditCard size={20} />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold tracking-wider text-slate-500">Overdue Invoices</p>
            <p className="text-lg font-bold text-slate-100 font-mono mt-0.5">{overdueCount} Invoices</p>
          </div>
        </Card>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 bg-[#111827]/20 border border-[#1E293B] p-3.5 rounded-xl">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search invoice number, client or project..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#0B1120]/75 border border-[#1E293B] rounded-lg pl-10 pr-4 py-2 text-xs text-slate-300 placeholder-slate-500 focus:outline-none focus:border-[#2563EB] transition-all duration-150"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-[#0B1120]/75 border border-[#1E293B] rounded-lg px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-[#2563EB] transition-all duration-150"
        >
          <option value="ALL">All Statuses</option>
          <option value="DRAFT">Draft</option>
          <option value="SENT">Sent</option>
          <option value="PAID">Paid</option>
          <option value="OVERDUE">Overdue</option>
          <option value="UNPAID">Unpaid</option>
          <option value="PARTIALLY_PAID">Partially Paid</option>
        </select>
      </div>

      {/* Table view */}
      {loading ? (
        <div className="p-12 text-center text-slate-500 select-none">
          Loading invoice registry...
        </div>
      ) : (
        <>
          {/* Desktop view */}
          <div className="hidden md:block overflow-hidden rounded-xl border border-[#1E293B] bg-[#111827]/40 backdrop-blur-sm shadow-xl shadow-black/10">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-[#1E293B] bg-[#111827]/70 text-xs font-semibold uppercase tracking-wider text-slate-400 select-none">
                  <th className="py-4 px-5 font-semibold">Invoice No</th>
                  <th className="py-4 px-5 font-semibold">Client / Project</th>
                  <th className="py-4 px-5 font-semibold">Dates</th>
                  <th className="py-4 px-5 font-semibold">Amount</th>
                  <th className="py-4 px-5 font-semibold">Status</th>
                  <th className="py-4 px-5 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1E293B]/50 text-sm">
                {filteredInvoices.map((inv) => {
                  const isPassedDue = new Date(inv.dueDate) < new Date() && inv.paymentStatus !== "PAID" && inv.status !== "CANCELLED";
                  return (
                    <tr key={inv.id} className="hover:bg-[#1E293B]/20 transition-colors duration-150">
                      <td className="py-3 px-5 font-mono font-bold text-blue-400">{inv.invoiceNumber}</td>
                      <td className="py-3 px-5">
                        <div className="font-semibold text-slate-200">{inv.client.company}</div>
                        <div className="text-[11px] text-slate-500 mt-0.5">{inv.project?.projectName || "No Project Link"}</div>
                      </td>
                      <td className="py-3 px-5">
                        <div className="text-slate-300">Issued: {new Date(inv.invoiceDate).toLocaleDateString()}</div>
                        <div className={`text-xs mt-1 ${isPassedDue ? "text-rose-400 font-semibold" : "text-slate-500"}`}>
                          Due: {new Date(inv.dueDate).toLocaleDateString()} {isPassedDue && "(Overdue)"}
                        </div>
                      </td>
                      <td className="py-3 px-5 font-mono font-bold text-slate-200">
                        AED {inv.grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                      <td className="py-3 px-5 space-y-1">
                        <div>
                          <Badge variant={
                            inv.status === "PAID" ? "green" :
                            inv.status === "SENT" ? "blue" :
                            inv.status === "CANCELLED" ? "red" : "default"
                          }>
                            {inv.status}
                          </Badge>
                        </div>
                        {inv.paymentStatus !== inv.status && (
                          <div>
                            <Badge variant={inv.paymentStatus === "PAID" ? "green" : inv.paymentStatus === "PARTIALLY_PAID" ? "yellow" : "default"}>
                              {inv.paymentStatus.replaceAll("_", " ")}
                            </Badge>
                          </div>
                        )}
                      </td>
                      <td className="py-3 px-5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link href={`/admin/invoices/${inv.id}/preview`}>
                            <Button variant="secondary" size="sm" className="h-8 w-8" title="Preview / PDF">
                              <Eye size={13} />
                            </Button>
                          </Link>
                          <Link href={`/admin/invoices/${inv.id}/edit`}>
                            <Button variant="secondary" size="sm" className="h-8 w-8 text-blue-400" title="Edit">
                              <Edit2 size={13} />
                            </Button>
                          </Link>
                          <Button
                            variant="secondary"
                            size="sm"
                            className="h-8 w-8 text-indigo-400"
                            onClick={() => handleSendInvoice(inv.id)}
                            disabled={sendingId === inv.id}
                            title="Email Invoice"
                          >
                            {sendingId === inv.id ? <Loader2 size={13} className="animate-spin" /> : <Mail size={13} />}
                          </Button>
                          <Button variant="secondary" size="sm" className="h-8 w-8 text-indigo-400" onClick={() => handleDuplicate(inv.id)} title="Duplicate">
                            <Copy size={13} />
                          </Button>
                          {inv.paymentStatus !== "PAID" && inv.status !== "CANCELLED" && (
                            <Button variant="secondary" size="sm" className="h-8 w-8 text-emerald-400" onClick={() => openPaymentModal(inv)} title="Record Payment">
                              <CreditCard size={13} />
                            </Button>
                          )}
                          <Button variant="secondary" size="sm" className="h-8 w-8 text-rose-400" onClick={() => handleDelete(inv.id, inv.invoiceNumber)} title="Delete">
                            <Trash2 size={13} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {filteredInvoices.length === 0 && (
              <div className="p-12 text-center text-slate-500 font-medium select-none">
                No invoices match current search filters.
              </div>
            )}
          </div>

          {/* Mobile Card list */}
          <div className="block md:hidden space-y-4">
            {filteredInvoices.map((inv) => {
              const isPassedDue = new Date(inv.dueDate) < new Date() && inv.paymentStatus !== "PAID" && inv.status !== "CANCELLED";
              return (
                <Card key={inv.id} className="border border-[#1E293B] bg-[#111827]/50 p-4 rounded-xl flex flex-col gap-3">
                  <div className="flex justify-between items-center border-b border-[#1E293B]/60 pb-2">
                    <span className="font-mono font-bold text-blue-400 text-sm">{inv.invoiceNumber}</span>
                    <Badge variant={inv.status === "PAID" ? "green" : inv.status === "SENT" ? "blue" : "default"}>
                      {inv.status}
                    </Badge>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-200 text-sm">{inv.client.company}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">{inv.project?.projectName || "No linked project"}</p>
                  </div>
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>Issued: {new Date(inv.invoiceDate).toLocaleDateString()}</span>
                    <span className={isPassedDue ? "text-rose-400 font-semibold" : ""}>
                      Due: {new Date(inv.dueDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-t border-[#1E293B]/40 pt-2.5">
                    <span className="font-mono font-bold text-slate-200">AED {inv.grandTotal.toLocaleString()}</span>
                    <div className="flex items-center gap-1.5">
                      <Link href={`/admin/invoices/${inv.id}/preview`}>
                        <Button variant="secondary" size="sm" className="h-7 w-7">
                          <Eye size={12} />
                        </Button>
                      </Link>
                      <Link href={`/admin/invoices/${inv.id}/edit`}>
                        <Button variant="secondary" size="sm" className="h-7 w-7 text-blue-400">
                          <Edit2 size={12} />
                        </Button>
                      </Link>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="h-7 w-7 text-indigo-400"
                        onClick={() => handleSendInvoice(inv.id)}
                        disabled={sendingId === inv.id}
                        title="Email Invoice"
                      >
                        {sendingId === inv.id ? <Loader2 size={12} className="animate-spin" /> : <Mail size={12} />}
                      </Button>
                      {inv.paymentStatus !== "PAID" && inv.status !== "CANCELLED" && (
                        <Button variant="secondary" size="sm" className="h-7 w-7 text-emerald-400" onClick={() => openPaymentModal(inv)}>
                          <CreditCard size={12} />
                        </Button>
                      )}
                      <Button variant="secondary" size="sm" className="h-7 w-7 text-rose-400" onClick={() => handleDelete(inv.id, inv.invoiceNumber)}>
                        <Trash2 size={12} />
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
            {filteredInvoices.length === 0 && (
              <div className="p-8 text-center text-slate-500 select-none">
                No invoices found.
              </div>
            )}
          </div>
        </>
      )}

      {/* Record Payment Modal */}
      {paymentModalOpen && selectedInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-[#111827] border border-[#1E293B] rounded-2xl p-6 relative shadow-2xl">
            <button
              onClick={() => setPaymentModalOpen(false)}
              className="absolute right-4 top-4 p-1 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-[#1E293B]"
            >
              <X size={18} />
            </button>
            <div className="flex items-center gap-3 mb-6 select-none">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <CreditCard size={20} />
              </div>
              <div>
                <h3 className="font-display font-bold text-slate-100 text-base">Record Payment</h3>
                <p className="text-[10px] text-slate-500 mt-0.5">Invoice: {selectedInvoice.invoiceNumber}</p>
              </div>
            </div>

            <form onSubmit={handleRecordPayment} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Payment Amount (AED)
                </label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  className="w-full bg-[#0B1120]/75 border border-[#1E293B] rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-[#2563EB]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Payment Method
                </label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full bg-[#0B1120]/75 border border-[#1E293B] rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-[#2563EB]"
                >
                  <option value="BANK_TRANSFER">Bank Transfer</option>
                  <option value="CASH">Cash</option>
                  <option value="STRIPE">Stripe Card Payment</option>
                  <option value="CHEQUE">Cheque</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Transaction ID / Chq No (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. TXN-1928475"
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                  className="w-full bg-[#0B1120]/75 border border-[#1E293B] rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-[#2563EB]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Reference / Memo (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Received by transfer to HSBC account"
                  value={paymentRef}
                  onChange={(e) => setPaymentRef(e.target.value)}
                  className="w-full bg-[#0B1120]/75 border border-[#1E293B] rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-[#2563EB]"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  type="button"
                  variant="secondary"
                  className="flex-1 text-xs"
                  onClick={() => setPaymentModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={recordingPayment}
                  variant="indigo"
                  className="flex-1 text-xs"
                >
                  {recordingPayment ? "Saving..." : "Record Payment"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
