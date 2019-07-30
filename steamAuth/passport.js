const passport = require('passport');
const { Strategy } = require('passport-steam');
const dotenv = require('dotenv');

dotenv.config();

passport.serializeUser((user, done) => {
  done(null, user._json);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

passport.use(
  new Strategy(
    {
      returnURL: `${process.env.URL || 'http://localhost:3001'}/auth/steam/return`,
      realm: process.env.URL || 'http://localhost:3001',
      apiKey: process.env.STEAM_API_KEY
    },
    (identifier, profile, done) => {
      // console.log(profile);
      return done(null, profile);
    }
  )
);

module.exports = passport;