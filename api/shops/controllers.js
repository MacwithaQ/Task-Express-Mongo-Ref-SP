const Shop = require("../../models/Shop");
const Product = require("../../models/Product");
const { findById } = require("../../models/Product");

exports.fetchShop = async (shopId, next) => {
  try {
    const shop = await Shop.findById(shopId);
    return shop;
  } catch (error) {
    next(error);
  }
};

exports.getShops = async (req, res) => {
  try {
    const shops = await Shop.find().populate("products", "name image price");
    return res.json(shops);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.shopCreate = async (req, res) => {
  try {
    req.body.owner = req.user._id;
    if (req.file) {
      req.body.image = `/${req.file.path}`;
      req.body.image = req.body.image.replace("\\", "/");
    }
    const newShop = await Shop.create(req.body);
    return res.status(201).json(newShop);
  } catch (error) {
    next(error);
  }
};

exports.productCreate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `/${req.file.path}`;
      req.body.image = req.body.image.replace("\\", "/");
    }
    const { shopId } = req.params;
    const foundShop = await Shop.findById(shopId);
    console.log(foundShop.owner);
    if (String(req.user._id) === String(foundShop.owner)) {
      req.body.shop = shopId;
      const newProduct = await Product.create(req.body);
      await Shop.findByIdAndUpdate(shopId, {
        $push: { products: newProduct._id },
      });
      return res.status(201).json(newProduct);
    } else {
      res.status(500).json({ msg: "Unauthorized" });
    }
  } catch (error) {
    next(error);
  }
};
