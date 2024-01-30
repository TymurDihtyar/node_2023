import { tokensRemover } from "./remove-old-tokens";

export const runAllCronJobs = () => {
  tokensRemover.start();
};
