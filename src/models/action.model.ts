import { model, Schema, Types } from "mongoose";

import { EActionTockenType } from "../enums/token-type.enum";
import { User } from "./user.model";

const actionTokenSchema = new Schema(
  {
    actionToken: {
      type: String,
      required: true,
    },
    tokenType: {
      type: String,
      enum: EActionTockenType,
      required: true,
    },
    _userId: {
      type: Types.ObjectId,
      required: true,
      ref: User,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const ActionToken = model("actionToken", actionTokenSchema);
