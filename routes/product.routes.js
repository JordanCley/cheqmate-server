const router = require("express").Router();
const ProductController = require("../controllers/product.controllers");

router.get("/products", ProductController.getProducts);

module.exports = router;