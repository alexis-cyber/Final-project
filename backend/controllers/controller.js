const express = require("express");
const router = express.Router();
const Clothing = require("../models/model");

// GET all clothes
const getAllClothes = async (req, res) => {
  try {
    const allClothes = await Clothing.find();
    res.status(200).send(allClothes);
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Internal server error" });
  }
};

// POST a new clothe
const createClothing = async (req, res) => {
  try {
    const { name, cost, img, description } = req.body;
    const newClothing = await Clothing.create({
      name,
      cost,
      img,
      description,
    });
    res.status(200).send({ msg: "New clothing is added", newClothing });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ msg: "Internal server error. Failed to create new clothing." });
  }
};

// PUT update a clothe
const updateClothing = async (req, res) => {
  try {
    const { name, cost, img, description  } = req.body;
    const id = req.params.id;
    await Clothing.findByIdAndUpdate(id, { name, cost, img, description });
    res.status(200).send({ msg: "The clothing is updated successfully!" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ msg: "Failed to update the clothing. Internal server error." });
  }
};

// DELETE a clothe
const deleteClothing = async (req, res) => {
  try {
    const id = req.params.id;
    await Clothing.findByIdAndDelete(id);
    res.status(200).send({ msg: "The clothing is deleted successfully!" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ msg: "Failed to delete the clothing. Internal server error." });
  }
};

module.exports = {
  getAllClothes,
  createClothing,
  updateClothing,
  deleteClothing,
};
