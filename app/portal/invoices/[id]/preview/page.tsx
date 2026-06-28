"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Printer, Download, Mail, Phone, Globe, MapPin, CreditCard, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/ToastProvider";
import { COMPANY, getWebsiteHost } from "@/lib/company";

interface InvoiceItem {
  id: string;
  serialNumber: number;
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
}

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
  amountInWords: string;
  notes?: string | null;
  founderName?: string | null;
  designation?: string | null;
  authorizedBy?: string | null;
  client: {
    company: string;
    contactPerson: string;
    email: string;
    phone: string;
    address?: string | null;
  };
  project?: {
    projectName: string;
  } | null;
  items: InvoiceItem[];
}

type Props = {
  params: Promise<{ id: string }>;
};

export default function ClientInvoicePreviewPage({ params }: Props) {
  const { id } = use(params);
  const router = useRouter();
  const { toast } = useToast();
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const [resInvoiceList, resSettings] = await Promise.all([
          fetch(`/api/portal/invoices`),
          fetch("/api/settings")
        ]);
        
        if (resInvoiceList.ok) {
          const dataInvoiceList = await resInvoiceList.json();
          if (dataInvoiceList.success) {
            const matched = dataInvoiceList.invoices.find((inv: any) => inv.id === id);
            if (matched) {
              setInvoice(matched);
            }
          }
        }
        if (resSettings.ok) {
          const dataSettings = await resSettings.json();
          setSettings(dataSettings);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [id]);

  const handlePrint = () => {
    window.print();
  };

  const handleExportPDF = () => {
    window.location.href = `/api/portal/invoices/${id}/pdf`;
  };

  async function handlePayNow() {
    if (!invoice) return;
    if (!confirm(`Settle invoice ${invoice.invoiceNumber} via Stripe integration?`)) return;
    setPaying(true);

    try {
      const res = await fetch(`/api/portal/invoices/${invoice.id}/pay`, {
        method: "POST",
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Payment simulation successful.");
        // Refresh invoice details
        const resReload = await fetch(`/api/portal/invoices`);
        const dataReload = await resReload.json();
        if (dataReload.success) {
          const matched = dataReload.invoices.find((inv: any) => inv.id === id);
          if (matched) setInvoice(matched);
        }
        router.refresh();
      } else {
        toast.error(data.message || "Failed to process card charge");
      }
    } catch {
      toast.error("An unexpected error occurred during payment processing");
    } finally {
      setPaying(false);
    }
  }

  if (loading) {
    return (
      <div className="p-12 text-center text-slate-500 select-none">
        Loading invoice details...
      </div>
    );
  }

  if (!invoice) {
    return (
      <div className="p-12 text-center text-rose-500 select-none">
        Invoice not found or unauthorized to view.
      </div>
    );
  }

  const isUnpaid = invoice.paymentStatus !== "PAID";
  const logoUrl = settings?.logoUrl || COMPANY.logoUrl;
  const companyName = settings?.companyName || COMPANY.name;
  const tagline = settings?.tagline || COMPANY.tagline;
  const signatoryStatement = invoice.authorizedBy || "Authorized By";

  return (
    <>
      {/* Load invoice custom layout css */}
      <link rel="stylesheet" href="/invoice.css" />

      {/* Screen Toolbar */}
      <div className="no-print max-w-[210mm] mx-auto mb-6 flex justify-between items-center bg-[#060F24]/60 border border-[#0E204A] p-4 rounded-xl select-none">
        <Link href="/portal/invoices">
          <Button variant="secondary" size="sm" className="gap-1.5 h-9">
            <ArrowLeft size={14} />
            <span>Invoices</span>
          </Button>
        </Link>
        <div className="flex gap-2">
          {isUnpaid && invoice.status !== "CANCELLED" && (
            <Button variant="indigo" size="sm" disabled={paying} onClick={handlePayNow} className="gap-1.5 h-9">
              {paying ? <Loader2 size={14} className="animate-spin" /> : <CreditCard size={14} />}
              <span>Pay Now</span>
            </Button>
          )}
          <Button variant="secondary" size="sm" onClick={handleExportPDF} className="gap-1.5 h-9">
            <Download size={14} />
            <span>Export PDF</span>
          </Button>
          <Button variant="secondary" size="sm" onClick={handlePrint} className="gap-1.5 h-9">
            <Printer size={14} />
            <span>Print Invoice</span>
          </Button>
        </div>
      </div>

      {/* Printable Invoice Container */}
      <div className="invoice-body">
        <div className="invoice-container">
          {/* Faded Watermark background */}
          <div className="invoice-watermark" style={{ '--watermark-text': `"${companyName.toUpperCase()}"` } as React.CSSProperties} />

          <div className="invoice-content">
            
            {/* Header Block */}
            <div className="invoice-header-row">
              <div className="invoice-brand-block">
                <div className="invoice-logo-title-row">
                  <img src={logoUrl} alt="PKIT logo" className="invoice-logo-img" />
                  <span className="invoice-company-name">{companyName.toUpperCase()}</span>
                </div>
              </div>
              <div className="invoice-header-company-info">
                <span className="font-bold">{companyName}</span><br />
                Deira, Dubai<br />
                United Arab Emirates
              </div>
            </div>

            {/* Tagline Line */}
            <div className="invoice-tagline-container">
              <div className="invoice-tagline-line"></div>
              <div className="invoice-tagline-text">{tagline}</div>
            </div>

            {/* Centered INVOICE Badge */}
            <div className="invoice-badge-container">
              <div className="invoice-badge-line"></div>
              <div className="invoice-badge">INVOICE</div>
            </div>

            {/* Billing & Meta Section */}
            <div className="invoice-billing-section">
              <div className="invoice-bill-to-col">
                <div className="invoice-bill-to-title">Bill To:</div>
                <div className="invoice-bill-to-company">{invoice.client.company}</div>
                <div className="invoice-bill-to-details">
                  {invoice.client.address || "Dubai, United Arab Emirates"}<br />
                  Attn: {invoice.client.contactPerson}<br />
                  Email: {invoice.client.email}<br />
                  Phone: {invoice.client.phone}
                </div>
              </div>
              <div className="invoice-meta-col">
                <table className="invoice-meta-table">
                  <tbody>
                    <tr>
                      <td className="meta-label">Invoice No.</td>
                      <td className="meta-colon">:</td>
                      <td className="meta-value font-mono">{invoice.invoiceNumber}</td>
                    </tr>
                    <tr>
                      <td className="meta-label">Invoice Date</td>
                      <td className="meta-colon">:</td>
                      <td className="meta-value">
                        {new Date(invoice.invoiceDate).toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" })}
                      </td>
                    </tr>
                    <tr>
                      <td className="meta-label">Due Date</td>
                      <td className="meta-colon">:</td>
                      <td className="meta-value">
                        {new Date(invoice.dueDate).toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" })}
                      </td>
                    </tr>
                    <tr>
                      <td className="meta-label">Project</td>
                      <td className="meta-colon">:</td>
                      <td className="meta-value">{invoice.project?.projectName || "General Consulting Services"}</td>
                    </tr>
                    <tr>
                      <td className="meta-label">Status</td>
                      <td className="meta-colon">:</td>
                      <td className={`meta-value font-bold ${
                        invoice.paymentStatus === "PAID" ? "status-paid" : "status-pending"
                      }`}>
                        {invoice.paymentStatus}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Line Items Table */}
            <table className="invoice-table">
              <thead>
                <tr>
                  <th className="sr-no text-center">Sr. No.</th>
                  <th className="desc-col">Description</th>
                  <th className="qty-col text-center">Qty</th>
                  <th className="price-col text-right">Unit Price (AED)</th>
                  <th className="amount-col text-right">Amount (AED)</th>
                </tr>
              </thead>
              <tbody>
                {invoice.items.map((item, idx) => (
                  <tr key={item.id}>
                    <td className="sr-no text-center">{idx + 1}</td>
                    <td className="desc-col">{item.description}</td>
                    <td className="qty-col text-center">{item.quantity}</td>
                    <td className="price-col text-right">
                      {item.unitPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className="amount-col text-right">
                      {item.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Bottom Calculations, Notes & Signatures */}
            <div className="invoice-bottom-section">
              <div className="invoice-bottom-left">
                <div className="invoice-words-block">
                  <div className="invoice-section-title">Amount in Words:</div>
                  <div className="invoice-words-value">{invoice.amountInWords}</div>
                </div>
                
                <div className="invoice-notes-block">
                  <div className="invoice-section-title">Notes:</div>
                  <div className="invoice-notes-text">
                    {invoice.notes ? (
                      <div style={{ whiteSpace: "pre-line" }}>{invoice.notes}</div>
                    ) : (
                      <>
                        Thank you for choosing {companyName}.<br />
                        Payment is due within 7 days from the invoice date.
                      </>
                    )}
                  </div>
                </div>

                <div className="invoice-thankyou-container">
                  <span className="invoice-thankyou-line"></span>
                  <span className="invoice-thankyou-text">Thank You!</span>
                  <span className="invoice-thankyou-line"></span>
                </div>
              </div>

              <div className="invoice-bottom-right">
                <table className="invoice-totals-table">
                  <tbody>
                    <tr>
                      <td className="label-col">Subtotal</td>
                      <td className="colon-col">:</td>
                      <td className="value-col">
                        {invoice.subtotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                    </tr>
                    <tr>
                      <td className="label-col">VAT ({invoice.vatRate}%)</td>
                      <td className="colon-col">:</td>
                      <td className="value-col">
                        {invoice.vatAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                    </tr>
                    <tr>
                      <td className="label-col">Discount</td>
                      <td className="colon-col">:</td>
                      <td className="value-col">
                        {invoice.discount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                    </tr>
                    <tr className="grand-total-row">
                      <td className="label-col">Grand Total</td>
                      <td className="colon-col">:</td>
                      <td className="value-col">
                        AED {invoice.grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                    </tr>
                  </tbody>
                </table>

                <div className="invoice-signature-container">
                  <div className="invoice-signature-title">{signatoryStatement}</div>
                  <div className="invoice-signature-graphic">
                    <img src="/signature.png" alt="Signature" className="invoice-sig-img" />
                  </div>
                  <div className="invoice-sig-line-block">
                    <div className="invoice-sig-name">M. Prasanna Kumar</div>
                    <div className="invoice-sig-title">Founder & Managing Director</div>
                    <div className="invoice-sig-company">PKIT Consultants</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Invoice Footer Details block */}
            <div className="invoice-footer">
              <div className="invoice-footer-col">
                <div className="invoice-footer-icon-wrapper">
                  <MapPin className="invoice-footer-icon" />
                </div>
                <div className="invoice-footer-text">
                  <span className="font-bold">{companyName}</span><br />
                  Deira, Dubai<br />
                  United Arab Emirates
                </div>
              </div>

              <div className="invoice-footer-col">
                <div className="invoice-footer-icon-wrapper">
                  <Phone className="invoice-footer-icon" />
                </div>
                <div className="invoice-footer-text" style={{ alignSelf: "center" }}>
                  {settings?.phone || COMPANY.phone}
                </div>
              </div>

              <div className="invoice-footer-col">
                <div className="invoice-footer-icon-wrapper">
                  <Mail className="invoice-footer-icon" />
                </div>
                <div className="invoice-footer-text" style={{ alignSelf: "center" }}>
                  {settings?.email || COMPANY.email}
                </div>
              </div>

              <div className="invoice-footer-col">
                <div className="invoice-footer-icon-wrapper">
                  <Globe className="invoice-footer-icon" />
                </div>
                <div className="invoice-footer-text" style={{ alignSelf: "center" }}>
                  {getWebsiteHost()}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
