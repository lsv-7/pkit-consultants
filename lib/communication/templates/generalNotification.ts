import { getBaseLayout } from "./baseLayout";

interface GeneralNotificationParams {
  clientName: string;
  messageTitle: string;
  messageBody: string;
  actionLabel?: string;
  actionUrl?: string;
}

export function generalNotificationEmail(params: GeneralNotificationParams): string {
  const contentHtml = `
    <p>Dear ${params.clientName},</p>
    <h2 style="font-size: 18px; color: #0b193d; margin: 20px 0 12px 0;">${params.messageTitle}</h2>
    <div style="line-height: 1.6; font-size: 15px; color: #334155; margin-bottom: 24px;">
      ${params.messageBody.replaceAll("\n", "<br>")}
    </div>
    
    ${params.actionUrl && params.actionLabel ? `
    <p style="text-align: center;">
      <a href="${params.actionUrl}" class="btn-primary">${params.actionLabel}</a>
    </p>
    ` : ""}

    <p>If you have any questions or would like to discuss this notice further, please reply to this email.</p>
    
    <p>Best regards,<br><strong>PKIT Client Operations</strong></p>
  `;

  return getBaseLayout({
    title: params.messageTitle,
    previewText: params.messageTitle,
    contentHtml,
  });
}
