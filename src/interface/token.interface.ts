import { Types } from "mongoose";

import { EActionTockenType } from "../enums/token-type.enum";

export interface ITokenPayload {
  userId: string;
}

export interface ITokenPair {
  accessToken: string;
  refreshToken: string;
}

export interface IToken extends ITokenPair {
  _userId: Types.ObjectId;
  _id: Types.ObjectId;
}

export interface IActionToken {
  actionToken: string;
  tokenType: EActionTockenType;
  _userId: Types.ObjectId;
}
