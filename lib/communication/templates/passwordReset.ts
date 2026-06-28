import { getBaseLayout } from "./baseLayout";

interface PasswordResetParams {
  clientName: string;
  resetUrl: string;
  expiryHours: number;
}

export function passwordResetEmail(params: PasswordResetParams): string {
  const contentHtml = `
    <p>Dear ${params.clientName},</p>
    <p>We received a request to reset the password for your PKIT Client Portal account. Click the button below to secure your account and set a new password:</p>
    
    <p style="text-align: center;">
      <a href="${params.resetUrl}" class="btn-primary">Reset Password</a>
    </p>

    <div class="highlight-box" style="border-left-color: #e11d48;">
      <p style="margin: 0; font-size: 13px; color: #475569;">
        <strong>⚠️ Security Warning:</strong> This link will expire in ${params.expiryHours} hour${params.expiryHours > 1 ? "s" : ""}. If you did not request a password reset, please ignore this email or contact support if you suspect unauthorized access.
      </p>
    </div>

    <p>If the button above does not work, copy and paste the following URL into your browser:</p>
    <p style="word-break: break-all; font-size: 12px; color: #64748b;"><a href="${params.resetUrl}">${params.resetUrl}</a></p>

    <p>Best regards,<br><strong>PKIT Client Operations</strong></p>
  `;

  return getBaseLayout({
    title: "Reset Your PKIT Portal Password",
    previewText: "Reset your PKIT Client Portal password using this link.",
    contentHtml,
  });
}
