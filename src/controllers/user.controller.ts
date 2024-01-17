import { NextFunction, Request, Response } from "express";

import { userService } from "../service/user.service";

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

  public async deleteById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;

      await userService.deleteById(id);

      return res.status(200).send("User deleted");
    } catch (e) {
      next(e);
    }
  }

  public async updateById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const body = req.body;

      const user = await userService.updateById(id, body);

      return res.json(user);
    } catch (e) {
      next(e);
    }
  }
}

export const userController = new UserController();
