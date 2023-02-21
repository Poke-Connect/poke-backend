import express from "express";
import * as messageController from "../controllers/message.js";

const router = express.Router();

router.post("/", messageController.addMessage);
router.get("/:connectionId", messageController.getConnectionMessages);

export default router;
