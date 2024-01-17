// import { NextFunction, Request, Response } from "express";

// import { ApiError } from "../errors/api.error";
//
// class CommonMiddleware {
//   public isValidId(req: Request, res: Response, next: NextFunction) {
//     try {
//       const id = Number(req.params.id);
//
//       if (!Number.isInteger(id)) {
//         throw new ApiError("wrong ID param", 400);
//       }
//       next();
//     } catch (e) {
//       next(e);
//     }
//   }
//
//   public isValidUser(req: Request, res: Response, next: NextFunction) {
//     try {
//       const { name, age, email } = req.body;
//
//       if (!age || !Number.isInteger(age) || +age < 0 || +age > 100) {
//         throw new ApiError("wrong age", 400);
//       }
//       if (!email || !email.includes("@")) {
//         throw new ApiError("wrong email", 400);
//       }
//       if (!name || name.length <= 3) {
//         throw new ApiError("wrong name", 400);
//       }
//       next();
//     } catch (e) {
//       next(e);
//     }
//   }
// }

// export const commonMiddleware = new CommonMiddleware();
