import { notificationForOldVisitors } from "./notification-for-old-visitots";
import { tokensRemover } from "./remove-old-tokens";

export const runAllCronJobs = () => {
  tokensRemover.start();
  notificationForOldVisitors.start();
};
