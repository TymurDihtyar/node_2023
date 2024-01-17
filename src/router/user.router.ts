import { Router } from "express";

import { userController } from "../controllers/user.controller";
// import { commonMiddleware } from "../middlewares/common.middleware";

const router = Router();

router.get("/", userController.getAll);

router.get("/:id", userController.getById);

router.post("/", userController.singUp);

// router.delete("/:id", commonMiddleware.isValidId, userController.delete);
//
// router.put("/:id", commonMiddleware.isValidId, commonMiddleware.isValidUser, userController.update);

export const userRouter = router;
