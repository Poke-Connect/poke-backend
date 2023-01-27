import express from "express";
import * as rideConnectionController from "../controllers/rideConnection.js";

const router = express.Router();

router.get("/:rideId", rideConnectionController.getRideConnections);
router.post("/:rideId", rideConnectionController.createRideConnection);
router.get(
  "/:rideId/:connectionId",
  rideConnectionController.getRideConnection
);

export default router;
