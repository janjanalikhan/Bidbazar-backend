const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/signup', authController.SignUp);
router.post('/seller', authController.SellerLogin);
router.post('/buyer', authController.BuyerLogin);
router.post('/admin', authController.AdminLogin);

module.exports = router;