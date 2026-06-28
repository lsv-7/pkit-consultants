"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Plus, Trash2, FileText, Check, Loader2, ChevronUp, ChevronDown, Copy } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/ToastProvider";
import { COMPANY } from "@/lib/company";

interface Project {
  id: string;
  projectName: string;
}

interface Client {
  id: string;
  company: string;
  contactPerson: string;
  email: string;
  phone: string;
  address?: string | null;
  projects: Project[];
}

interface ItemInput {
  description: string;
  quantity: number;
  unitPrice: number;
}

export default function CreateInvoicePage() {
  const { toast } = useToast();
  const router = useRouter();
  
  // Data loading state
  const [clients, setClients] = useState<Client[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [saving, setSaving] = useState(false);

  // Form state
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [invoiceDate, setInvoiceDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [selectedClientId, setSelectedClientId] = useState("");
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [status, setStatus] = useState("DRAFT");
  const [vatRate, setVatRate] = useState(5.0);
  const [discount, setDiscount] = useState(0.0);
  const [notes, setNotes] = useState("");
  
  const [authorizedBy, setAuthorizedBy] = useState("Authorized By");
  const [founderName, setFounderName] = useState<string>(COMPANY.ceoName);
  const [designation, setDesignation] = useState<string>(COMPANY.ceoDesignation);

  // Offline/manual client details state
  const [manualCompany, setManualCompany] = useState("");
  const [manualContact, setManualContact] = useState("");
  const [manualEmail, setManualEmail] = useState("");
  const [manualPhone, setManualPhone] = useState("");
  const [manualAddress, setManualAddress] = useState("");
  const [manualProjectName, setManualProjectName] = useState("");

  // Dynamic invoice items
  const [items, setItems] = useState<ItemInput[]>([
    { description: "", quantity: 1, unitPrice: 0 }
  ]);

  async function loadFormDependencies() {
    try {
      // 1. Load clients and nested projects
      const resClients = await fetch("/api/admin/clients");
      const dataClients = await resClients.json();
      if (dataClients.success) {
        setClients(dataClients.clients);
      }

      // 2. Load invoice list to generate next invoice code recommendation
      const resInvoices = await fetch("/api/admin/invoices");
      const dataInvoices = await resInvoices.json();
      if (dataInvoices.success && dataInvoices.invoices.length > 0) {
        const lastInvoice = dataInvoices.invoices[0]; // sorted desc
        const match = lastInvoice.invoiceNumber.match(/INV-(\d+)-(\d+)/);
        if (match) {
          const year = match[1];
          const seq = parseInt(match[2]);
          const currentYear = new Date().getFullYear().toString();
          const nextSeq = year === currentYear ? seq + 1 : 1;
          setInvoiceNumber(`INV-${currentYear}-${String(nextSeq).padStart(4, "0")}`);
        } else {
          setInvoiceNumber(`INV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`);
        }
      } else {
        setInvoiceNumber(`INV-${new Date().getFullYear()}-0001`);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingData(false);
    }
  }

  useEffect(() => {
    // Set default dates
    const today = new Date();
    setInvoiceDate(today.toISOString().split("T")[0]);
    
    const fortnight = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000);
    setDueDate(fortnight.toISOString().split("T")[0]);

    loadFormDependencies();
  }, []);

  // Handle client change
  const handleClientChange = (clientId: string) => {
    setSelectedClientId(clientId);
    setSelectedProjectId(""); // reset project link
  };

  // Add item row
  const addItemRow = () => {
    setItems([...items, { description: "", quantity: 1, unitPrice: 0 }]);
  };

  // Remove item row
  const removeItemRow = (idx: number) => {
    if (items.length === 1) return;
    setItems(items.filter((_, i) => i !== idx));
  };

  // Duplicate item row
  const duplicateItemRow = (idx: number) => {
    const updated = [...items];
    const row = updated[idx];
    updated.splice(idx + 1, 0, {
      description: row.description,
      quantity: row.quantity,
      unitPrice: row.unitPrice,
    });
    setItems(updated);
  };

  // Move item row (reorder)
  const moveItemRow = (idx: number, direction: "up" | "down") => {
    if (direction === "up" && idx === 0) return;
    if (direction === "down" && idx === items.length - 1) return;
    const updated = [...items];
    const targetIdx = direction === "up" ? idx - 1 : idx + 1;
    const temp = updated[idx];
    updated[idx] = updated[targetIdx];
    updated[targetIdx] = temp;
    setItems(updated);
  };

  // Change item details
  const handleItemChange = (idx: number, field: keyof ItemInput, value: any) => {
    const updated = [...items];
    if (field === "description") {
      updated[idx].description = value;
    } else {
      updated[idx][field] = parseFloat(value) || 0;
    }
    setItems(updated);
  };

  // Calculate live totals
  const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
  const vatAmount = subtotal * (vatRate / 100);
  const grandTotal = subtotal + vatAmount - discount;

  // Selected client's projects
  const activeClient = clients.find(c => c.id === selectedClientId);
  const clientProjects = activeClient ? activeClient.projects : [];

  // Form submission
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedClientId) {
      toast.error("Please select a client or enter details manually.");
      return;
    }
    if (selectedClientId === "manual") {
      if (!manualCompany.trim() || !manualContact.trim() || !manualEmail.trim() || !manualPhone.trim()) {
        toast.error("Please fill in all manual client contact fields.");
        return;
      }
    }
    if (items.some(it => !it.description.trim())) {
      toast.error("Please fill in descriptions for all invoice item rows.");
      return;
    }
    setSaving(true);

    try {
      const res = await fetch("/api/admin/invoices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          invoiceNumber,
          invoiceDate,
          dueDate,
          clientId: selectedClientId,
          projectId: selectedClientId === "manual" ? null : (selectedProjectId || null),
          status,
          vatRate,
          discount,
          notes,
          authorizedBy,
          founderName,
          designation,
          items,
          manualClientData: selectedClientId === "manual" ? {
            company: manualCompany,
            contactPerson: manualContact,
            email: manualEmail,
            phone: manualPhone,
            address: manualAddress,
            projectName: manualProjectName,
          } : null,
        }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Invoice created successfully.");
        router.push("/admin/invoices");
        router.refresh();
      } else {
        toast.error(data.message || "Failed to create invoice");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while saving the invoice");
    } finally {
      setSaving(false);
    }
  }

  if (loadingData) {
    return (
      <div className="p-12 text-center text-slate-500 select-none">
        Loading invoice builder database dependencies...
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Back link */}
      <Link
        href="/admin/invoices"
        className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 transition-colors select-none"
      >
        <ArrowLeft size={14} /> Back to Invoices
      </Link>

      {/* Title */}
      <div className="select-none">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-slate-100 tracking-tight">
          New Invoice
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Prepare a new professional invoice with automated calculations and watermark branding.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="bg-[#111827]/40 border-[#1E293B] p-6 rounded-xl space-y-6">
          
          {/* Metadata section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                Invoice Number
              </label>
              <input
                type="text"
                required
                value={invoiceNumber}
                onChange={(e) => setInvoiceNumber(e.target.value)}
                placeholder="e.g. INV-2026-0001"
                className="w-full bg-[#0B1120]/75 border border-[#1E293B] rounded-lg px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-[#2563EB] font-mono font-bold"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                Invoice Date
              </label>
              <input
                type="date"
                required
                value={invoiceDate}
                onChange={(e) => setInvoiceDate(e.target.value)}
                className="w-full bg-[#0B1120]/75 border border-[#1E293B] rounded-lg px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-[#2563EB]"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                Due Date
              </label>
              <input
                type="date"
                required
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full bg-[#0B1120]/75 border border-[#1E293B] rounded-lg px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-[#2563EB]"
              />
            </div>
          </div>

          {/* Client & Project Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 border-t border-[#1E293B]/60 pt-5">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                Bill To (Client)
              </label>
              <select
                required
                value={selectedClientId}
                onChange={(e) => handleClientChange(e.target.value)}
                className="w-full bg-[#0B1120]/75 border border-[#1E293B] rounded-lg px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-[#2563EB]"
              >
                <option value="">Select a Client...</option>
                {clients.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.company} ({c.contactPerson})
                  </option>
                ))}
                <option value="manual">+ Enter Client Details Manually (Offline)</option>
              </select>
            </div>

            {selectedClientId !== "manual" && (
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Linked Project (Optional)
                </label>
                <select
                  value={selectedProjectId}
                  disabled={!selectedClientId}
                  onChange={(e) => setSelectedProjectId(e.target.value)}
                  className="w-full bg-[#0B1120]/75 border border-[#1E293B] rounded-lg px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-[#2563EB] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option value="">No Project Link</option>
                  {clientProjects.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.projectName}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Render Manual Client Form Fields */}
          {selectedClientId === "manual" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 border-t border-[#1E293B]/60 pt-5 bg-[#0B1120]/10 p-4 rounded-xl border border-[#1E293B]/30">
              <div className="col-span-1 sm:col-span-2">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">Walk-in / Manual Client Details</h4>
                <p className="text-[11px] text-slate-400">A new client record will be auto-created in the database upon invoice generation.</p>
              </div>
              
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Company Name (Required)</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Apex Technologies FZ-LLC"
                  value={manualCompany}
                  onChange={(e) => setManualCompany(e.target.value)}
                  className="w-full bg-[#0B1120]/75 border border-[#1E293B] rounded-lg px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-[#2563EB]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Contact Person (Required)</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Salim Al Mansoori"
                  value={manualContact}
                  onChange={(e) => setManualContact(e.target.value)}
                  className="w-full bg-[#0B1120]/75 border border-[#1E293B] rounded-lg px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-[#2563EB]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Email Address (Required)</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. billing@apextech.ae"
                  value={manualEmail}
                  onChange={(e) => setManualEmail(e.target.value)}
                  className="w-full bg-[#0B1120]/75 border border-[#1E293B] rounded-lg px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-[#2563EB]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Phone Number (Required)</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. +971 50 234 5678"
                  value={manualPhone}
                  onChange={(e) => setManualPhone(e.target.value)}
                  className="w-full bg-[#0B1120]/75 border border-[#1E293B] rounded-lg px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-[#2563EB]"
                />
              </div>

              <div className="col-span-1 sm:col-span-2">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Office Address (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Office 101, Sheikh Zayed Road, Dubai"
                  value={manualAddress}
                  onChange={(e) => setManualAddress(e.target.value)}
                  className="w-full bg-[#0B1120]/75 border border-[#1E293B] rounded-lg px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-[#2563EB]"
                />
              </div>

              <div className="col-span-1 sm:col-span-2">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Project Name (Optional - Auto-creates project record)</label>
                <input
                  type="text"
                  placeholder="e.g. Cloud Infrastructure Setup"
                  value={manualProjectName}
                  onChange={(e) => setManualProjectName(e.target.value)}
                  className="w-full bg-[#0B1120]/75 border border-[#1E293B] rounded-lg px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-[#2563EB]"
                />
              </div>
            </div>
          )}

          {/* Status selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 border-t border-[#1E293B]/60 pt-5">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                Invoice Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full bg-[#0B1120]/75 border border-[#1E293B] rounded-lg px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-[#2563EB]"
              >
                <option value="DRAFT">Draft</option>
                <option value="SENT">Sent (Awaiting Payment)</option>
                <option value="PAID">Paid</option>
                <option value="CANCELLED">Cancelled</option>
                <option value="OVERDUE">Overdue</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                VAT Rate (%)
              </label>
              <input
                type="number"
                step="0.1"
                required
                value={vatRate}
                onChange={(e) => setVatRate(parseFloat(e.target.value) || 0)}
                className="w-full bg-[#0B1120]/75 border border-[#1E293B] rounded-lg px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-[#2563EB]"
              />
            </div>
          </div>

          {/* Dynamic line items */}
          <div className="border-t border-[#1E293B]/60 pt-5 space-y-4">
            <div className="flex justify-between items-center select-none">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Invoice Items</h3>
              <Button type="button" variant="secondary" size="sm" onClick={addItemRow} className="gap-1 h-8">
                <Plus size={13} />
                <span>Add Item</span>
              </Button>
            </div>

            <div className="space-y-3">
              {items.map((item, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row gap-3 items-start sm:items-center bg-[#0B1120]/20 border border-[#1E293B]/60 p-3 rounded-lg relative">
                  <div className="flex-1 w-full">
                    <input
                      type="text"
                      required
                      placeholder="Item description (e.g. Phase 2 frontend deliverables)"
                      value={item.description}
                      onChange={(e) => handleItemChange(idx, "description", e.target.value)}
                      className="w-full bg-[#0B1120]/75 border border-[#1E293B] rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-[#2563EB]"
                    />
                  </div>
                  <div className="w-full sm:w-20">
                    <input
                      type="number"
                      required
                      min="0.01"
                      step="any"
                      placeholder="Qty"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(idx, "quantity", e.target.value)}
                      className="w-full bg-[#0B1120]/75 border border-[#1E293B] rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-[#2563EB] text-center"
                    />
                  </div>
                  <div className="w-full sm:w-32">
                    <input
                      type="number"
                      required
                      min="0"
                      step="any"
                      placeholder="Unit Price"
                      value={item.unitPrice}
                      onChange={(e) => handleItemChange(idx, "unitPrice", e.target.value)}
                      className="w-full bg-[#0B1120]/75 border border-[#1E293B] rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-[#2563EB] text-right"
                    />
                  </div>
                  <div className="w-full sm:w-28 text-right font-mono font-bold text-slate-300 text-xs px-2 select-none">
                    AED {(item.quantity * item.unitPrice).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </div>
                  <div className="flex gap-1 items-center select-none">
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => moveItemRow(idx, "up")}
                      title="Move Up"
                      className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-[#1E293B] rounded-lg disabled:opacity-20 disabled:cursor-not-allowed"
                    >
                      <ChevronUp size={14} />
                    </button>
                    <button
                      type="button"
                      disabled={idx === items.length - 1}
                      onClick={() => moveItemRow(idx, "down")}
                      title="Move Down"
                      className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-[#1E293B] rounded-lg disabled:opacity-20 disabled:cursor-not-allowed"
                    >
                      <ChevronDown size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => duplicateItemRow(idx)}
                      title="Duplicate Row"
                      className="p-1.5 text-blue-400 hover:text-blue-300 hover:bg-[#1E293B] rounded-lg"
                    >
                      <Copy size={14} />
                    </button>
                    <button
                      type="button"
                      disabled={items.length === 1}
                      onClick={() => removeItemRow(idx)}
                      title="Delete Item"
                      className="p-1.5 text-rose-500 hover:bg-[#1E293B] rounded-lg disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary calculations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-[#1E293B]/60 pt-5">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                Invoice Notes & Payment Terms (Optional)
              </label>
              <textarea
                rows={4}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Specify payment bank details, milestone timelines, etc..."
                className="w-full bg-[#0B1120]/75 border border-[#1E293B] rounded-lg px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-[#2563EB] resize-none"
              />
            </div>

            <div className="bg-[#0B1120]/40 border border-[#1E293B] rounded-xl p-4.5 space-y-3 font-medium select-none">
              <div className="flex justify-between text-xs text-slate-400">
                <span>Subtotal:</span>
                <span className="font-mono text-slate-200">AED {subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between text-xs text-slate-400">
                <span>VAT ({vatRate}%):</span>
                <span className="font-mono text-slate-200">AED {vatAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between items-center text-xs text-slate-400">
                <span>Discount (AED):</span>
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={discount}
                  onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
                  className="w-28 bg-[#0B1120]/75 border border-[#1E293B] rounded-lg px-2.5 py-1 text-right text-xs text-slate-200 focus:outline-none focus:border-[#2563EB]"
                />
              </div>
              <div className="flex justify-between text-sm font-bold border-t border-[#1E293B]/40 pt-2 text-slate-100">
                <span>Grand Total:</span>
                <span className="font-mono text-blue-400 text-base">AED {grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              </div>
            </div>
          </div>

          {/* Authorized Signatory Details */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 border-t border-[#1E293B]/60 pt-5">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                Signatory Statement
              </label>
              <input
                type="text"
                required
                value={authorizedBy}
                onChange={(e) => setAuthorizedBy(e.target.value)}
                className="w-full bg-[#0B1120]/75 border border-[#1E293B] rounded-lg px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-[#2563EB]"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                Signatory Name
              </label>
              <input
                type="text"
                required
                value={founderName}
                onChange={(e) => setFounderName(e.target.value)}
                className="w-full bg-[#0B1120]/75 border border-[#1E293B] rounded-lg px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-[#2563EB]"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                Signatory Designation
              </label>
              <input
                type="text"
                required
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                className="w-full bg-[#0B1120]/75 border border-[#1E293B] rounded-lg px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-[#2563EB]"
              />
            </div>
          </div>

        </Card>

        {/* Buttons */}
        <div className="flex gap-4">
          <Link href="/admin/invoices" className="flex-1">
            <Button type="button" variant="secondary" className="w-full py-2.5 text-xs">
              Cancel
            </Button>
          </Link>
          <Button
            type="submit"
            disabled={saving}
            variant="indigo"
            className="flex-1 py-2.5 text-xs gap-1.5"
          >
            {saving ? (
              <>
                <Loader2 size={15} className="animate-spin" /> Saving Invoice...
              </>
            ) : (
              <>
                <Check size={15} /> Save Invoice
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
