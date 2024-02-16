import { Router } from "express";

import { authController } from "../../../node_2023/src/controllers/auth.controller";
import { authMiddleware } from "../../../node_2023/src/middlewares/auth.middleware";
import { commonMiddleware } from "../../../node_2023/src/middlewares/common.middleware";
import { userMiddleware } from "../../../node_2023/src/middlewares/user.middleware";
import { UserValidator } from "../../../node_2023/src/validator/user.validator";

const router = Router();

router.post("/sign-up", commonMiddleware.isBodyValid(UserValidator.create), authController.singUp);

router.post("/sign-in", commonMiddleware.isBodyValid(UserValidator.login), authController.singIn);

router.post("/refresh", authMiddleware.checkRefreshToken, authController.refresh);

router.post("/forgot-password", commonMiddleware.isBodyValid(UserValidator.forgotPassword), userMiddleware.isUserExist("email"), authController.forgotPassword);

router.put("/forgot-password/:token", commonMiddleware.isBodyValid(UserValidator.setForgotPassword), authController.setForgotPassword);

router.put("/verify/:token", authController.verify);

router.post("/change-password", commonMiddleware.isBodyValid(UserValidator.changePassword), authMiddleware.checkAccessToken, authController.changePassword);

export const authRouter = router;
