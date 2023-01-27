import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";
import config from "./config/index.js";
import User from "./models/user.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: config.GOOGLE_CLIENT_ID,
      clientSecret: config.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, done) {
      User.findOne({ googleId: profile.id }, function (err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          const user = {
            googleId: profile.id,
            email: profile.emails[0].value,
            displayName: profile.displayName,
            photoURL: profile.photos[0].value,
          };
          const newUser = new User(user);
          newUser.save();
          return done(null, user);
        }
        return done(null, user);
      });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});
