import { FilterQuery } from "mongoose";

import { IActionToken, IToken } from "../interface/token.interface";
import { Token } from "../models/token.model";
import {ActionToken} from "../models/action.model";

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

  public async createActionToken(data: Partial<IActionToken>){
    return await ActionToken.create(data);
  }

  public async getActionTokenByParams(params: Partial<IActionToken>){
    return await ActionToken.findOne(params);
  }
}

export const tokenRepository = new TokenRepository();
