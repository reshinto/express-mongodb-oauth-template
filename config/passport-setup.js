const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const keys = require("./keys");
const User = require("../models/user-model");

passport.serializeUser((user, done) => {
  // 1st arg is error, but since will not have error, null is used
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    // 1st arg is error, but since will not have error, null is used
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy({
    // options for the google strategy
    callbackURL: "/auth/google/redirect",
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret,
  }, (accessToken, refreshToken, profile, done) => {
    // accessToken is given by google
    // refreshToken is required to refresh the expired accessToken

    // check if user already exists in our db
    User.findOne({googleId: profile.id}).then((currentUser) => {
      if (currentUser) {
        // already have the user
        console.log(`user is: ${currentUser}`);
        // 1st arg is error, but since will not have error, null is used
        done(null, currentUser);
      } else {
        // if not, create user in our db
        // extract desired data from google
        // save it to database
        console.log(profile);
        new User({
          username: profile.displayName,
          googleId: profile.id,
          thumbnail: profile._json.picture,
        }).save().then((newUser) => {
          console.log(`new user created: ${newUser}`);
          done(null, newUser);
        });
      }
    });
  })
);
