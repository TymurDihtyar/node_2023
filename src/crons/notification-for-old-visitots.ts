import { CronJob } from "cron";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { EEmailAction } from "../enums/email-action.enum";
import { ApiError } from "../errors/api.error";
import { userRepository } from "../repositories/user.repository";
import { emailService } from "../service/email.service";

dayjs.extend(utc);

const handler = async function () {
  try {
    const previousMonth = dayjs().utc().subtract(15, "d").toDate();

    const users = await userRepository.findWithoutActivity(previousMonth);

    await Promise.all(
      users.map(async (user) => {
        await emailService.sendMail(user.email, EEmailAction.WELCOME, { name: user.name });
      }),
    );
  } catch (e) {
    throw new ApiError(e.message, e.status);
  }
};

export const notificationForOldVisitors = new CronJob("* 0 4 * * *", handler);
