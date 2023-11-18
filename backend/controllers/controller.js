const Product = require("../Models/model");
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
    if (
      !req.user ||
      !req.user.email ||
      req.user.email !== process.env.REAL_ADMIN
    ) {
      return res
        .status(403)
        .send({ msg: "Unauthorized. Only admin can create products." });
    }
    const { name, cost, description, category} = req.body;
    const product = {
      name,
      cost,
      description,
      category,
      // image,
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

const ProductList= async (req, res) => {
  try {
    const { category } = req.params;
    const products = await Product.find({ category });
    res.status(200).send(products);
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "internal server error" });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).send({ msg: "Product not found" });
    }
    res.status(200).send(product);
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
};

module.exports = {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories,
  ProductList,
  getProductById,
};
