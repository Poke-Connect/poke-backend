import dotenv from "dotenv";

dotenv.config();

export default {
  PORT: process.env.PORT || 5900,
  MONGO_URI: process.env.MONGO_URI,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  JWT_SECRET: process.env.JWT_SECRET,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
  SENDINBLUE_API_KEY: process.env.SENDINBLUE_API_KEY,
};
