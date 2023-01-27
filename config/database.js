import mongoose from "mongoose";
import config from "./index.js";

export const connectDatabase = async () => {
  try {
    await mongoose.connect(config.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDb Connected");
  } catch (e) {
    console.log("MongoDb Connection failed, error => ", e);
  }
};
