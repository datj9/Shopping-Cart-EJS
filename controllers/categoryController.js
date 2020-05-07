const Category = require("../models/Category");

module.exports.getCategories = async function (req, res) {
    const categories = await Category.find();
    const errors = {};
    res.render("admin/categoryPages", { categories, errors });
};

module.exports.createCategory = async function (req, res) {
    const { name, status } = req.body;
    const errors = {};
    const category = new Category({
        name,
        status
    });
    try {
        await category.save();
        res.redirect("/admin/categories");
    } catch (err) {
        if (err.code == 11000) {
            errors.name = "Category name already exists";
        }
        const categories = await Category.find();
        res.render("admin/categoryPages", { categories, errors });
        errors.name = "";
    }
};

module.exports.deleteCategory = async function (req, res) {
    const { _id } = req.params;
    await Category.findOneAndDelete({ _id });
    res.redirect("/admin/categories");
};

module.exports.updateCategory = async function (req, res) {
    const { _id } = req.params;
    const { name, status } = req.body;
    await Category.findOneAndUpdate({ _id }, { name, status });
    res.redirect("/admin/categories");
};
