import { NextFunction, Request, Response } from "express";

import { userService } from "../service/user.service";
import { IUser } from "../interface/user.interface";

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

  public async singUp(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body as Partial<IUser>;

      const newUser = await userService.singUp(body);

      return res.json(newUser);
    } catch (e) {
      next(e);
    }
  }

  // public async delete(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const id = Number(req.params.id);
  //
  //     const user = await userService.delete(id);
  //     return res.status(200).json(user);
  //   } catch (e) {
  //     next(e);
  //   }
  // }
  //
  // public async update(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const id = Number(req.params.id);
  //     const { name, age, email } = req.body;
  //
  //     const users = await userService.put(id, name, age, email);
  //
  //     return res.status(201).json(users);
  //   } catch (e) {
  //     next(e);
  //   }
  // }
}

export const userController = new UserController();
