import express from "express";
import * as connectionController from "../controllers/connection.js";

const router = express.Router();

router.post("/", connectionController.createOrGetConnection);
router.get("/", connectionController.getUserConnections);
router.get("/:connectionId", connectionController.getConnection);
router.patch("/:connectionId", connectionController.updateConnection);

export default router;
