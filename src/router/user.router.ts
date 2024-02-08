import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { fileMiddleware } from "../middlewares/file.middleware";
import { UserValidator } from "../validator/user.validator";

const router = Router();

router.get("/", userController.getAllPaginated);

router.get("/me", authMiddleware.checkAccessToken, userController.getMe);
router.put("/me", commonMiddleware.isBodyValid(UserValidator.update), authMiddleware.checkAccessToken, userController.updateMe);
router.delete("/me", authMiddleware.checkAccessToken, userController.deleteMe);

router.get("/:id", commonMiddleware.isValidId, userController.getById);

router.post("/avatar", authMiddleware.checkAccessToken, fileMiddleware.isAvatarValid, userController.uploadAvatar);

export const userRouter = router;
