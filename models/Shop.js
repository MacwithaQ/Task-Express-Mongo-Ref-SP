// Imports mongoose
const mongoose = require("mongoose");
// Imports a package that creates a slug based on the name
const mongooseSlugPlugin = require("mongoose-slug-plugin");

const ShopSchema = new mongoose.Schema(
  {
    name: String,
    image: String,
    // Establishing a one to many relationship
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

// Package being used to create slug
ShopSchema.plugin(mongooseSlugPlugin, { tmpl: "<%=name%>" });

module.exports = mongoose.model("Shop", ShopSchema);
