import { IToken } from "../interface/token.interface";
import { Token } from "../models/token.model";

class TokenRepository {
  public async create(data: Partial<IToken>) {
    return await Token.create(data);
  }
}

export const tokenRepository = new TokenRepository();
