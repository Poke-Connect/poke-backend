import express from "express";
import * as userController from "../controllers/user.js";
import { requireSignIn, requireSelf } from "../middleware/auth.js";

const router = express.Router();

router.get("/", userController.getUsers);
router.post("/", userController.createUser);
router.get("/:id", requireSignIn, userController.getUser);
router.patch("/:id", requireSignIn, requireSelf, userController.updateUser);
router.delete("/:id", userController.deleteUser);

export default router;
