import express from "express";
import * as chatController from "../controllers/chat.js";

const router = express.Router();

router.get("/", chatController.getChats);
router.post("/", chatController.createChat);
router.get("/:id", chatController.getChat);
router.patch("/:id", chatController.updateChat);

export default router;
