"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Plus, Trash2, Check, Loader2, ChevronUp, ChevronDown, Copy } from "lucide-react";
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
  projects: Project[];
}

interface ItemInput {
  description: string;
  quantity: number;
  unitPrice: number;
}

type Props = {
  params: Promise<{ id: string }>;
};

export default function EditInvoicePage({ params }: Props) {
  const { toast } = useToast();
  const { id } = use(params);
  const router = useRouter();

  // Data states
  const [clients, setClients] = useState<Client[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [saving, setSaving] = useState(false);

  // Form states
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

  // Dynamic items list
  const [items, setItems] = useState<ItemInput[]>([]);

  async function loadInvoiceAndClients() {
    try {
      // 1. Fetch clients list
      const resClients = await fetch("/api/admin/clients");
      const dataClients = await resClients.json();
      if (dataClients.success) {
        setClients(dataClients.clients);
      }

      // 2. Fetch specific invoice
      const resInvoice = await fetch(`/api/admin/invoices/${id}`);
      const dataInvoice = await resInvoice.json();
      if (dataInvoice.success) {
        const inv = dataInvoice.invoice;
        setInvoiceNumber(inv.invoiceNumber);
        setInvoiceDate(new Date(inv.invoiceDate).toISOString().split("T")[0]);
        setDueDate(new Date(inv.dueDate).toISOString().split("T")[0]);
        setSelectedClientId(inv.clientId);
        setSelectedProjectId(inv.projectId || "");
        setStatus(inv.status);
        setVatRate(inv.vatRate);
        setDiscount(inv.discount);
        setNotes(inv.notes || "");
        setAuthorizedBy(inv.authorizedBy);
        setFounderName(inv.founderName);
        setDesignation(inv.designation);
        setItems(inv.items.map((item: any) => ({
          description: item.description,
          quantity: item.quantity,
          unitPrice: item.unitPrice
        })));
      } else {
        toast.error("Invoice not found");
        router.push("/admin/invoices");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingData(false);
    }
  }

  useEffect(() => {
    loadInvoiceAndClients();
  }, [id]);

  // Handle client selection
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

  // Live calculations
  const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
  const vatAmount = subtotal * (vatRate / 100);
  const grandTotal = subtotal + vatAmount - discount;

  const activeClient = clients.find(c => c.id === selectedClientId);
  const clientProjects = activeClient ? activeClient.projects : [];

  // Form submission
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedClientId) {
      toast.error("Please select a client to bill.");
      return;
    }
    if (items.some(it => !it.description.trim())) {
      toast.error("Please fill in descriptions for all invoice item rows.");
      return;
    }
    setSaving(true);

    try {
      const res = await fetch(`/api/admin/invoices/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          invoiceNumber,
          invoiceDate,
          dueDate,
          clientId: selectedClientId,
          projectId: selectedProjectId || null,
          status,
          vatRate,
          discount,
          notes,
          authorizedBy,
          founderName,
          designation,
          items,
        }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Invoice updated successfully.");
        router.push("/admin/invoices");
        router.refresh();
      } else {
        toast.error(data.message || "Failed to update invoice");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while updating the invoice");
    } finally {
      setSaving(false);
    }
  }

  if (loadingData) {
    return (
      <div className="p-12 text-center text-slate-500 select-none">
        Loading invoice details...
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Back Link */}
      <Link
        href="/admin/invoices"
        className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 transition-colors select-none"
      >
        <ArrowLeft size={14} /> Back to Invoices
      </Link>

      {/* Title */}
      <div className="select-none">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-slate-100 tracking-tight">
          Edit Invoice: {invoiceNumber}
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Modify invoice contents, adjust line items, log status, and recalculate totals.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="bg-[#111827]/40 border-[#1E293B] p-6 rounded-xl space-y-6">
          
          {/* Metadata Section */}
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
              </select>
            </div>

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
          </div>

          {/* Status Selection */}
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
                      placeholder="Item description (e.g. Core system architecture development)"
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

          {/* Totals computations */}
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

          {/* Signatures */}
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

        {/* Action button panel */}
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
                <Loader2 size={15} className="animate-spin" /> Saving Changes...
              </>
            ) : (
              <>
                <Check size={15} /> Save Changes
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
