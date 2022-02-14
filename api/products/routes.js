const express = require("express");
const passport = require("passport");

const {
  getProducts,
  productDelete,
  productUpdate,
  fetchProduct,
} = require("./controllers");
const upload = require("../../middleware/multer");

const productsRouter = express.Router();

productsRouter.param("productId", async (req, res, next, productId) => {
  const product = await fetchProduct(productId, next);
  if (product) {
    req.product = product;
    next();
  } else {
    const err = new Error("Product Not Found");
    err.status = 404;
    next(err);
  }
});

productsRouter.get("/", getProducts);
productsRouter.delete(
  "/:productId",
  passport.authenticate("jwt", { session: false }),
  productDelete
);
productsRouter.put(
  "/:productId",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  productUpdate
);

module.exports = productsRouter;
