export interface MailAttachment {
  filename: string;
  content: Buffer | string;
  contentType?: string;
}

export interface MailOptions {
  to: string;
  subject: string;
  html: string;
  attachments?: MailAttachment[];
}

export interface EmailProvider {
  name: string;
  send(options: MailOptions): Promise<{ success: boolean; messageId?: string; error?: any }>;
}
