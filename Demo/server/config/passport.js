const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;
        const googleId = profile.id;

        // 1️⃣ Check if user already logged in with Google
        let user = await User.findOne({ googleId });

        if (user) {
          return done(null, user);
        }

        // 2️⃣ Check if user exists with same email (email/password signup)
        user = await User.findOne({ email });

        if (user) {
          // 🔗 LINK GOOGLE ACCOUNT
          user.googleId = googleId;
          await user.save();
          return done(null, user);
        }

        // 3️⃣ Create brand new Google user
        user = await User.create({
          name: profile.displayName,
          email,
          googleId
        });

        return done(null, user);

      } catch (error) {
        console.error("Google OAuth Error:", error);
        return done(error, null);
      }
    }
  )
);
