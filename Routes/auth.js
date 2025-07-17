const express = require("express");
const passport = require("../config/Passport");
const env = require("dotenv")
env.config();

const router = express.Router();

// Step 1: Redirect to Google
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Step 2: Callback from Google
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    // Extract JWT from req.user.token
    const { token, user } = req.user;

    // Redirect to frontend with token as query param
    res.redirect(`${process.env.FRONTEND_URL}/google-login-success?token=${token}`);
  }
);

module.exports = router;
