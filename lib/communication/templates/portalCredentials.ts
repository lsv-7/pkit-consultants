import { getBaseLayout } from "./baseLayout";

interface PortalCredentialsParams {
  clientName: string;
  email: string;
  tempPasswordHex: string;
  loginUrl: string;
}

export function portalCredentialsEmail(params: PortalCredentialsParams): string {
  const contentHtml = `
    <p>Dear ${params.clientName},</p>
    <p>Your portal user account has been successfully provisioned. You can now log in to the secure PKIT Client Portal using the credentials below:</p>
    
    <div class="highlight-box">
      <p style="margin: 0 0 8px 0;"><strong>Portal Login URL:</strong> <a href="${params.loginUrl}" style="color: #0066FF; text-decoration: underline;">${params.loginUrl}</a></p>
      <p style="margin: 0 0 8px 0;"><strong>Username:</strong> ${params.email}</p>
      <p style="margin: 0;"><strong>Temporary Password:</strong> <code style="font-family: monospace; font-size: 14px; background: #e2e8f0; padding: 2px 6px; border-radius: 4px;">${params.tempPasswordHex}</code></p>
    </div>

    <p style="text-align: center;">
      <a href="${params.loginUrl}" class="btn-primary">Log In to Client Portal</a>
    </p>

    <h3 style="font-size: 14px; color: #1e293b; margin: 24px 0 8px 0;">🔒 Security Instructions:</h3>
    <ul style="padding-left: 20px; margin: 0 0 24px 0;">
      <li style="margin-bottom: 6px;">You will be prompted to change your temporary password immediately upon your first login.</li>
      <li style="margin-bottom: 6px;">Do not share these credentials or temporary password with anyone.</li>
      <li style="margin-bottom: 6px;">Ensure you connect to the portal using a secure network environment.</li>
    </ul>

    <p>Best regards,<br><strong>PKIT Client Operations</strong></p>
  `;

  return getBaseLayout({
    title: "Your PKIT Client Portal Credentials",
    previewText: "Your secure PKIT Client Portal credentials have been generated.",
    contentHtml,
  });
}
