import express from "express";
import * as feedbackController from "../controllers/feedback.js";

const router = express.Router();

router.post("/", feedbackController.createFeedback);

export default router;
