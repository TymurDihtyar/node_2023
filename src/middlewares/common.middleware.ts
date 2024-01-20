import { NextFunction, Request, Response } from "express";
import { isObjectIdOrHexString } from "mongoose";

import { ApiError } from "../errors/api.error";

class CommonMiddleware {
  public isValidId(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;

      if (!isObjectIdOrHexString(id)) {
        throw new ApiError("wrong ID param", 400);
      }
      next();
    } catch (e) {
      next(e);
    }
  }
}

export const commonMiddleware = new CommonMiddleware();
