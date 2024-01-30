import { EEmailAction } from "../enums/email-action.enum";

export const emailTemplate = {
  [EEmailAction.WELCOME]: {
    templateName: "/welcome",
    subject: "Happy to se you !! 😊👋",
  },
  [EEmailAction.FORGOT_PASSWORD]: {
    templateName: "/forgot-password",
    subject: "Restore password",
  },
  [EEmailAction.REMEMBER]: {
    templateName: "/remember",
    subject: "Remember for you",
  },
};
