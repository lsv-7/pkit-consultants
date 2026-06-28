import { getBaseLayout } from "./baseLayout";

interface ProjectCompletedParams {
  clientName: string;
  projectName: string;
  portalUrl: string;
}

export function projectCompletedEmail(params: ProjectCompletedParams): string {
  const contentHtml = `
    <p>Dear ${params.clientName},</p>
    <p>Congratulations! We are delighted to inform you that your project <strong>${params.projectName}</strong> has been successfully completed, and all deliverable metrics have been met.</p>
    
    <div class="highlight-box" style="border-left-color: #16a34a; background-color: #f0fdf4;">
      <p style="margin: 0; color: #15803d; font-weight: 600;">
        ✓ Project "${params.projectName}" is 100% complete and fully signed off.
      </p>
    </div>

    <p>All project handover documents, source files, deployment keys, and documentation are now accessible inside the Documents section of your portal account.</p>

    <p style="text-align: center;">
      <a href="${params.portalUrl}" class="btn-primary" style="background-color: #16a34a;">Access Project Deliverables</a>
    </p>

    <p>We want to thank you for choosing PKIT Consultants. We look forward to supporting your maintenance phases and partnering with you on future technology initiatives.</p>
    
    <p>Best regards,<br><strong>M. Prasanna Kumar</strong><br>Founder & Managing Director<br>PKIT Consultants</p>
  `;

  return getBaseLayout({
    title: `Project Completed Successfully: ${params.projectName}`,
    previewText: `Project '${params.projectName}' has been completed. All handover files are ready.`,
    contentHtml,
  });
}
