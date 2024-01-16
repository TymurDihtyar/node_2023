import express from "express";

import { userRouter } from "./router/user.router";

const app = express();
const port = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);

app.listen(port, () => {
  console.log(`Сервер слухає на порту ${port}`);
});
