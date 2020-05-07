const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: String,
        required: true
    },
    products: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Product" }]
});

module.exports = new mongoose.model("Category", CategorySchema, "Categories");
