import { EmailProvider } from "./providers/provider";
import { SmtpProvider } from "./providers/smtpProvider";

let activeProvider: EmailProvider | null = null;

export function getActiveMailProvider(): EmailProvider {
  if (!activeProvider) {
    // Under enterprise design, this can inspect env vars (e.g. PROVIDER=ses, resend)
    // and load corresponding provider classes dynamically.
    // For now, we instantiate the default SMTP / Mock transport.
    activeProvider = new SmtpProvider();
  }
  return activeProvider;
}
