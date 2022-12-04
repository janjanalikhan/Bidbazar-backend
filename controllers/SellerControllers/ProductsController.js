
const SellerDB = require('../../model/SellerSchema');
const BuyerDB = require('../../model/BuyerSchema');
const ProductDB = require('../../model/ProductSchema');
const BidDB = require('../../model/BidSchema');
const bcrypt = require('bcrypt');
require("dotenv").config();
const Stripe = require('stripe');
const stripe = Stripe("sk_test_51M0NQiKEmYVICoofE9jOOnSq2Q32EBaiKBDGhBuurRyTUk3IzKvJxSg6934y1tA8KRxyaHUPohNNB3ZYbWTpOBmf00oqpPnUFt")

//acceptBid
//newBidSeen


module.exports.newBidSeen = async (req, res) => {
    console.log("newBidSeen", req.dbId)
    const ProductOwner = await SellerDB.findOne({ _id: req.dbId })

    ProductOwner.NewBidPlaced = false;

    await ProductOwner.save();

    return res.status(200);
    //Bid Time added here to make it secure

    // if (!req?.body?.BidderID | !req?.body?.ProductID | !req?.body?.BidAmount) return res.status(400).json({ 'message': 'IDs are required.' });

    // const product = await ProductDB.findOne({ _id: req.body.ProductID })
    // const newBid = await BidDB.create({
    //     Bidder: req.body.BidderID,
    //     Amount: req.body.BidAmount,
    //     Date: Date.now(),

    // });

    // const ProductOwner = await SellerDB.findOne({ _id: product.ProductOwner })

    // ProductOwner.NewBidPlaced = true ;

    // await ProductOwner.save();


    // var updateProduct = await ProductDB.updateOne(
    //     { '_id': req.body.ProductID },
    //     { $push: { Bids: newBid } },
    // )

    // if (!product) {
    //     return res.status(204).json({ "message": `No Product matches Title` });
    // }
    // res.json(product);

}





module.exports.acceptBid = async (req, res) => {


    if (!req?.body?.ID) return res.status(400).json({ 'message': 'ID required.' });

    const product = await ProductDB.findOne({ _id: req.body.ProductID }).exec();

    const seller = await SellerDB.findOne({ _id: req.dbId }).exec();
    const buyer = await BuyerDB.findOne({ _id: req.body.ID }).exec();

    if (!product) {
        return res.status(204).json({ "message": `No Product matches Title` });
    }


    product.BidAccepted = true;
    product.Buyer = req.body.ID;
    product.AcceptedBidPrice = req.body.AcceptedBidPrice;
    buyer.ProductsPaymentsToClear = [...buyer.ProductsPaymentsToClear, req.body.ProductID];


    await product.save();
    await buyer.save();


    res.json("Bid Accepted");



}

module.exports.sellerProducts = async (req, res) => {


    //req.dbId is id of seller

    const products = await SellerDB.findOne({ _id: req.body.ID }).populate({ path: 'Products', modal: 'Products', populate: { path: 'Bids', modal: 'Bids', populate: { path: 'Bidder', modal: 'Bidder' } } }).populate("ProductsSold");;
    if (!products) return res.status(204).json({ 'message': 'No Projects found.' });
    try {
        res.json(products)
    }
    catch (err) {
        res.status(500).json({ 'message': err.message });
    }

}

module.exports.forgotPassword = async (req, res) => {

    if (!req?.body?.Email) return res.status(400).json({ 'message': 'Email required.' });
    const seller = await SellerDB.findOne({ Email: req.body.Email })
    const buyer = await BuyerDB.findOne({ Email: req.body.Email })
    if (!seller && !buyer) return res.status(204).json({ 'message': 'No user found.' });
    const NewPassword = await bcrypt.hash(req.body.Password, 10);

    if (seller) {

        seller.Password = NewPassword;
        await seller.save();
        res.json("Password Changed");

    }

    else {
        buyer.Password = NewPassword;
        await buyer.save();
        res.json("Password Changed");
    }



}







module.exports.getSingleProducts = async (req, res) => {


    if (!req?.body?.ID) return res.status(400).json({ 'message': 'ID required.' });

    const product = await ProductDB.findOne({ _id: req.body.ID }).populate({ path: 'Bids', modal: 'Bids', populate: { path: 'Bidder', modal: 'Buyer' } }).populate("ProductOwner");

    if (!product) {
        return res.status(204).json({ "message": `No Product matches Title` });
    }
    res.json(product);

}

module.exports.getAllProducts = async (req, res) => {

    //  
    const product = await ProductDB.find().populate({ path: 'Bids', modal: 'Bids', populate: { path: 'Bidder', modal: 'Buyer' } }).populate("ProductOwner")
    if (!product) return res.status(204).json({ 'message': 'No Product found.' });
    try {

        res.json(product)
    }
    catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}



module.exports.deleteProduct = async (req, res) => {
    if (!req?.body?.ID) return res.status(400).json({ 'message': 'ID required.' });

    const product = await ProductDB.findOne({ _id: req.body.ID }).exec();
    if (!product) {
        return res.status(204).json({ "message": `No such product exists` });
    }
    const result = await product.deleteOne();
    res.json(result);
}




module.exports.getSellerProducts = async (req, res) => {


    //req.dbId is id of seller

    const products = await SellerDB.findOne({ _id: req.dbId }).populate({ path: 'Products', modal: 'Products', populate: { path: 'Bids', modal: 'Bids', populate: { path: 'Bidder', modal: 'Bidder' } } }).populate("ProductsSold");;
    if (!products) return res.status(204).json({ 'message': 'No Projects found.' });
    try {
        res.json(products)
    }
    catch (err) {
        res.status(500).json({ 'message': err.message });
    }

}


module.exports.addProduct = async (req, res) => {




    var {
        ProductOwnerID,
        Name,
        Description,
        Category,
        Location,
        InitialPrice,
        MaxAllowedBid,
        BidClosingDate,
        Image } = req.body;

    if (!Name || !ProductOwnerID) return res.status(400).json({ 'message': 'Name || ProductOwnerID  is required.' });

    const duplicate = await ProductDB.findOne({ Name: Name }).exec();
    if (duplicate) return res.sendStatus(409); //Conflict 
    try {


        const ProductOwner = await SellerDB.findOne({ _id: ProductOwnerID });


        const newProduct = await ProductDB.create({
            ProductOwner,
            Name,
            Description,
            Category,
            InitialPrice,
            MaxAllowedBid,
            Location,
            BidClosingDate,
            Image
        });

        ProductOwner.Products = [...ProductOwner.Products, newProduct._id];


        const result = await ProductOwner.save();

        res.status(201).json({ 'success': `New ${newProduct} created! and added to seller array of products` });

    }
    catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}



module.exports.updateProject = async (req, res) => {
    if (!req?.body?.Name) {
        return res.status(400).json({ 'message': 'Name is required.' });
    }
    const project = await Project.findOne({ Name: req.body.Name }).exec();
    if (!project) {
        return res.status(204).json({ "message": `No Project matches Name` });
    }

    if (req.body?.Name) project.Title = req.body.Name;
    if (req.body?.Description) project.Description = req.body.Description;
    if (req.body?.Status) project.Status = req.body.Status;
    if (req.body?.Deliverable) project.Deliverable = req.body.Deliverable;

    if (req.body?.TeamLeader) {

        var TeamLeader = await Student.findOne({ RegNo: req.body.TeamLeader });
        if (!TeamLeader) {
            return res.status(204).json({ "message": `No such student exists` });
        }
        project.TeamLeader = TeamLeader;

    }

    if (req.body?.GroupMembers) project.GroupMembers = [...project.GroupMembers, req.body.GroupMembers];
    if (req.body?.GroupStatus) project.GroupStatus = req.body.GroupStatus;

    if (req.body?.GroupSupervisor) {
        var GroupSupervisor = await Teacher.findOne({ Email: req.body.GroupCoSupervisor });
        if (!GroupCoSupervisor) {
            return res.status(204).json({ "message": `No such Teacher exists` });
        }
        project.GroupSupervisor = GroupSupervisor;

    }
    if (req.body?.GroupCoSupervisor) {
        var GroupCoSupervisor = await Teacher.findOne({ Email: req.body.GroupCoSupervisor });
        if (!GroupCoSupervisor) {
            return res.status(204).json({ "message": `No such Teacher exists` });
        }
        project.GroupCoSupervisor = GroupCoSupervisor;
    }

    if (req.body?.GroupCommittee) {
        var GroupCommittee = await Committee.findOne({ Name: req.body.GroupCommittee });
        if (!GroupCoSupervisor) {
            return res.status(204).json({ "message": `No such GroupCommittee exists` });
        }
        project.GroupCommittee = GroupCommittee;
    }
    if (req.body?.Average) project.Average = req.body.Average;


    const result = await project.save();
    res.json(result);
}
