import express from "express";
import * as authController from "../controllers/auth/index.js";

const router = express.Router();

router.post("/google-login", authController.googleLogin);
router.post("/refresh-token", authController.refreshUserToken);
router.get("/signup", authController.signup);

export default router;
