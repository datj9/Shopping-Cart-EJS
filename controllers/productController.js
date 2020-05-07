const Product = require("../models/Product");
const Category = require("../models/Category");

const errors = {};

module.exports.getProducts = async function (req, res) {
    const products = await Product.find().populate("category");
    const categories = await Category.find();
    const errors = {};
    res.render("admin/productPages", { products, categories, errors });
};

module.exports.createProduct = async function (req, res) {
    const { name, categoryName } = req.body;
    const price = parseFloat(req.body.price);
    const quantity = parseInt(req.body.quantity);
    const category = await Category.findOne({ name: categoryName });

    const product = new Product({
        name,
        price,
        quantity,
        category: category._id
    });
    try {
        await product.save();
        res.redirect("/admin/products");
    } catch (error) {
        if (error.code == 11000) {
            const categories = await Category.find();
            const products = await Product.find().populate("category");
            errors.name = "Duplicate product name";
            res.render("admin/productPages", { products, categories, errors });
        }
    }
};

module.exports.deleteProduct = async function (req, res) {
    const { _id } = req.params;
    await Product.findOneAndDelete({ _id });
    res.redirect("/admin/products");
};

module.exports.updateProduct = async function (req, res) {
    const { name, quantity, price, categoryName } = req.body;
    const { _id } = req.params;
    const category = await Category.findOne({ name: categoryName });
    await Product.findOneAndUpdate({ _id }, { name, quantity, price, category: category._id });
    res.redirect("/admin/products");
};
