const express = require("express");
const { signUp, signIn, fetchUsers } = require("./controllers");
const passport = require("passport");

const usersRouter = express.Router();

usersRouter.get("/", fetchUsers);
usersRouter.post("/signup", signUp);
usersRouter.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  signIn
);
module.exports = usersRouter;
