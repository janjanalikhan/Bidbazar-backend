
const SellerDB = require('../../model/SellerSchema');
const ProductDB = require('../../model/ProductSchema');
const BidDB = require('../../model/BidSchema');
const BuyerDB = require('../../model/BuyerSchema');
const Admin = require('../../model/AdminSchema');

//deleteSeller

module.exports.deleteSeller = async (req, res) => {



    try {
        const seller = await SellerDB.findOne({ _id: req.body.SellerID })
        const result = await seller.deleteOne(); //{ _id: req.body.id }
        res.json(result);

    }
    catch (err) {

        res.status(500).json({ 'message': err.message });
    }

}
module.exports.deleteBuyer = async (req, res) => {

    console.log(req.body)


    try {
        const Buyer = await BuyerDB.findOne({ _id: req.body.BuyerID })
        const result = await Buyer.deleteOne(); //{ _id: req.body.id }
        res.json(result);

    }
    catch (err) {
        res.status(500).json({ 'message': err.message });

    }

}
module.exports.getBuyers = async (req, res) => {


    //req.dbId is id of seller ProductsPaymentsToClear
    try {
        const Buyers = await BuyerDB.find()
        // .populate(
        //     { path: 'Shipped', modal: 'Shipped' , populate: {  path: 'Buyer', modal: 'Buyer' } 
        // })



        // const products = await BuyerDB.findOne({ _id: req.dbId }).populate({ path: 'BoughtProducts', modal: 'BoughtProducts' }).populate({ path: 'ProductsPaymentsToClear', modal: 'ProductsPaymentsToClear' })


        res.json(Buyers)
    }
    catch (err) {

        res.status(500).json({ 'message': err.message });
    }

}


module.exports.getSellers = async (req, res) => {


    //req.dbId is id of seller ProductsPaymentsToClear
    try {
        const sellers = await SellerDB.find()
        // .populate(
        //     { path: 'Shipped', modal: 'Shipped' , populate: {  path: 'Buyer', modal: 'Buyer' } 
        // })



        // const products = await BuyerDB.findOne({ _id: req.dbId }).populate({ path: 'BoughtProducts', modal: 'BoughtProducts' }).populate({ path: 'ProductsPaymentsToClear', modal: 'ProductsPaymentsToClear' })


        res.json(sellers)
    }
    catch (err) {

        res.status(500).json({ 'message': err.message });
    }

}


module.exports.getAdminProducts = async (req, res) => {


    //req.dbId is id of seller ProductsPaymentsToClear

    const products = await Admin.findOne({ _id: req.dbId }).populate(
        {
            path: 'Shipped', modal: 'Shipped', populate: { path: 'Buyer', modal: 'Buyer' }
        }).populate({
            path: 'ToBeShipped', modal: 'ToBeShipped', populate: { path: 'Buyer', modal: 'Buyer' }
        })



    // const products = await BuyerDB.findOne({ _id: req.dbId }).populate({ path: 'BoughtProducts', modal: 'BoughtProducts' }).populate({ path: 'ProductsPaymentsToClear', modal: 'ProductsPaymentsToClear' })
    if (!products) return res.status(204).json({ 'message': 'No Projects found.' });
    try {
        res.json(products)
    }
    catch (err) {
        res.status(500).json({ 'message': err.message });
    }

}


module.exports.Shipped = async (req, res) => {

    if (!req?.body?.ProductID) return res.status(400).json({ 'message': 'ID required.' });


    const product = await ProductDB.findOne({ _id: req.body.ProductID }).exec();
    const admin = await Admin.findOne({ Email: "admin@bazar.com" }).exec();


    try {

        admin.Shipped = [...admin.Shipped, req.body.ProductID];

        var tobeshippedupdated = await Admin.updateOne(
            { '_id': admin._id },
            { $pull: { ToBeShipped: req.body.ProductID } },

        );


        product.Shipped = true;


        await admin.save();
        await product.save();


        res.json("Changed From Database: REMOVED FROM TOBESHIPPEDLIST");



    }

    catch (err) {
        console.log(err);
    }


}
