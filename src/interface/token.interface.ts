import { Types } from "mongoose";

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
