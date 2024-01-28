import { config } from "dotenv";
config();

export const configs = {
  DB_URL: process.env.DB_URL,
  PORT: process.env.PORT,
  SECRET_SALT: +process.env.SECRET_SALT,

  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,

  JWT_ACCESS_EXPIRES_IN: process.env.JWT_ACCESS_EXPIRES_IN,
  JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN,

  JWT_ACTION_EXPIRES_IN: process.env.JWT_ACTION_EXPIRES_IN,
  JWT_FORGOT_ACTION_SECRET: process.env.JWT_FORGOT_ACTION_SECRET,
  JWT_ACTIVATE_ACTION_SECRET: process.env.JWT_ACTIVATE_ACTION_SECRET,

  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASSWORD: process.env.SMTP_PASSWORD,

  FRONT_URL: process.env.FRONT_URL,
};
