
const SellerDB = require('../../model/SellerSchema');
const ProductDB = require('../../model/ProductSchema');
const BidDB = require('../../model/BidSchema');



module.exports.placeBid = async (req, res) => {
    console.log("Place Bid", req.body)

    //Bid Time added here to make it secure

    if (!req?.body?.BidderID|!req?.body?.ProductID| !req?.body?.BidAmount) return res.status(400).json({ 'message': 'IDs are required.' });

    const product = await ProductDB.findOne({ _id: req.body.ProductID })
    const newBid = await BidDB.create({
        Bidder: req.body.BidderID,
        Amount: req.body.BidAmount,
        Date: Date.now(),

    });

    var updateProduct = await ProductDB.updateOne(
        { '_id': req.body.ProductID },
        { $push: { Bids: newBid } },
    )

    if (!product) {
        return res.status(204).json({ "message": `No Product matches Title` });
    }
    res.json(product);

}
