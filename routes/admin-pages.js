const express = require("express");
const router = express.Router();
const Category = require("../models/Category");

router.get("/", function (req, res) {
    res.render("admin/page");
});

router.get("/categories", async function (req, res) {
    const categories = await Category.find();
    const errors = {};
    res.render("admin/categoryPages", { categories, errors });
});

router.post("/categories", async function (req, res) {
    const { name, status } = req.body;
    const errors = {};
    const category = new Category({
        name,
        status
    });
    try {
        await category.save();
        const categories = await Category.find();
        res.redirect("/admin/categories");
    } catch (err) {
        if (err.code == 11000) {
            errors.name = "Category name already exists";
        }
        const categories = await Category.find();
        res.render("admin/categoryPages", { categories, errors });
        errors.name = "";
    }
});

router.post("/categories/delete/:id", async function (req, res) {
    const { id } = req.params;
    const errors = {};
    await Category.findOneAndDelete({ _id: id });
    const categories = await Category.find();
    res.redirect("/admin/categories");
});

router.post("/categories/update/:id", async function (req, res) {});

module.exports = router;
