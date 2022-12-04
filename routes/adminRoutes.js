const express = require('express');
const router = express.Router();


const AdminController = require('../controllers/AdminControllers/AdminController');



router.get('/getadminproducts', AdminController.getAdminProducts);


// router.post('/addproduct', verifyRoles(ROLES_LIST.Seller), ProductController.addProduct);
// router.get('/getsellerproducts', verifyRoles(ROLES_LIST.Seller), ProductController.getSellerProducts);
// router.post('/deleteproduct', verifyRoles(ROLES_LIST.Seller), ProductController.deleteProduct);
// router.get('/getAllProducts', verifyRoles(ROLES_LIST.Seller, ROLES_LIST.Buyer), ProductController.getAllProducts)

// router.post('/newBidSeen', verifyRoles(ROLES_LIST.Seller), ProductController.newBidSeen)

module.exports = router;