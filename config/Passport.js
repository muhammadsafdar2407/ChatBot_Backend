const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const db = require("../db"); // Assuming you use PostgreSQL
const jwt = require("jsonwebtoken");

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const JWT_SECRET = process.env.JWT_SECRET;

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;
        const name = profile.displayName;

        // Check if user exists
        const userResult = await db.query("SELECT * FROM users WHERE email=$1", [email]);
        let user = userResult.rows[0];

        if (!user) {
          // If not exists, insert new user
          const insertResult = await db.query(
            "INSERT INTO users (name, email, password, pin) VALUES ($1, $2, $3, $4) RETURNING *",
            [name, email, "123", "123456"] // leave password blank
          );
          user = insertResult.rows[0];
        }

        // Generate JWT manually
        const token = jwt.sign(
          { id: user.id, email: user.email },
          JWT_SECRET,
          { expiresIn: "1h" }
        );

        done(null, { user, token });
      } catch (err) {
        done(err, null);
      }
    }
  )
);

module.exports = passport;