import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors/api.error";
import { tokenRepository } from "../repositories/token.repository";
import { tokenService } from "../service/token.service";

class AuthMiddleware {
  public async checkAccessToken(req: Request, res: Response, next: NextFunction) {
    try {
      const tokenString = req.get("Authorization");
      if (!tokenString) throw new ApiError("No token", 401);

      const accessToken = tokenString.split("Bearer ")[1];
      const jwtPayload = tokenService.checkToken(accessToken, "access");

      const entity = await tokenRepository.getOne({ accessToken });
      if (!entity) throw new ApiError("Token not valid", 401);

      res.locals.jwtPayload = jwtPayload;
      next();
    } catch (e) {
      next(e);
    }
  }

  public async checkRefreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const tokenString = req.get("Authorization");
      if (!tokenString) throw new ApiError("No token", 401);

      const refreshToken = tokenString.split("Bearer ")[1];
      const jwtPayload = tokenService.checkToken(refreshToken, "refresh");

      const entity = await tokenRepository.getOne({ refreshToken });
      if (!entity) throw new ApiError("Token not valid", 401);

      res.locals.jwtPayload = jwtPayload;
      res.locals.refreshToken = refreshToken;

      next();
    } catch (e) {
      next(e);
    }
  }
}

export const authMiddleware = new AuthMiddleware();
