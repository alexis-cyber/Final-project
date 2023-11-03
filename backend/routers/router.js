const express = require("express");
const router = express.Router();

const {
  getAllClothes,
  createClothing,
  updateClothing,
  deleteClothing,
} = require("../controllers/controller");

//get
router.get("/clothes", getAllClothes);

//post
router.post("/clothe/create", createClothing);

//put
router.put("/:id", updateClothing);

//delete
router.delete("/:id", deleteClothing);

module.exports = router;
