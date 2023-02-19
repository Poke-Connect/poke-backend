import express from "express";
import * as authController from "../controllers/auth.js";

const router = express.Router();

router.post("/google-login", authController.googleLogin);
router.get("/signup", authController.signup);

export default router;
