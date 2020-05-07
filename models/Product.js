const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        default: 0
    },
    quantity: {
        type: Number,
        required: true,
        default: 0
    },
    category: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: "Category"
    }
});

module.exports = new mongoose.model("Product", ProductSchema);
