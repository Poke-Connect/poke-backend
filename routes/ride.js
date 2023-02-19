import express from "express";
import * as rideController from "../controllers/ride.js";

const router = express.Router();

router.get("/", rideController.getRides);
router.get("/filter", rideController.filterRides);
router.get("/user", rideController.getUserRides);
router.post("/", rideController.createRide);
router.get("/:id", rideController.getRide);
router.patch("/:id", rideController.updateRide);
router.patch("/:id/discoverability", rideController.updateRideDiscoverability);
router.delete("/:id", rideController.deleteRide);

export default router;
