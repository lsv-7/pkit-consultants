import { getBaseLayout } from "./baseLayout";

interface ProjectAssignedParams {
  clientName: string;
  projectName: string;
  service: string;
  portalUrl: string;
}

export function projectAssignedEmail(params: ProjectAssignedParams): string {
  const contentHtml = `
    <p>Dear ${params.clientName},</p>
    <p>We are excited to inform you that we have officially initialized and assigned your new project: <strong>${params.projectName}</strong>.</p>
    
    <div class="highlight-box">
      <table style="width: 100%; border: none;">
        <tr>
          <td style="font-weight: 600; color: #475569; padding-bottom: 6px; width: 130px;">Project Name:</td>
          <td style="padding-bottom: 6px;">${params.projectName}</td>
        </tr>
        <tr>
          <td style="font-weight: 600; color: #475569; padding-bottom: 6px;">Service:</td>
          <td style="padding-bottom: 6px;">${params.service}</td>
        </tr>
        <tr>
          <td style="font-weight: 600; color: #475569; padding-bottom: 6px;">Initial Phase:</td>
          <td style="padding-bottom: 6px;">PLANNING</td>
        </tr>
      </table>
    </div>

    <p>You can follow the real-time execution progress, download documents, and check deliverables through the Client Portal dashboard.</p>

    <p style="text-align: center;">
      <a href="${params.portalUrl}" class="btn-primary">View Project Dashboard</a>
    </p>

    <p>Our engineering and architectural leads will schedule a kick-off session with your team shortly.</p>
    
    <p>Best regards,<br><strong>PKIT Engineering Ops</strong></p>
  `;

  return getBaseLayout({
    title: `Project Initialized: ${params.projectName}`,
    previewText: `Project '${params.projectName}' has been created and assigned to you.`,
    contentHtml,
  });
}
