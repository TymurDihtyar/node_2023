import express, { NextFunction, Request, Response } from "express";

import { ApiError } from "./errors/api.error";
import { userRouter } from "./router/user.router";

const app = express();
const port = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);

app.use(
  "*",
  (err: ApiError, req: Request, res: Response, next: NextFunction) => {
    return res
      .status(err?.status)
      .json({ message: err?.message, status: err?.status });
  },
);

app.listen(port, () => {
  console.log(`Сервер слухає на порту ${port}`);
});
