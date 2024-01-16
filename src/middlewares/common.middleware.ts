import { NextFunction, Request, Response } from "express";

class CommonMiddleware {
  public isValidId(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);

      if (!Number.isInteger(id)) {
        throw new Error("wrong ID param");
      }
      next();
    } catch (e) {
      next(e);
    }
  }

  public isValidUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, age, email } = req.body;
      if (!age || !Number.isInteger(age) || age < 0 || age > 100) {
        throw new Error("wrong age");
      }
      if (!email || !email.includes("@")) {
        throw new Error("wrong email");
      }
      if (!name || name.length <= 3) {
        throw new Error("wrong name");
      }
      next();
    } catch (e) {
      next(e);
    }
  }
}

export const commonMiddleware = new CommonMiddleware();
