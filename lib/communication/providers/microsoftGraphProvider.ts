import { EmailProvider, MailOptions } from "./provider";

interface CachedToken {
  accessToken: string;
  expiresAt: number; // Unix timestamp in ms
}

export class MicrosoftGraphProvider implements EmailProvider {
  name = "Microsoft Graph (OAuth 2.0)";
  private cachedToken: CachedToken | null = null;

  private getTenantId(): string | undefined {
    return process.env.AZURE_TENANT_ID || process.env.MS_GRAPH_TENANT_ID;
  }

  private getClientId(): string | undefined {
    return process.env.AZURE_CLIENT_ID || process.env.MS_GRAPH_CLIENT_ID;
  }

  private getClientSecret(): string | undefined {
    return process.env.AZURE_CLIENT_SECRET || process.env.MS_GRAPH_CLIENT_SECRET;
  }

  private getSenderEmail(): string {
    return (
      process.env.AZURE_SENDER_EMAIL ||
      process.env.FROM_EMAIL ||
      "info@pkitconsultants.com"
    );
  }

  private getSenderName(): string {
    return process.env.FROM_NAME || "PK IT Consultants";
  }

  /**
   * Acquire or reuse a valid OAuth 2.0 access token via client credentials flow.
   * Caches token until 5 minutes before expiration to avoid redundant requests.
   */
  private async getAccessToken(): Promise<string> {
    const tenantId = this.getTenantId();
    const clientId = this.getClientId();
    const clientSecret = this.getClientSecret();

    if (!tenantId || !clientId || !clientSecret) {
      throw new Error(
        "Microsoft Graph configuration is incomplete. Missing AZURE_TENANT_ID, AZURE_CLIENT_ID, or AZURE_CLIENT_SECRET."
      );
    }

    const now = Date.now();
    if (this.cachedToken && this.cachedToken.expiresAt > now + 5 * 60 * 1000) {
      return this.cachedToken.accessToken;
    }

    const tokenEndpoint = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`;

    const bodyParams = new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      scope: "https://graph.microsoft.com/.default",
      grant_type: "client_credentials",
    });

    const res = await fetch(tokenEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: bodyParams.toString(),
    });

    if (!res.ok) {
      let errDetails = `HTTP ${res.status}`;
      try {
        const errJson = await res.json();
        errDetails = errJson.error_description || errJson.error || errDetails;
      } catch {
        // Fallback to HTTP status
      }
      throw new Error(`Failed to acquire Microsoft Graph OAuth token: ${errDetails}`);
    }

    const data = await res.json();
    const expiresInSec = typeof data.expires_in === "number" ? data.expires_in : 3600;

    this.cachedToken = {
      accessToken: data.access_token,
      expiresAt: now + expiresInSec * 1000,
    };

    return this.cachedToken.accessToken;
  }

  async send(options: MailOptions) {
    const senderEmail = this.getSenderEmail();
    const senderName = this.getSenderName();

    try {
      const accessToken = await this.getAccessToken();

      // Format attachments for Microsoft Graph API
      const graphAttachments = (options.attachments || []).map((att) => {
        let contentBytes: string;
        if (Buffer.isBuffer(att.content)) {
          contentBytes = att.content.toString("base64");
        } else if (typeof att.content === "string") {
          contentBytes = Buffer.from(att.content).toString("base64");
        } else {
          contentBytes = "";
        }

        return {
          "@odata.type": "#microsoft.graph.fileAttachment",
          name: att.filename,
          contentType: att.contentType || "application/octet-stream",
          contentBytes,
        };
      });

      const messagePayload: any = {
        message: {
          subject: options.subject,
          body: {
            contentType: "HTML",
            content: options.html,
          },
          toRecipients: [
            {
              emailAddress: {
                address: options.to,
              },
            },
          ],
          from: {
            emailAddress: {
              address: senderEmail,
              name: senderName,
            },
          },
          replyTo: [
            {
              emailAddress: {
                address: senderEmail,
                name: senderName,
              },
            },
          ],
        },
        saveToSentItems: true,
      };

      if (graphAttachments.length > 0) {
        messagePayload.message.attachments = graphAttachments;
      }

      const sendMailEndpoint = `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(
        senderEmail
      )}/sendMail`;

      const response = await fetch(sendMailEndpoint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(messagePayload),
      });

      if (!response.ok) {
        let errorMessage = `HTTP ${response.status} ${response.statusText}`;
        try {
          const errData = await response.json();
          if (errData?.error?.message) {
            errorMessage = `${errData.error.code || "GraphError"}: ${errData.error.message}`;
          }
        } catch {
          // Ignore json parse error
        }
        console.error(
          `[Microsoft Graph Provider] Mail dispatch to ${options.to} failed: ${errorMessage}`
        );
        return { success: false, error: new Error(errorMessage) };
      }

      console.log(
        `[Microsoft Graph Provider] Successfully sent email to ${options.to} from ${senderEmail} via Microsoft 365`
      );
      return { success: true, messageId: `msg-${Date.now()}` };
    } catch (error: any) {
      console.error(
        `[Microsoft Graph Provider] Unexpected error sending email to ${options.to}:`,
        error.message || error
      );
      return { success: false, error };
    }
  }
}
