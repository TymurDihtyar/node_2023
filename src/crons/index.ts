import { tokensRemover } from "./remove-old-tokens";
import { sendEmail } from "./send-email";

export const runAllCronJobs = () => {
  tokensRemover.start();
  sendEmail.start();
};
