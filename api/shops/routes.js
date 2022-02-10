const express = require("express");

const {
  getShops,
  shopCreate,
  fetchShop,
  productCreate,
} = require("./controllers");

const upload = require("../../middleware/multer");

const shopsRouter = express.Router();

shopsRouter.param("shopId", async (req, res, next, shopId) => {
  const shop = await fetchShop(shopId, next);
  if (shop) {
    req.shop = shop;
    next();
  } else {
    const err = new Error("Shop Not Found");
    err.status = 404;
    next(err);
  }
});

shopsRouter.get("/", getShops);
shopsRouter.post("/", upload.single("image"), shopCreate);
shopsRouter.post("/:shopId/products", upload.single("image"), productCreate);

module.exports = shopsRouter;
