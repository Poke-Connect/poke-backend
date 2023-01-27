import express from "express";
import * as myConnectionController from "../controllers/myConnection.js";

const router = express.Router();

//user id to be replaced by auth
router.post("/:id", myConnectionController.createNewConnection);
router.get("/:id", myConnectionController.getMyConnections);
router.get("/:id/:connectionId", myConnectionController.getConnection);
// router.patch("/:userId/:chatId", myConnectionController.updateUserChat);

export default router;
