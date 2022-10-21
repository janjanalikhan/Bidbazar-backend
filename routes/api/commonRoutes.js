const express = require('express');
const router = express.Router();

const ProductController = require('../../controllers/SellerControllers/ProductsController');


const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');


router.get('/products', verifyRoles(ROLES_LIST.Seller, ROLES_LIST.Buyer), ProductController.getAllProducts)
router.post('/product', verifyRoles(ROLES_LIST.Seller, ROLES_LIST.Buyer), ProductController.getSingleProducts)



// router.get('/allProject', verifyRoles(ROLES_LIST.TeamMember, ROLES_LIST.TeamLead), StudentProjectController.getAllProject)
// router.put('/project', verifyRoles(ROLES_LIST.TeamMember, ROLES_LIST.TeamLead), StudentProjectController.updateProject)


module.exports = router;