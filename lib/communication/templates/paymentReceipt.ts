import { getBaseLayout } from "./baseLayout";

interface PaymentReceiptParams {
  clientName: string;
  invoiceNumber: string;
  amountFormatted: string;
  transactionId?: string;
  paymentMethod: string;
}

export function paymentReceiptEmail(params: PaymentReceiptParams): string {
  const contentHtml = `
    <p>Dear ${params.clientName},</p>
    <p>Thank you for your payment. We have successfully processed the payment for invoice <strong>${params.invoiceNumber}</strong>. Please find details of your receipt below:</p>
    
    <div class="highlight-box">
      <table style="width: 100%; border: none;">
        <tr>
          <td style="font-weight: 600; color: #475569; padding-bottom: 6px;">Invoice Number:</td>
          <td style="text-align: right; padding-bottom: 6px;">${params.invoiceNumber}</td>
        </tr>
        <tr>
          <td style="font-weight: 600; color: #475569; padding-bottom: 6px;">Payment Method:</td>
          <td style="text-align: right; padding-bottom: 6px;">${params.paymentMethod}</td>
        </tr>
        ${params.transactionId ? `
        <tr>
          <td style="font-weight: 600; color: #475569; padding-bottom: 6px;">Transaction ID:</td>
          <td style="text-align: right; font-family: monospace; font-size: 13px; padding-bottom: 6px;">${params.transactionId}</td>
        </tr>
        ` : ""}
        <tr style="border-top: 1px solid #cbd5e1;">
          <td style="font-weight: bold; color: #0f172a; pt: 8px;">Amount Received:</td>
          <td style="text-align: right; font-weight: bold; color: #16a34a; font-size: 16px; pt: 8px;">${params.amountFormatted}</td>
        </tr>
      </table>
    </div>

    <p>A copy of this receipt has been logged to your secure client portal account under your billing history.</p>

    <p>We appreciate your business.</p>
    
    <p>Best regards,<br><strong>PKIT Accounts Dept.</strong></p>
  `;

  return getBaseLayout({
    title: `Payment Receipt for Invoice ${params.invoiceNumber}`,
    previewText: `Payment confirmation received for invoice ${params.invoiceNumber}.`,
    contentHtml,
  });
}
