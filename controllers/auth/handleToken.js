import jwt from "jsonwebtoken";
import config from "../../config/index.js";

const TOKEN_EXPIRY = "100d";

export const handleToken = (userId) => {
  return jwt.sign({ _id: userId }, config.JWT_SECRET, {
    expiresIn: TOKEN_EXPIRY,
  });
};

export const handleRefreshToken = (userId) => {
  return jwt.sign({ _id: userId }, config.REFRESH_TOKEN_SECRET);
};
