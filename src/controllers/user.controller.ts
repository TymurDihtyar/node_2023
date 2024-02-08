import { NextFunction, Request, Response } from "express";

import { IQuery } from "../interface/pagitation.interface";
import { ITokenPayload } from "../interface/token.interface";
import { UserPresenter } from "../presenter/user.presenter";
import { userService } from "../service/user.service";
import {UploadedFile} from "express-fileupload";

class UserController {
  public async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await userService.getAll();
      return res.json(users);
    } catch (e) {
      next(e);
    }
  }

  public async getAllPaginated(req: Request, res: Response, next: NextFunction) {
    try {
      const userPaginated = await userService.getMany(req.query as IQuery);
      const presentedUsers = userPaginated.data.map((user) => UserPresenter.userToResponse(user));

      return res.json({ ...userPaginated, data: presentedUsers });
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

  public async uploadAvatar(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;
      const avatar = req.files.avatar;
      await userService.uploadAvatar(userId, avatar as UploadedFile);

      return res.json("ok");
    } catch (e) {
      next(e);
    }
  }
}

export const userController = new UserController();
