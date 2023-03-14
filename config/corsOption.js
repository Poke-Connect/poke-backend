import { allowedOrigins } from "./allowedOrigins.js";

export const corsOptions = {
  origin: allowedOrigins,
  methods: "GET,POST,PATCH,DELETE,PUT",
  credentials: true,
  optionsSuccessStatus: 200,
};
