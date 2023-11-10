const Product = require("../Models/model");
const cloudinary = require("../cloudinary");
require("dotenv").config;
const verifyToken = require("../Middleware/auth");

const getAllProducts = async (req, res) => {
  try {
    const allProducts = await Product.find();
    res.send(allProducts);
  } catch (err) {
    res.status(500).json({ msg: "Failed to retrieve products." });
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, cost, description, category, image } = req.body;
    const product = {
      name,
      cost,
      description,
      category,
      image,
    };

    let createdProduct = await Product.create(product);
    res.send(createdProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Failed to create product." });
  }
};

const updateProduct = async (req, res) => {
  try {
    const newProduct = req.body;
    const id = req.params.id;
    await Product.updateOne({ _id: id }, newProduct);
    res.send("Product edited");
  } catch (err) {
    res.status(500).json({ msg: "Failed to edit product." });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    await Product.deleteOne({ _id: id });
    res.send("Product deleted.");
  } catch (err) {
    res.status(500).json({ msg: "Failed to delete product." });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await Product.distinct("category");
    res.send(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Failed to retrieve categories." });
  }
};


module.exports = {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories,
};
