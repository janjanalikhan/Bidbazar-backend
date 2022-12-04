
const SellerDB = require('../../model/SellerSchema');
const ProductDB = require('../../model/ProductSchema');
const BidDB = require('../../model/BidSchema');
const BuyerDB = require('../../model/BuyerSchema');
const Admin = require('../../model/AdminSchema');


module.exports.getAdminProducts = async (req, res) => {


    //req.dbId is id of seller ProductsPaymentsToClear

    const products = await Admin.findOne({ _id: req.dbId }).populate({ path: 'Shipped', modal: 'Shipped' }).populate({ path: 'ToBeShipped', modal: 'ToBeShipped' , populate: { path: 'ProductOwner', modal: 'ProductOwner' }  })
  


    // const products = await BuyerDB.findOne({ _id: req.dbId }).populate({ path: 'BoughtProducts', modal: 'BoughtProducts' }).populate({ path: 'ProductsPaymentsToClear', modal: 'ProductsPaymentsToClear' })
    if (!products) return res.status(204).json({ 'message': 'No Projects found.' });
    try {
        res.json(products)
    }
    catch (err) {
        res.status(500).json({ 'message': err.message });
    }

}
