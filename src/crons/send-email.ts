import { CronJob } from "cron";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { EEmailAction } from "../enums/email-action.enum";
import { ApiError } from "../errors/api.error";
import { tokenRepository } from "../repositories/token.repository";
import { userRepository } from "../repositories/user.repository";
import { emailService } from "../service/email.service";

dayjs.extend(utc);

const sendRememberEmail = async function () {
  try {
    const users = await userRepository.getAll();

    await Promise.all(
      users.map(async (user) => {
        const entity = await tokenRepository.getOne({ _userId: user._id });
        if (!entity) {
          await emailService.sendMail(user.email, EEmailAction.REMEMBER, { name: user.name });
        }
      }),
    );
  } catch (e) {
    throw new ApiError(e.message, 500);
  }
};

export const sendEmail = new CronJob("* 0 4 * * *", sendRememberEmail);
