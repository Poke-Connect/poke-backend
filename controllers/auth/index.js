import { OAuth2Client } from "google-auth-library";
import config from "../../config/index.js";
import User from "../../models/User.js";
import { handleToken, handleRefreshToken } from "./handleToken.js";
import { createNewUser } from "./createNewUser.js";
import jwt from "jsonwebtoken";
import logger from "../../services/logger.js";

const googleClient = new OAuth2Client(config.GOOGLE_CLIENT_ID);

//TODO: Fix this
export const signup = async (req, res) => {};

export const handleCreateUser = async (userData) => {
  try {
    const { name, email, picture } = userData;
    const newUser = await createNewUser(name, email, picture); // Assuming createNewUser returns a Promise
    const token = handleToken(newUser._id);

    return { token, user: newUser };
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("User sign up failed on save");
  }
};

export const googleLogin = async (req, res) => {
  logger.info("trying google login");
  try {
    const { idToken } = req.body;
    logger.info(`trying google login with id token - ${idToken}`);

    const response = await googleClient.verifyIdToken({
      idToken,
      audience: config.GOOGLE_CLIENT_ID,
    });
    const { email_verified, name, email, picture } = response.payload;
    logger.info(`verified email address  - ${email}`);

    if (email_verified) {
      const user = await User.findOne({ email }).exec();

      if (user) {
        const token = handleToken(user._id);
        logger.info(`verified email address  - ${user._id}`);

        return res.status(200).json({ token, user });
      } else {
        const { token, user } = await handleCreateUser({
          name,
          email,
          picture,
        });
        logger.info(`verified email address  - ${user._id}`);

        return res.status(200).json({ token, user });
      }
    } else {
      return res.status(400).json({ error: "Email not verified. Try again" });
    }
  } catch (error) {
    console.error("Google login error:", error);
    logger.error("google login failed");

    return res.status(500).json({ error: "An error occurred during login" });
  }
};

// export const refreshUserToken = async (req, res) => {
//   // Get the refresh token from the HTTP-only cookie
//   if (req?.cookies?.refreshToken) {
//     const { refreshToken } = req.cookies;
//     try {
//       const decoded = jwt.verify(refreshToken, config.REFRESH_TOKEN_SECRET);
//       const token = handleToken(decoded._id);

//       const newRefreshToken = handleRefreshToken(decoded._id);
//       res.cookie("refreshToken", newRefreshToken, {
//         httpOnly: true,
//         maxAge: 60 * 60 * 24 * 10 * 1000 * 10, // 100 days
//       });

//       const user = await User.findById(decoded._id);
//       if (!user) {
//         res.status(401).json({ message: "No user found" });
//       }
//       return res.json({ token, user });
//     } catch (error) {
//       res.status(401).json({ message: "Invalid refresh token" });
//     }
//   } else {
//     res.status(401).json({ message: "No refresh token found in cookies" });
//   }
// };
