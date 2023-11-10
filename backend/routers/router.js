const express = require("express");
const router = express.Router();
const verifyToken = require("../Middleware/auth");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories,
} = require("../Controllers/controller");


router.get("/", getAllProducts);
router.get("/categories", getCategories);
router.post("/create", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
