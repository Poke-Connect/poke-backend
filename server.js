import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import config from "./config/index.js";
import cookieSession from "cookie-session";
import passport from "passport";
import "./passport.js";
import { connectDatabase } from "./config/database.js";
import rootRouter from "./routes/index.js";

mongoose.set("strictQuery", false);

const app = express();

app.use(
  cookieSession({
    name: "session",
    keys: [config.COOKIE_KEY],
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PATCH,DELETE",
    credentials: true,
  })
);

app.use("/", rootRouter);

const initApp = async () => {
  try {
    await connectDatabase();
    console.log("DB connection established");
    const server = app.listen(config.PORT, () => {
      console.log(`Server Running on port: ${config.PORT}`);
    });
    return server;
  } catch (e) {
    throw e;
  }
};

const server = initApp().catch((err) =>
  console.log(`Error on startup! ${err}`)
);

//==========socket.io=========

// const server = createServer(app);
// const io = new Server(server);

// io.on("connection", (socket) => {
//   socket.emit("chat-message", "hello world");
// });
