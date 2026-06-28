import { getBaseLayout } from "./baseLayout";

interface ConsultationReceivedParams {
  leadId: string;
  fullName: string;
  company: string;
  email: string;
  phone: string;
  submissionTime: string;
}

export function consultationReceivedEmail(params: ConsultationReceivedParams): string {
  const contentHtml = `
    <p>Hello Admin Team,</p>
    <p>A new consultation request has been submitted on the PKIT website. Please review the details below to follow up with the lead:</p>
    
    <div class="highlight-box">
      <table style="width: 100%; border: none;">
        <tr>
          <td style="font-weight: 600; color: #475569; padding-bottom: 6px; width: 140px;">Visitor Name:</td>
          <td style="padding-bottom: 6px;">${params.fullName}</td>
        </tr>
        <tr>
          <td style="font-weight: 600; color: #475569; padding-bottom: 6px;">Company:</td>
          <td style="padding-bottom: 6px;">${params.company || "Not Provided"}</td>
        </tr>
        <tr>
          <td style="font-weight: 600; color: #475569; padding-bottom: 6px;">Email:</td>
          <td style="padding-bottom: 6px;"><a href="mailto:${params.email}">${params.email}</a></td>
        </tr>
        <tr>
          <td style="font-weight: 600; color: #475569; padding-bottom: 6px;">Phone:</td>
          <td style="padding-bottom: 6px;"><a href="tel:${params.phone}">${params.phone}</a></td>
        </tr>
        <tr>
          <td style="font-weight: 600; color: #475569; padding-bottom: 6px;">Submission Time:</td>
          <td style="padding-bottom: 6px;">${params.submissionTime}</td>
        </tr>
        <tr>
          <td style="font-weight: 600; color: #475569; padding-bottom: 6px;">Lead ID:</td>
          <td style="padding-bottom: 6px; font-family: monospace; font-size: 12px; color: #0066FF;">${params.leadId}</td>
        </tr>
      </table>
    </div>

    <p>Please log in to the CRM Admin Panel to view details and convert this request into a project.</p>
    <p>Regards,<br><strong>PKIT Notification System</strong></p>
  `;

  return getBaseLayout({
    title: "New Consultation Enquiry Received",
    previewText: `New enquiry from ${params.fullName} (${params.company || "Individual"}).`,
    contentHtml,
  });
}
