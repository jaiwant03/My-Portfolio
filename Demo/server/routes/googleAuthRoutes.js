const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const router = express.Router();

/*
====================================
STEP 1: REDIRECT USER TO GOOGLE
GET /auth/google
====================================
*/
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account"   // always show Google account picker
  })
);

/*
====================================
STEP 2: GOOGLE CALLBACK
GET /auth/google/callback
====================================
*/
router.get(
  "/google/callback",
  (req, res, next) => {
    passport.authenticate("google", {
      session: false,
      failureRedirect: `${process.env.CLIENT_URL}/login`
    }, (err, user, info) => {
      if (err) {
        console.error("Passport Google error:", err);
        return res.redirect(`${process.env.CLIENT_URL}/login`);
      }
      if (!user) {
        console.error("Google auth — no user returned. Info:", info);
        return res.redirect(`${process.env.CLIENT_URL}/login`);
      }
      req.user = user;
      next();
    })(req, res, next);
  },
  (req, res) => {
    try {
      console.log("Google callback — CLIENT_URL:", process.env.CLIENT_URL);

      // 🔐 Create JWT
      const token = jwt.sign(
        { id: req.user._id },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      const redirectTo = `${process.env.CLIENT_URL}/login?token=${token}`;
      console.log("Redirecting to:", redirectTo);

      res.redirect(redirectTo);
    } catch (error) {
      console.error("Google OAuth error:", error);
      res.redirect(`${process.env.CLIENT_URL}/login`);
    }
  }
);

module.exports = router;
