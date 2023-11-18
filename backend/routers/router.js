const express = require("express");
const router = express.Router();
const verifyToken = require("../Middleware/auth");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories,
  ProductList,
  getProductById,
} = require("../Controllers/controller");


router.get("/", getAllProducts);
router.get("/category/:category", ProductList);
router.get("/categories", getCategories);
router.get("/:id", getProductById);
router.post("/create",verifyToken, createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
