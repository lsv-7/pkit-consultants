import nodemailer from "nodemailer";
import { EmailProvider, MailOptions } from "./provider";

export class SmtpProvider implements EmailProvider {
  name = "SMTP";
  private transporter: nodemailer.Transporter | null = null;
  private testAccountLogged = false;

  private async getTransporter(): Promise<nodemailer.Transporter> {
    if (this.transporter) return this.transporter;

    let host = process.env.SMTP_HOST;
    let port = parseInt(process.env.SMTP_PORT || "587");
    let user = process.env.SMTP_USER;
    let pass = process.env.SMTP_PASSWORD;

    if (!host || !user || !pass) {
      console.warn("\n==================================================");
      console.warn("⚠️  [STARTUP WARNING] SMTP CONFIGURATION IS MISSING!");
      console.warn("Please define SMTP_HOST, SMTP_PORT, SMTP_USER, and SMTP_PASSWORD in .env.local.");
      console.warn("Generating a real, temporary Ethereal SMTP test account...");
      console.warn("==================================================\n");

      try {
        const testAccount = await nodemailer.createTestAccount();
        host = testAccount.smtp.host;
        port = testAccount.smtp.port;
        user = testAccount.user;
        pass = testAccount.pass;

        if (!this.testAccountLogged) {
          console.log("\n==================================================");
          console.log("✅ [ETHEREAL SMTP CREDENTIALS GENERATED]");
          console.log(`Host:     ${host}`);
          console.log(`Port:     ${port}`);
          console.log(`User:     ${user}`);
          console.log(`Pass:     ${pass}`);
          console.log(`Login UI: https://ethereal.email`);
          console.log("==================================================\n");
          this.testAccountLogged = true;
        }
      } catch (err: any) {
        console.error("Failed to generate Ethereal SMTP test account:", err);
        throw new Error("SMTP configuration is missing and Ethereal generation failed.");
      }
    }

    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: {
        user,
        pass,
      },
    });

    return this.transporter;
  }

  async send(options: MailOptions) {
    const fromEmail = process.env.FROM_EMAIL || "mpkitconsultants@gmail.com";
    const fromName = process.env.FROM_NAME || "PKIT Consultants";

    try {
      const transporter = await this.getTransporter();
      const info = await transporter.sendMail({
        from: `"${fromName}" <${fromEmail}>`,
        to: options.to,
        subject: options.subject,
        html: options.html,
        attachments: options.attachments,
      });

      const previewUrl = nodemailer.getTestMessageUrl(info);
      if (previewUrl) {
        console.log(`\n==================================================`);
        console.log(`📬 [EMAIL SENT] Preview URL: ${previewUrl}`);
        console.log(`==================================================\n`);
      }

      return { success: true, messageId: info.messageId };
    } catch (error: any) {
      console.error("[SMTP Provider] Failed to send email via SMTP:", error);
      return { success: false, error };
    }
  }
}
