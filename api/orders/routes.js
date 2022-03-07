const express = require("express");
const { checkout } = require("./controllers");

const ordersRouter = express.Router();

ordersRouter.post("/", checkout);

module.exports = ordersRouter;
