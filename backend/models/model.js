const mongoose = require ("mongoose");

//schema
const clotheSchema = new mongoose.Schema ({
    name: String,
    cost: Number,
    img: String,
    description: String
});

//model 
const Clothing = mongoose.model("clothe", clotheSchema);

module.exports = Clothing;