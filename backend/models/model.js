const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  cost: Date,
  description: String,
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
