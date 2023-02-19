import express from "express";
import passport from "passport";

const router = express.Router();

const CLIENT_URL = "http://localhost:3000";

router.get("/login/failed", (_req, res) => {
  res.status(401).json({
    success: false,
    message: "login failure",
  });
});

router.get("/login/success", (req, res) => {
  if (req.user) {
    console.log("user sign in success");
    res.status(200).json({
      success: true,
      message: "login sucessfull",
      user: req.user,
    });
  }
});

router.get("/getUser", (req, res) => {
  if (req.user) {
    console.log("user sign in success");
    res.status(200).json({
      success: true,
      message: "login sucessfull",
      user: req.user,
    });
  } else {
    res.status(401).json({
      success: false,
      message: "login failure",
    });
  }
});

router.get("/logout", (req, res) => {
  req.logOut();
  res.redirect(CLIENT_URL);
});

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

export default router;
