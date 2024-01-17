import { Router } from "express";

import { authController } from "../controllers/auth.controller";

const router = Router();

router.post("/sign-up", authController.singUp);

router.post("/sign-in", authController.singIn);

export const authRouter = router;
