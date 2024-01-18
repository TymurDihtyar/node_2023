import { Router } from "express";

import { authController } from "../controllers/auth.controller";

const router = Router();

router.post("/sign-up", authController.singUp);

router.post("/sign-in", authController.singIn);

router.post("/refresh", authController.refresh);

export const authRouter = router;
