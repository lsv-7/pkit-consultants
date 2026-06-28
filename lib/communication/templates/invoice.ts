import { getBaseLayout } from "./baseLayout";

interface InvoiceEmailParams {
  clientName: string;
  invoiceNumber: string;
  dueDate: string;
  amountFormatted: string;
  paymentUrl: string;
}

export function invoiceEmail(params: InvoiceEmailParams): string {
  const contentHtml = `
    <p>Dear ${params.clientName},</p>
    <p>We have generated invoice <strong>${params.invoiceNumber}</strong> for services rendered. Please review the details below:</p>
    
    <div class="highlight-box">
      <table style="width: 100%; border: none;">
        <tr>
          <td style="font-weight: 600; color: #475569; padding-bottom: 6px;">Invoice Number:</td>
          <td style="text-align: right; padding-bottom: 6px;">${params.invoiceNumber}</td>
        </tr>
        <tr>
          <td style="font-weight: 600; color: #475569; padding-bottom: 6px;">Due Date:</td>
          <td style="text-align: right; color: #e11d48; font-weight: 600; padding-bottom: 6px;">${params.dueDate}</td>
        </tr>
        <tr style="border-top: 1px solid #cbd5e1;">
          <td style="font-weight: bold; color: #0b193d; pt: 8px;">Total Amount:</td>
          <td style="text-align: right; font-weight: bold; color: #0b193d; font-size: 16px; pt: 8px;">${params.amountFormatted}</td>
        </tr>
      </table>
    </div>

    <p>A PDF copy of this invoice has been attached to this email for your convenience.</p>

    <p style="text-align: center;">
      <a href="${params.paymentUrl}" class="btn-primary">View & Pay Invoice</a>
    </p>

    <p>Please process the payment by the due date. If you have any queries regarding this invoice, please do not hesitate to contact our billing team.</p>

    <p>Thank you for your business.</p>
    
    <p>Best regards,<br><strong>PKIT Accounts Dept.</strong></p>
  `;

  return getBaseLayout({
    title: `Invoice ${params.invoiceNumber} from PKIT Consultants`,
    previewText: `Invoice ${params.invoiceNumber} for ${params.amountFormatted} is now available.`,
    contentHtml,
  });
}
