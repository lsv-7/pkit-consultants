import { prisma } from "@/lib/prisma";
import { MailQueue } from "./queue";
import { COMPANY } from "@/lib/company";
import * as templates from "./templates";

export interface SendEmailOptions {
  recipient: string;
  subject: string;
  html: string;
  type: string;
  createdBy?: string;
  clientId?: string;
  leadId?: string;
  invoiceId?: string;
  projectId?: string;
  clientUserId?: string;
  attachments?: {
    filename: string;
    content: Buffer | string;
    contentType?: string;
  }[];
}

export class CommunicationService {
  /**
   * Logs email execution as QUEUED in the SentEmail table, 
   * and pushes to the asynchronous MailQueue worker.
   */
  static async sendEmail(options: SendEmailOptions): Promise<string> {
    const log = await prisma.sentEmail.create({
      data: {
        recipient: options.recipient,
        subject: options.subject,
        body: options.html,
        type: options.type,
        status: "QUEUED",
        createdBy: options.createdBy || "SYSTEM",
        clientId: options.clientId || null,
        leadId: options.leadId || null,
        invoiceId: options.invoiceId || null,
        projectId: options.projectId || null,
        clientUserId: options.clientUserId || null,
      },
    });

    await MailQueue.add({
      options: {
        to: options.recipient,
        subject: options.subject,
        html: options.html,
        attachments: options.attachments,
      },
      emailLogId: log.id,
      onComplete: async (success, errorMsg) => {
        await prisma.sentEmail.update({
          where: { id: log.id },
          data: {
            status: success ? "SENT" : "FAILED",
            errorMessage: errorMsg || null,
          },
        });
      },
    });

    return log.id;
  }

  // 1. Welcome Email
  static async sendWelcomeEmail(clientId: string, clientName: string, recipientEmail: string, createdBy: string = "SYSTEM") {
    const html = templates.welcomeEmail({ clientName });
    return this.sendEmail({
      recipient: recipientEmail,
      subject: `Welcome to ${COMPANY.name}`,
      html,
      type: "WELCOME",
      clientId,
      createdBy,
    });
  }

  // 2. Portal Credentials
  static async sendPortalCredentials(clientId: string, clientName: string, recipientEmail: string, tempPasswordHex: string, createdBy: string = "SYSTEM") {
    const loginUrl = `${COMPANY.website}/portal/login`;
    const html = templates.portalCredentialsEmail({
      clientName,
      email: recipientEmail,
      tempPasswordHex,
      loginUrl,
    });
    return this.sendEmail({
      recipient: recipientEmail,
      subject: `Your ${COMPANY.name} Portal Credentials`,
      html,
      type: "PORTAL_CREDENTIALS",
      clientId,
      createdBy,
    });
  }

  // 3. Send Invoice
  static async sendInvoice(
    invoiceId: string,
    invoiceNumber: string,
    clientName: string,
    recipientEmail: string,
    dueDate: string,
    amountFormatted: string,
    pdfBuffer: Buffer,
    clientId: string,
    createdBy: string = "ADMIN"
  ) {
    const paymentUrl = `${COMPANY.website}/portal/invoices`;
    const html = templates.invoiceEmail({
      clientName,
      invoiceNumber,
      dueDate,
      amountFormatted,
      paymentUrl,
    });

    return this.sendEmail({
      recipient: recipientEmail,
      subject: `Invoice ${invoiceNumber} from ${COMPANY.name}`,
      html,
      type: "INVOICE",
      invoiceId,
      clientId,
      createdBy,
      attachments: [
        {
          filename: `${invoiceNumber}.pdf`,
          content: pdfBuffer,
          contentType: "application/pdf",
        },
      ],
    });
  }

  // 4. Payment Receipt
  static async sendPaymentReceipt(
    invoiceId: string,
    invoiceNumber: string,
    clientName: string,
    recipientEmail: string,
    amountFormatted: string,
    paymentMethod: string,
    transactionId?: string,
    clientId?: string,
    createdBy: string = "SYSTEM"
  ) {
    const html = templates.paymentReceiptEmail({
      clientName,
      invoiceNumber,
      amountFormatted,
      paymentMethod,
      transactionId,
    });

    return this.sendEmail({
      recipient: recipientEmail,
      subject: `Payment Receipt for Invoice ${invoiceNumber}`,
      html,
      type: "PAYMENT_RECEIPT",
      invoiceId,
      clientId,
      createdBy,
    });
  }

  // 5. Password Reset Token
  static async sendPasswordReset(
    clientUserId: string,
    clientName: string,
    recipientEmail: string,
    token: string,
    clientId?: string,
    createdBy: string = "SYSTEM"
  ) {
    const resetUrl = `${COMPANY.website}/portal/reset-password?token=${token}&email=${encodeURIComponent(recipientEmail)}`;
    const html = templates.passwordResetEmail({
      clientName,
      resetUrl,
      expiryHours: 1,
    });

    return this.sendEmail({
      recipient: recipientEmail,
      subject: `Reset Your ${COMPANY.name} Password`,
      html,
      type: "PASSWORD_RESET",
      clientUserId,
      clientId,
      createdBy,
    });
  }

  // 6. Consultation Submission Confirmation (Visitor)
  static async sendConsultationConfirmation(leadId: string, clientName: string, recipientEmail: string) {
    const html = templates.consultationConfirmationEmail({ clientName });
    return this.sendEmail({
      recipient: recipientEmail,
      subject: "Thank you for contacting PKIT Consultants",
      html,
      type: "CONSULTATION_CONFIRMATION",
      leadId,
    });
  }

  // 7. Notification of Consultation (Admin Alert)
  static async notifyAdminOfConsultation(leadId: string, fullName: string, company: string, email: string, phone: string) {
    const html = templates.consultationReceivedEmail({
      leadId,
      fullName,
      company,
      email,
      phone,
      submissionTime: new Date().toLocaleString(),
    });
    return this.sendEmail({
      recipient: COMPANY.email,
      subject: `New Consultation Request – ${company || "Individual"}`,
      html,
      type: "ADMIN_NOTIFICATION",
      leadId,
    });
  }

  // 8. Project Assigned
  static async sendProjectAssigned(
    projectId: string,
    projectName: string,
    service: string,
    clientName: string,
    recipientEmail: string,
    clientId?: string,
    createdBy: string = "ADMIN"
  ) {
    const portalUrl = `${COMPANY.website}/portal/projects`;
    const html = templates.projectAssignedEmail({
      clientName,
      projectName,
      service,
      portalUrl,
    });

    return this.sendEmail({
      recipient: recipientEmail,
      subject: `Project Initialized: ${projectName}`,
      html,
      type: "PROJECT_STATUS",
      projectId,
      clientId,
      createdBy,
    });
  }

  // 9. Project Status Update
  static async sendProjectStatusUpdate(
    projectId: string,
    projectName: string,
    oldStatus: string,
    newStatus: string,
    progress: number,
    clientName: string,
    recipientEmail: string,
    clientId?: string,
    createdBy: string = "ADMIN"
  ) {
    const portalUrl = `${COMPANY.website}/portal/projects`;
    const html = templates.projectStatusUpdatedEmail({
      clientName,
      projectName,
      oldStatus,
      newStatus,
      progress,
      portalUrl,
    });

    return this.sendEmail({
      recipient: recipientEmail,
      subject: `Project Status Update: ${projectName} (${newStatus.replaceAll("_", " ")})`,
      html,
      type: "PROJECT_STATUS",
      projectId,
      clientId,
      createdBy,
    });
  }

  // 10. Project Completion Notice
  static async sendProjectCompletion(
    projectId: string,
    projectName: string,
    clientName: string,
    recipientEmail: string,
    clientId?: string,
    createdBy: string = "ADMIN"
  ) {
    const portalUrl = `${COMPANY.website}/portal/projects`;
    const html = templates.projectCompletedEmail({
      clientName,
      projectName,
      portalUrl,
    });

    return this.sendEmail({
      recipient: recipientEmail,
      subject: `Project Completed Successfully: ${projectName}`,
      html,
      type: "PROJECT_STATUS",
      projectId,
      clientId,
      createdBy,
    });
  }

  // 11. General Message Notice
  static async sendGeneralNotification(
    recipientEmail: string,
    clientName: string,
    title: string,
    body: string,
    actionLabel?: string,
    actionUrl?: string,
    clientId?: string,
    createdBy: string = "ADMIN"
  ) {
    const html = templates.generalNotificationEmail({
      clientName,
      messageTitle: title,
      messageBody: body,
      actionLabel,
      actionUrl,
    });

    return this.sendEmail({
      recipient: recipientEmail,
      subject: title,
      html,
      type: "GENERAL",
      clientId,
      createdBy,
    });
  }
}
