import express from "express";
import authRoutes from "./authNew.js";
import userRoutes from "./user.js";
import rideRoutes from "./ride.js";
import userRidesRoutes from "./userRide.js";
import rideConnectionRoutes from "./rideConnection.js";
// import myConnectionRoutes from "./myConnection.js";
import connectionRoutes from "./connection.js";
import chatRoutes from "./chat.js";
import feedbackRoutes from "./feedback.js";
import { requireSignIn } from "../middleware/auth.js";

const rootRouter = express.Router();

rootRouter.use("/auth", authRoutes);
rootRouter.use("/auth", authRoutes);
rootRouter.use("/user", userRoutes);
rootRouter.use("/ride", requireSignIn, rideRoutes);
rootRouter.use("/userRides", userRidesRoutes);
rootRouter.use("/feedback", feedbackRoutes);
// rootRouter.use("/myConnections", myConnectionRoutes);
rootRouter.use("/connections", connectionRoutes);
rootRouter.use("/rideConnection", rideConnectionRoutes);
rootRouter.use("/chat", chatRoutes);

export default rootRouter;
