import { expressjwt } from "express-jwt";
import config from "../config/index.js";

export const requireSignIn = expressjwt({
  secret: config.JWT_SECRET,
  algorithms: ["HS256"],
});

export const requireSelf = (req, res, next) => {
  if (req.auth._id !== req.params.id) {
    return res.status(404).json({
      error: "Requested unauthorised access",
    });
  } else {
    next();
  }
};
