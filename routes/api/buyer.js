const express = require('express');
const router = express.Router();

const BidController = require('../../controllers/BuyerControllers/BidController');

const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.post('/checkout', verifyRoles(ROLES_LIST.Buyer), BidController.checkout);
router.post('/placebid', verifyRoles(ROLES_LIST.Buyer), BidController.placeBid)
router.get('/getbuyerproducts', verifyRoles(ROLES_LIST.Buyer), BidController.getBuyerproducts);

router.post('/changeFromDatabase', verifyRoles(ROLES_LIST.Buyer), BidController.changeFromDatabase);

// router.get('/allProject', verifyRoles(ROLES_LIST.TeamMember, ROLES_LIST.TeamLead), StudentProjectController.getAllProject)
// router.put('/project', verifyRoles(ROLES_LIST.TeamMember, ROLES_LIST.TeamLead), StudentProjectController.updateProject)


module.exports = router;