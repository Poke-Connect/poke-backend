import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import config from "./config/index.js";
import { connectDatabase } from "./config/database.js";
import rootRouter from "./routes/index.js";
import { Server } from "socket.io";
import { setupSocketIO } from "./socket.js";
import { createServer } from "http";

mongoose.set("strictQuery", false);

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PATCH,DELETE,PUT",
    credentials: true,
  })
);

app.use("/", rootRouter);

const initApp = async () => {
  try {
    await connectDatabase();
    const httpServer = createServer(app);
    const io = new Server(httpServer, {
      cors: {
        origin: "http://localhost:3000",
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
    throw e;
  }
};

const server = initApp().catch((err) =>
  console.log(`Error on startup! ${err}`)
);
