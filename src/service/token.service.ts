import * as jwt from "jsonwebtoken";

import { configs } from "../configs/config";
import { EActionTockenType } from "../enums/token-type.enum";
import { ApiError } from "../errors/api.error";
import { ITokenPair, ITokenPayload } from "../interface/token.interface";

class TokenService {
  public generateTokenPair(payload: ITokenPayload): ITokenPair {
    const accessToken = jwt.sign(payload, configs.JWT_ACCESS_SECRET, {
      expiresIn: configs.JWT_ACCESS_EXPIRES_IN,
    });

    const refreshToken = jwt.sign(payload, configs.JWT_REFRESH_SECRET, {
      expiresIn: configs.JWT_REFRESH_EXPIRES_IN,
    });

    return { accessToken, refreshToken };
  }

  public checkToken(token: string, type: "refresh" | "access"): ITokenPayload {
    try {
      let secret: string;

      switch (type) {
        case "access":
          secret = configs.JWT_ACCESS_SECRET;
          break;
        case "refresh":
          secret = configs.JWT_REFRESH_SECRET;
          break;
      }
      return jwt.verify(token, secret) as ITokenPayload;
    } catch (e) {
      throw new ApiError("Token not valid", 401);
    }
  }

  public checkActionToken(actionToken: string, tokenType: EActionTockenType) {
    try {
      let secret: string;

      switch (tokenType) {
        case EActionTockenType.FORGOT:
          secret = configs.JWT_FORGOT_ACTION_SECRET;
          break;
      }
      return jwt.verify(actionToken, secret) as ITokenPayload;
    } catch (e) {
      throw new ApiError("Token not valid", 401);
    }
  }

  public createActionToken(payload: ITokenPayload, tokenType: EActionTockenType) {
    let secret: string;

    switch (tokenType) {
      case EActionTockenType.FORGOT:
        secret = configs.JWT_FORGOT_ACTION_SECRET;
        break;
    }
    return jwt.sign(payload, secret, {
      expiresIn: configs.JWT_ACTION_EXPIRES_IN,
    });
  }
}

export const tokenService = new TokenService();
