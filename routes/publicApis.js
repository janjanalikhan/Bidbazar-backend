const express = require('express');
const router = express.Router();

const ProductController = require('../controllers/SellerControllers/ProductsController');



router.get('/products',  ProductController.getAllProducts)
router.post('/forgotpassword',ProductController.forgotPassword)

router.post('/sellerproducts',  ProductController.sellerProducts)



module.exports = router;