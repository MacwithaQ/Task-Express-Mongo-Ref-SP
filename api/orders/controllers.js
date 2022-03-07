const Order = require("../../models/Order");

exports.checkout = async (req, res, next) => {
  try {
    return res.json({ message: "It Works" });
  } catch (error) {
    next(error);
  }
};
