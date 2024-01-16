import { Request, Response } from "express";

import { read, write } from "../fs.service";
import { userService } from "../service/user.service";

class UserController {
  public async getAll(req: Request, res: Response) {
    try {
      const users = await userService.getAll();
      return res.status(200).json(users);
    } catch (e) {
      res.status(400).json(e.message);
    }
  }

  public async getById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const user = await userService.getById(id);

      return res.status(200).json(user);
    } catch (e) {
      res.status(400).json(e.message);
    }
  }

  public async create(req: Request, res: Response) {
    try {
      const { name, age, email } = req.body;
      const newUser = await userService.create(name, age, email);

      return res.status(201).json(newUser);
    } catch (e) {
      res.status(400).json(e.message);
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);

      await userService.delete(id);
      return res.status(204).json("User deleted");
    } catch (e) {
      res.status(400).json(e.message);
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const { name, age, email } = req.body;

      if (!Number.isInteger(id)) {
        throw new Error("wrong ID param");
      }
      if (!age || !Number.isInteger(age) || age < 0 || age > 100) {
        throw new Error("wrong age");
      }
      if (!email || !email.includes("@")) {
        throw new Error("wrong email");
      }
      if (!name || name.length <= 3) {
        throw new Error("wrong name");
      }

      const users = await read();
      const user = users.find((user) => user.id === id);
      if (!user) {
        throw new Error("user not found");
      }

      user.name = name;
      user.age = age;
      user.email = email;

      await write(users);
      return res.status(201).json(user);
    } catch (e) {
      res.status(400).json(e.message);
    }
  }
}

export const userController = new UserController();
