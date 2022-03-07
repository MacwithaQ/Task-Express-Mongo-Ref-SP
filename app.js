// IMPORTS ----------------------------------------
// Importing express to build our back-end
const express = require("express");
const cors = require("cors");

// Allow us to connect to the database
const connectDb = require("./database");

// Importing passport to be able to use it for password validation
const passport = require("passport");

// Allows us to use the local strategy as middleware for validation
const { localStrategy, jwtStrategy } = require("./middleware/passport");

// Importing routers
const productsRouter = require("./api/products/routes");
const shopsRouter = require("./api/shops/routes");
const usersRouter = require("./api/users/routes");
const ordersRouter = require("./api/orders/routes");
const path = require("path");
// --------------------------------------------------------

// Initialize app, define packages and middlewares used
const app = express();
connectDb();
app.use(cors());
app.use(express.json());
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);

// Console logs the requests being pushed to the backend
app.use((req, res, next) => {
  console.log(
    `${req.method} ${req.protocol}://${req.get("host")}${req.originalUrl}`
  );
  next();
});

app.use("/media", express.static(path.join(__dirname, "media")));
// Routes
app.use("/api/products", productsRouter);
app.use("/api/shops", shopsRouter);
app.use("/api/users", usersRouter);
app.use("/api/orders", ordersRouter);

// Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

// Localhosting
app.listen(process.env.PORT || 5000);
