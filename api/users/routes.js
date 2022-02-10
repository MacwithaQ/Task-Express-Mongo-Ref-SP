const express = require("express");
const { signUp } = require("./controllers");

const usersRouter = express.Router();

usersRouter.post("/", signUp);

module.exports = usersRouter;
