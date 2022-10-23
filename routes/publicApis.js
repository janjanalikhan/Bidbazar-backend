const express = require('express');
const router = express.Router();

const ProductController = require('../controllers/SellerControllers/ProductsController');



router.get('/products',  ProductController.getAllProducts)


module.exports = router;