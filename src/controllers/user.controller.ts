import { NextFunction, Request, Response } from "express";

import { userService } from "../service/user.service";

class UserController {
  public async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await userService.getAll();
      return res.status(200).json(users);
    } catch (e) {
      next(e);
    }
  }

  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const user = await userService.getById(id);

      return res.status(200).json(user);
    } catch (e) {
      next(e);
    }
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, age, email } = req.body;
      const newUser = await userService.create(name, age, email);

      return res.status(201).json(newUser);
    } catch (e) {
      next(e);
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);

      const user = await userService.delete(id);
      return res.status(200).json(user);
    } catch (e) {
      next(e);
    }
  }

  public async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const { name, age, email } = req.body;

      const users = await userService.put(id, name, age, email);

      return res.status(201).json(users);
    } catch (e) {
      next(e);
    }
  }
}

export const userController = new UserController();
