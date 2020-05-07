const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const categoryController = require("../controllers/categoryController");
const productController = require("../controllers/productController");

router.get("/", function (req, res) {
    res.render("admin/page");
});

router.get("/categories", categoryController.getCategories);
router.post("/categories", categoryController.createCategory);
router.post("/categories/delete/:_id", categoryController.deleteCategory);
router.post("/categories/update/:_id", categoryController.updateCategory);

router.get("/products", productController.getProducts);
router.post("/products", productController.createProduct);
router.post("/products/delete/:_id", productController.deleteProduct);
router.post("/products/update/:_id", productController.updateProduct);

module.exports = router;
