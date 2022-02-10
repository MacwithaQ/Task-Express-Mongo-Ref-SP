const express = require("express");
const cors = require("cors");
const connectDb = require("./database");
const productsRouter = require("./api/products/routes");
const shopsRouter = require("./api/shops/routes");
const usersRouter = require("./api/users/routes");

const app = express();
connectDb();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(
    `${req.method} ${req.protocol}://${req.get("host")}${req.originalUrl}`
  );
  next();
});

// Routes
app.use("/api/products", productsRouter);
app.use("/api/shops", shopsRouter);
app.use("/api/users", usersRouter);

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});
app.listen(process.env.PORT || 5000);
