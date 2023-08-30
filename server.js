import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import { connectDatabase } from "./config/database.js";
import rootRouter from "./routes/index.js";
import { Server } from "socket.io";
import { setupSocketIO } from "./socket.js";
import { createServer } from "http";
import cookieParser from "cookie-parser";
import { corsOptions } from "./config/corsOption.js";
import { allowedOrigins } from "./config/allowedOrigins.js";
import config from "./config/index.js";
import logger from "./services/logger.js";

mongoose.set("strictQuery", false);

const app = express();

logger.info("Informational message");
logger.error("Error message");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));
app.use(cookieParser());
app.use(cors(corsOptions));

// API endpoints
app.use("/api", rootRouter);

const initApp = async () => {
  try {
    await connectDatabase();
    const httpServer = createServer(app);
    const io = new Server(httpServer, {
      cors: {
        origin: allowedOrigins,
        allowedHeaders: ["my-custom-header"],
        credentials: true,
      },
    });

    setupSocketIO(io);

    httpServer.listen(config.PORT, () => {
      console.log(`Server Running on new port: ${config.PORT}`);
    });

    return server;
  } catch (e) {
    console.log("error", e);
    throw e;
  }
};

const server = initApp().catch((err) =>
  console.log(`Error on startup! ${err}`)
);
