import express from "express";
import authRoutes from "./auth.js";
import userRoutes from "./user.js";
import rideRoutes from "./ride.js";
import userRidesRoutes from "./userRide.js";
import rideConnectionRoutes from "./rideConnection.js";
import myConnectionRoutes from "./myConnection.js";
import chatRoutes from "./chat.js";
import feedbackRoutes from "./feedback.js";

const rootRouter = express.Router();

rootRouter.use("/auth", authRoutes);
rootRouter.use("/user", userRoutes);
rootRouter.use("/ride", rideRoutes);
rootRouter.use("/userRides", userRidesRoutes);
rootRouter.use("/feedback", feedbackRoutes);
rootRouter.use("/myConnections", myConnectionRoutes);
rootRouter.use("/rideConnection", rideConnectionRoutes);
rootRouter.use("/chat", chatRoutes);

export default rootRouter;
