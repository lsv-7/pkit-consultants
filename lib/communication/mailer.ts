import { EmailProvider } from "./providers/provider";
import { SmtpProvider } from "./providers/smtpProvider";
import { MicrosoftGraphProvider } from "./providers/microsoftGraphProvider";

let activeProvider: EmailProvider | null = null;

export function getActiveMailProvider(): EmailProvider {
  if (!activeProvider) {
    const configuredProvider = (process.env.EMAIL_PROVIDER || "").toLowerCase().trim();

    const hasGraphConfig = Boolean(
      (process.env.AZURE_TENANT_ID || process.env.MS_GRAPH_TENANT_ID) &&
      (process.env.AZURE_CLIENT_ID || process.env.MS_GRAPH_CLIENT_ID) &&
      (process.env.AZURE_CLIENT_SECRET || process.env.MS_GRAPH_CLIENT_SECRET)
    );

    const hasSmtpConfig = Boolean(
      process.env.SMTP_HOST &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASSWORD
    );

    if (configuredProvider === "graph" || (configuredProvider !== "smtp" && hasGraphConfig)) {
      activeProvider = new MicrosoftGraphProvider();
    } else if (configuredProvider === "smtp" || hasSmtpConfig) {
      activeProvider = new SmtpProvider();
    } else {
      // Default fallback: SmtpProvider handles test/dev ethereal fallback
      activeProvider = new SmtpProvider();
    }

    console.log(`[Mailer] Initialized active email provider: ${activeProvider.name}`);
  }

  return activeProvider;
}

export function setActiveMailProvider(provider: EmailProvider | null) {
  activeProvider = provider;
}
