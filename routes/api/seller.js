const express = require('express');
const router = express.Router();

const ProductController = require('../../controllers/SellerControllers/ProductsController');


const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');


router.post('/addproduct', verifyRoles(ROLES_LIST.Seller), ProductController.addProduct);
router.get('/getsellerproducts', verifyRoles(ROLES_LIST.Seller), ProductController.getSellerProducts);
router.post('/deleteproduct', verifyRoles(ROLES_LIST.Seller), ProductController.deleteProduct);
router.get('/getAllProducts', verifyRoles(ROLES_LIST.Seller, ROLES_LIST.Buyer), ProductController.getAllProducts)



// router.get('/allProject', verifyRoles(ROLES_LIST.TeamMember, ROLES_LIST.TeamLead), StudentProjectController.getAllProject)
// router.put('/project', verifyRoles(ROLES_LIST.TeamMember, ROLES_LIST.TeamLead), StudentProjectController.updateProject)


module.exports = router;