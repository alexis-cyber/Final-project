const express = require ("express");
const mongoose = require ("mongoose");
const clothe = require ("../models/model");

//get
const findClothe = async (req, res) => {
    try {
        const allclothes = await clothe.find();
        res.status(200).send(allclothes);
    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: "Internal server error" });
    }
};

//post
const addClothe = async (req,res) => {
    try {
        let author = req.user.id;
        // console.log(author);
        let clothe = req.body;
        // console.log(clothe);
        const createdclothe = await clothe.create(clothe);
        res.status(200).send({ msg: "new clothe is added", createdclothe });
    } catch (error) {
        console.log(error); 
        res.status(500).send({ msg: "Internal server error. We failed to create the new clothe." });
    }
};

//put
const  updateClothe = async (req, res) => {
    try {
        let clientValue = req.body;
        let id = req.params.id;
        await clothe.updateOne ({ _id: id }, clientValue);
        res.status(200).send ({msg: "The clothe updated successfully!"});
    } catch (error) {
        console.log (error);
        res.status(500).send({ msg: "Sorry, we failed to update the clothe" });
    }
};

//delete
const deleteClothe = async (req,res) => {
    try {
        await clothe.deleteOne({_id: req.params.id });
        res.status(200).send ({msg: "The clothe is deleted successfully!"});
    } catch (error) {
        console.log (error);
        res.status(500).send({ msg: "Failed to delete the clothe." }); 
    }
};

module.exports = { findClothe, addClothe, updateClothe, deleteClothe }
 
 
 
