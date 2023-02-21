import express from "express";
import authRoutes from "./authNew.js";
import userRoutes from "./user.js";
import rideRoutes from "./ride.js";
import userRidesRoutes from "./userRide.js";
import rideConnectionRoutes from "./rideConnection.js";
import connectionRoutes from "./connection.js";
import messageRoutes from "./message.js";
import feedbackRoutes from "./feedback.js";
import { requireSignIn } from "../middleware/auth.js";

const rootRouter = express.Router();

rootRouter.use("/auth", authRoutes);
rootRouter.use("/auth", authRoutes);
rootRouter.use("/user", userRoutes);
rootRouter.use("/ride", requireSignIn, rideRoutes);
rootRouter.use("/userRides", userRidesRoutes);
rootRouter.use("/feedback", feedbackRoutes);
rootRouter.use("/connection", connectionRoutes);
rootRouter.use("/rideConnection", rideConnectionRoutes);
rootRouter.use("/message", messageRoutes);

export default rootRouter;
