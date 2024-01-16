import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { commonMiddleware } from "../middlewares/common.middleware";

const router = Router();

router.get("/", userController.getAll);

router.get("/:id", commonMiddleware.isValidId, userController.getById);

router.post("/", commonMiddleware.isValidUser, userController.create);

router.delete("/:id", commonMiddleware.isValidId, userController.delete);

router.put("/:id", commonMiddleware.isValidId, commonMiddleware.isValidUser, userController.update);

export const userRouter = router;
