import * as joi from "joi";

import { regexConstant } from "../constants/regex.costants";

export class UserValidator {
  private static password = joi.string().regex(regexConstant.PASSWORD).trim();
  private static email = joi.string().lowercase().regex(regexConstant.EMAIL).trim();
  private static userName = joi.string().min(3).max(50).trim().messages({
    "string.empty": "name cant be empty",
  });
  private static age = joi.number().min(18).max(100).integer();

  public static create = joi.object({
    email: this.email.required(),
    password: this.password.required(),
    name: this.userName.required(),
    age: this.age.required(),
  });

  public static update = joi.object({
    name: this.userName,
    age: this.age,
  });

  public static login = joi.object({
    email: this.email.required(),
    password: this.password.required(),
  });
}
