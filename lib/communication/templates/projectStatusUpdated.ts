import { getBaseLayout } from "./baseLayout";

interface ProjectStatusUpdatedParams {
  clientName: string;
  projectName: string;
  oldStatus: string;
  newStatus: string;
  progress: number;
  portalUrl: string;
}

export function projectStatusUpdatedEmail(params: ProjectStatusUpdatedParams): string {
  const contentHtml = `
    <p>Dear ${params.clientName},</p>
    <p>We want to provide you with an update on your project: <strong>${params.projectName}</strong>. The project status has transitioned:</p>
    
    <div class="highlight-box">
      <table style="width: 100%; border: none;">
        <tr>
          <td style="font-weight: 600; color: #475569; padding-bottom: 6px; width: 140px;">Project Name:</td>
          <td style="padding-bottom: 6px;">${params.projectName}</td>
        </tr>
        <tr>
          <td style="font-weight: 600; color: #475569; padding-bottom: 6px;">Previous Status:</td>
          <td style="padding-bottom: 6px; color: #64748b;">${params.oldStatus.replaceAll("_", " ")}</td>
        </tr>
        <tr>
          <td style="font-weight: 600; color: #475569; padding-bottom: 6px;">Current Status:</td>
          <td style="padding-bottom: 6px; font-weight: bold; color: #0066FF;">${params.newStatus.replaceAll("_", " ")}</td>
        </tr>
        <tr>
          <td style="font-weight: 600; color: #475569; padding-bottom: 6px;">Current Progress:</td>
          <td style="padding-bottom: 6px; font-weight: bold;">${params.progress}% Completed</td>
        </tr>
      </table>
    </div>

    <p style="text-align: center;">
      <a href="${params.portalUrl}" class="btn-primary">View Milestones & Worksheets</a>
    </p>

    <p>We will keep you informed as we make progress toward our next key deliverables. Please log in to the Client Portal for a detailed breakdown of the tasks completed.</p>
    
    <p>Best regards,<br><strong>PKIT Engineering Ops</strong></p>
  `;

  return getBaseLayout({
    title: `Project Status Update: ${params.projectName}`,
    previewText: `Project '${params.projectName}' has transitioned to status '${params.newStatus.replaceAll("_", " ")}'.`,
    contentHtml,
  });
}
