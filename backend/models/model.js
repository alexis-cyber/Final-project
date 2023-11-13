const mongoose = require("mongoose");


// schema
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  cost: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ["Clothing", "Shoes", "Accesories", "Limited Edition"],
  },
  // image: { type: String },
});

// model
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
