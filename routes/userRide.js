import express from "express";
import * as userRideController from "../controllers/userRide.js";

const router = express.Router();

router.get("/:id", userRideController.getUserRides);

export default router;
