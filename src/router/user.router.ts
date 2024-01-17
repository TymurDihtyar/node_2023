import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { commonMiddleware } from "../middlewares/common.middleware";

const router = Router();

router.get("/", userController.getAll);

router.get("/:id", commonMiddleware.isValidId, userController.getById);

router.post("/", commonMiddleware.isValidUser, userController.singUp);

router.delete("/:id", commonMiddleware.isValidId, userController.deleteById);

router.put("/:id", commonMiddleware.isValidId, commonMiddleware.isValidUser, userController.updateById);

export const userRouter = router;
