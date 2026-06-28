import { getActiveMailProvider } from "./mailer";
import { MailOptions } from "./providers/provider";

export interface QueueJob {
  options: MailOptions;
  emailLogId: string;
  onComplete: (success: boolean, errorMsg?: string) => Promise<void>;
}

export class MailQueue {
  static async add(job: QueueJob): Promise<void> {
    // Run asynchronously outside the main thread to decouple business services
    // from immediate email dispatch latency.
    setTimeout(async () => {
      try {
        const provider = getActiveMailProvider();
        const result = await provider.send(job.options);
        
        if (result.success) {
          await job.onComplete(true);
        } else {
          await job.onComplete(false, result.error?.message || "Email provider dispatch failed");
        }
      } catch (error: any) {
        console.error(`[MailQueue] Job execution error for log ${job.emailLogId}:`, error);
        await job.onComplete(false, error.message || "Unknown queue job error");
      }
    }, 0);
  }
}
