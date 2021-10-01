const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = mongoose.model("users");

// options for passport strategy
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.TOKEN_KEY,
};

const strategy = new JwtStrategy(opts, (payload, next) => {
  // Look up user and return next
  User.findOne({ _id: payload.id })
    .then((user) => {
      if (user) {
        return next(null, user);
      } else {
        return next(null, false);
      }
    })
    .catch((err) => next(err, null));
});

module.exports = (passport) => {
  passport.use(strategy);
};
