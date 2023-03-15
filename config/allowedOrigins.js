import { ENV } from "./envConfig.js";

const ALLOWED_ORIGINS = {
  DEV: [
    "https://pokeconnect.com",
    "https://poke-connect-web.onrender.com",
    "http://localhost:3000",
  ],
  PROD: ["https://pokeconnect.com", "https://poke-connect-web.onrender.com"],
};

export const allowedOrigins = ENV ? ALLOWED_ORIGINS[ENV] : ALLOWED_ORIGINS.PROD;
