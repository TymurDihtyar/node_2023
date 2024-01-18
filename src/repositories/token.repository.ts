import { FilterQuery, Types } from "mongoose";

import { IToken } from "../interface/token.interface";
import { Token } from "../models/token.model";

class TokenRepository {
  public async create(data: Partial<IToken>) {
    return await Token.create(data);
  }

  public async getTokenByParams(params: FilterQuery<IToken>): Promise<IToken> {
    return await Token.findOne(params);
  }

  public async update(data: Partial<IToken>, id: Types.ObjectId) {
    return await Token.findByIdAndUpdate(id, data, { returnDocument: "after" });
  }

  // public async updateById(id: string, body: Partial<IUser>): Promise<IUser> {
  //   return await User.findByIdAndUpdate(id, body, );
  // }
}

export const tokenRepository = new TokenRepository();
