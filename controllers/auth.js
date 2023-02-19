import { OAuth2Client } from "google-auth-library";
import config from "../config/index.js";
import jwt from "jsonwebtoken";
const CLIENT_URL = "http://localhost:3000";
import User from "../models/User.js";

const googleClient = new OAuth2Client(config.GOOGLE_CLIENT_ID);

export const signup = async (req, res) => {};

export const googleLogin = async (req, res) => {
  const { idToken } = req.body;

  googleClient
    .verifyIdToken({ idToken, audience: config.GOOGLE_CLIENT_ID })
    .then((response) => {
      // console.log("Google response", response);
      const { email_verified, name, email, picture } = response.payload;
      if (email_verified) {
        User.findOne({ email }).exec((err, user) => {
          if (err) {
            return res.status(404);
          }
          if (user) {
            const token = jwt.sign({ _id: user._id }, config.JWT_SECRET, {
              expiresIn: "7d",
            });
            console.log("old user sign in");
            return res.json({ token, user });
          }
          if (!user) {
            const newUser = new User({
              displayName: name,
              email,
              photoURL: picture,
            });
            newUser.save((err, data) => {
              if (err) {
                console.log("err google login on user save", err);
                return res
                  .status(400)
                  .json({ error: "User sign up failed on save" });
              }
              const token = jwt.sign({ _id: data._id }, config.JWT_SECRET, {
                expiresIn: "7d",
              });
              console.log("new user sign in");
              return res.json({ token, user: data });
            });
          }
        });
      } else {
        return res.status(400).json({ error: "Email not verified. Try again" });
      }
    });
};
