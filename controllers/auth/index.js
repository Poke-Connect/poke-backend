import { OAuth2Client } from "google-auth-library";
import config from "../../config/index.js";
import User from "../../models/User.js";
import { handleToken, handleRefreshToken } from "./handleToken.js";
import { createNewUser } from "./createNewUser.js";
import jwt from "jsonwebtoken";

const googleClient = new OAuth2Client(config.GOOGLE_CLIENT_ID);

export const signup = async (req, res) => {};

export const googleLogin = async (req, res) => {
  const { idToken } = req.body;

  //Authenticate user
  const response = await googleClient.verifyIdToken({
    idToken,
    audience: config.GOOGLE_CLIENT_ID,
  });

  const { email_verified, name, email, picture } = response.payload;

  if (email_verified) {
    User.findOne({ email }).exec((err, user) => {
      if (err) {
        return res.status(404);
      }
      if (user) {
        //Handle Token
        const token = handleToken(user._id);
        const refreshToken = handleRefreshToken(user._id);
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          maxAge: 60 * 60 * 24 * 10 * 1000, // 10 days
        });
        return res.json({ token, user });
      }
      if (!user) {
        //Create and save new user
        const newUser = createNewUser(name, email, picture);
        newUser.save((err, data) => {
          if (err) {
            console.log("err google login on user save", err);
            return res
              .status(400)
              .json({ error: "User sign up failed on save" });
          }

          //Handle Token
          const token = handleToken(data._id);
          const refreshToken = handleRefreshToken(data._id);
          res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 10 * 1000, // 10 days
          });
          return res.json({ token, user: data });
        });
      }
    });
  } else {
    //Handle Failure
    return res.status(400).json({ error: "Email not verified. Try again" });
  }
};

export const refreshUserToken = async (req, res) => {
  // Get the refresh token from the HTTP-only cookie
  if (req?.cookies?.refreshToken) {
    const { refreshToken } = req.cookies;
    try {
      const decoded = jwt.verify(refreshToken, config.REFRESH_TOKEN_SECRET);
      const token = handleToken(decoded._id);

      const newRefreshToken = handleRefreshToken(decoded._id);
      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 10 * 1000, // 10 days
      });

      const user = await User.findById(decoded._id);
      if (!user) {
        res.status(401).json({ message: "No user found" });
      }
      return res.json({ token, user });
    } catch (error) {
      res.status(401).json({ message: "Invalid refresh token" });
    }
  } else {
    res.status(401).json({ message: "No refresh token found in cookies" });
  }
};
