const mongoose = require("mongoose");
const cloudinary = require("../cloudinary");

// schema
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
});

// model
const Product = mongoose.model("Product", productSchema);

module.exports = Product;


