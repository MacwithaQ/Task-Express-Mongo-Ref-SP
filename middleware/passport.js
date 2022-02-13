const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.localStrategy = new LocalStrategy(async (user, password, done) => {
  try {
    const foundUser = await User.findOne({ user: user });
    const isPasswordMatch = foundUser
      ? await bcrypt.compare(password, foundUser.password)
      : false;
    if (isPasswordMatch) return done(null, foundUser);
    const error = {
      message: "Unauthorized",
      status: 401,
    };
    return done(error);
  } catch (error) {
    done(error);
  }
});
