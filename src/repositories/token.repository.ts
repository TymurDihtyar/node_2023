import { FilterQuery } from "mongoose";

import { IToken } from "../interface/token.interface";
import { Token } from "../models/token.model";

class TokenRepository {
  public async create(data: Partial<IToken>) {
    return await Token.create(data);
  }

  public async getOne(params: FilterQuery<IToken>): Promise<IToken> {
    return await Token.findOne(params);
  }

  public async deleteTokenByParams(params: FilterQuery<IToken>): Promise<void> {
    await Token.deleteOne(params);
  }
}

export const tokenRepository = new TokenRepository();
