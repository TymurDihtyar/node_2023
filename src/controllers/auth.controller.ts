import { NextFunction, Request, Response } from "express";

import { ILogin } from "../interface/auth.interface";
import { ITokenPayload } from "../interface/token.interface";
import { IUser } from "../interface/user.interface";
import { authService } from "../service/auth.service";

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
      const token = req.params.token;
      const body = req.body as ILogin;

      const jwtTokens = await authService.singIn(body, token);

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

  public async forgotPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const user = res.locals as IUser;

      await authService.forgotPassword(user);
      return res.json("OK");
    } catch (e) {
      next(e);
    }
  }

  public async setForgotPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.params.token;
      const { newPassword } = req.body;

      await authService.setForgotPassword(newPassword, token);
      return res.json("OK");
    } catch (e) {
      next(e);
    }
  }
}

export const authController = new AuthController();
