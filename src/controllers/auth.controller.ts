import { NextFunction, Request, Response } from "express";

import { ILogin } from "../interface/auth.interface";
import { IUser } from "../interface/user.interface";
import { authService } from "../service/auth.service";
import {ITokenPayload} from "../interface/token.interface";
// import {ITokenPair} from "../interface/token.interface";

class AuthController {
  public async singUp(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body as Partial<IUser>;
      const createdUser = await authService.singUp(body);

      return res.json({ data: createdUser });
    } catch (e) {
      next(e);
    }
  }

  public async singIn(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body as ILogin;
      const jwtTokens = await authService.singIn(body);

      return res.json({ data: jwtTokens });
    } catch (e) {
      next(e);
    }
  }

  public async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const jwtPayload = res.locals.jwtPayload as ITokenPayload;
      const refreshToken = res.locals.refreshToken as string;

      const jwtTokens = await authService.refresh(jwtPayload, refreshToken);

      return res.json({ data: jwtTokens });
    } catch (e) {
      next(e);
    }
  }
}

export const authController = new AuthController();
