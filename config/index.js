import dotenv from "dotenv";

dotenv.config();

export default {
  PORT: process.env.PORT || 5900,
  MONGO_URI: process.env.MONGO_URI,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  COOKIE_KEY: process.env.COOKIE_KEY,
};
