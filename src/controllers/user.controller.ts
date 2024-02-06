import { NextFunction, Request, Response } from "express";

import { ITokenPayload } from "../interface/token.interface";
import { userService } from "../service/user.service";
import {UserPresenter} from "../presenter/user.presenter";

class UserController {
  public async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await userService.getAll();
      return res.json(users);
    } catch (e) {
      next(e);
    }
  }

  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const user = await userService.getById(id);

      return res.json(user);
    } catch (e) {
      next(e);
    }
  }

  public async getMe(req: Request, res: Response, next: NextFunction) {
    try {
      const jwtPayload = res.locals.jwtPayload as ITokenPayload;
      const user = await userService.getMe(jwtPayload);

      return res.json({ data: UserPresenter.userToResponse(user) });
    } catch (e) {
      next(e);
    }
  }

  public async deleteMe(req: Request, res: Response, next: NextFunction) {
    try {
      const jwtPayload = res.locals.jwtPayload as ITokenPayload;

      await userService.deleteMe(jwtPayload);

      return res.status(200).send("User deleted");
    } catch (e) {
      next(e);
    }
  }

  public async updateMe(req: Request, res: Response, next: NextFunction) {
    try {
      const jwtPayload = res.locals.jwtPayload as ITokenPayload;

      const body = req.body;

      const user = await userService.updateMe(jwtPayload, body);

      return res.json(user);
    } catch (e) {
      next(e);
    }
  }
}

export const userController = new UserController();
