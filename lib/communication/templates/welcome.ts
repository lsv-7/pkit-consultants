import { getBaseLayout } from "./baseLayout";

interface WelcomeEmailParams {
  clientName: string;
}

export function welcomeEmail(params: WelcomeEmailParams): string {
  const contentHtml = `
    <p>Dear ${params.clientName},</p>
    <p>Welcome to <strong>PKIT Consultants</strong>! We are thrilled to partner with you to deliver world-class technology consulting and solutions.</p>
    <p>Your client portal account has been created. Through the client portal, you can monitor project milestones, view active tasks, download invoices, make payments, and communicate directly with our engineering teams.</p>
    <p>If you have any questions or require assistance getting started, please reach out to your assigned account coordinator or email our support desk.</p>
    <p>Best regards,<br><strong>PKIT Client Operations</strong></p>
  `;

  return getBaseLayout({
    title: "Welcome to PKIT Consultants",
    previewText: "Welcome to PKIT Consultants. We are excited to work with you.",
    contentHtml,
  });
}
