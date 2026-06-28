import { getBaseLayout } from "./baseLayout";

interface ConsultationConfirmationParams {
  clientName: string;
}

export function consultationConfirmationEmail(params: ConsultationConfirmationParams): string {
  const contentHtml = `
    <p>Dear ${params.clientName},</p>
    <p>Thank you for contacting <strong>PKIT Consultants</strong>. We have received your consultation enquiry and our engineering design team is reviewing your requirements.</p>
    <p>An expert consultant will contact you within the next 24 business hours to discuss your project, outline solution architectures, and coordinate a discovery call.</p>
    
    <div class="highlight-box">
      <p style="margin: 0; font-style: italic;">
        "Thank you for contacting PKIT Consultants. We look forward to building technology solutions that power your business forward."
      </p>
    </div>

    <p>If you have any urgent attachments or documents to share in the meantime, feel free to reply directly to this email.</p>

    <p>Best regards,<br><strong>Discovery & Consulting Team</strong><br>PKIT Consultants</p>
  `;

  return getBaseLayout({
    title: "Thank you for contacting PKIT Consultants",
    previewText: "We have received your consultation request and will contact you shortly.",
    contentHtml,
  });
}
