const passport = require('passport');
const User = require('../models/user/signUpUser')
const GoogleStrategy = require('passport-google-oauth20').Strategy;

//Configuration mail: mahtabhossain262@gmail.com   
const GOOGLE_CLIENT_ID = '270946633310-9roonqn2v7uaffepttpuml5516bvmu4r.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/google/authenticate",
    passReqToCallback   : true,
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});