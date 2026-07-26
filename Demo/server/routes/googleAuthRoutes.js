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
    scope: ["profile", "email"]
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
  passport.authenticate("google", {
    session: false,
    failureRedirect: `${process.env.CLIENT_URL}/login`
  }),
  (req, res) => {
    try {
      if (!req.user) {
        return res.redirect(`${process.env.CLIENT_URL}/login`);
      }

      // 🔐 Create JWT
      const token = jwt.sign(
        { id: req.user._id },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      // ✅ REDIRECT TO LOGIN WITH TOKEN (KEY FIX)
      res.redirect(
        `${process.env.CLIENT_URL}/login?token=${token}`
      );
    } catch (error) {
      console.error("Google OAuth error:", error);
      res.redirect(`${process.env.CLIENT_URL}/login`);
    }
  }
);

module.exports = router;
