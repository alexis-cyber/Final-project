const Product = require("../Models/model");
const cloudinary = require("../cloudinary")

const getAllProducts = async(req, res) => {
    try {
        const allProducts = await Product.find();
        res.send(allProducts);        
    } catch (err) {
        res.status(500).json({msg: "Failed to retrieve products."});
    }
};

const createProduct = async (req, res) => {

    const {name, cost, description,image} = req.body

    try {
        const result = await cloudinary.uploader.upload(image,{
            folder
        });
        const product = await Product.create({
            name,
            cost,
            description,
            image:{
                public_id: result.public_id,
                url: result.secure_url
            }
        });
        res.status(201).json({
            success: true,
            product
        })
        res.send(createdProduct);        
    } catch (err) {
        res.status(500).json({msg: "Failed to create product."});
    }
};

const updateProduct = async (req, res) => {
    try {
        const newProduct = req.body;
        const id = req.params.id;
        await Product.updateOne({_id: id}, newProduct);
        res.send("Product edited");        
    } catch (err) {
        res.status(500).json({msg: "Failed to edit product."});
    }
};

const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;
        await Product.deleteOne({_id: id});
        res.send("Product deleted.");        
    } catch (err) {
        res.status(500).json({msg: "Failed to delete product."});
    }
};

module.exports = { getAllProducts, createProduct, updateProduct, deleteProduct };