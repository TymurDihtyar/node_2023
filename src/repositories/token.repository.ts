import { FilterQuery } from "mongoose";

import { IActionToken, IToken } from "../interface/token.interface";
import { ActionToken } from "../models/action.model";
import { Token } from "../models/token.model";

class TokenRepository {
  public async create(data: Partial<IToken>) {
    return await Token.create(data);
  }

  public async getOne(params: FilterQuery<IToken>): Promise<IToken> {
    return await Token.findOne(params);
  }

  public async deleteManyBy(userId: string): Promise<void> {
    await Token.deleteMany({ _userId: userId });
  }

  public async deleteManyByParams(params: FilterQuery<IToken>): Promise<void> {
    await Token.deleteMany(params);
  }

  public async deleteTokenByParams(params: FilterQuery<IToken>): Promise<void> {
    await Token.deleteOne(params);
  }

  public async createActionToken(data: Partial<IActionToken>) {
    return await ActionToken.create(data);
  }

  public async getActionTokenByParams(params: Partial<IActionToken>) {
    return await ActionToken.findOne(params);
  }

  public async deleteActionTokenByParams(params: Partial<IActionToken>): Promise<void> {
    await ActionToken.deleteOne(params);
  }
}

export const tokenRepository = new TokenRepository();
