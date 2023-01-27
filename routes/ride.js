import express from "express";
import * as rideController from "../controllers/ride.js";

const router = express.Router();

router.get("/", rideController.getRides);
router.post("/", rideController.createRide);
router.get("/:id", rideController.getRide);
router.patch("/:id", rideController.updateRide);
router.delete("/:id", rideController.deleteRide);

export default router;
