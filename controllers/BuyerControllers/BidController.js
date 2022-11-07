
const SellerDB = require('../../model/SellerSchema');
const ProductDB = require('../../model/ProductSchema');
const BidDB = require('../../model/BidSchema');
const BuyerDB = require('../../model/BuyerSchema');
const Stripe = require('stripe');
const stripe = Stripe("sk_test_51M0NQiKEmYVICoofE9jOOnSq2Q32EBaiKBDGhBuurRyTUk3IzKvJxSg6934y1tA8KRxyaHUPohNNB3ZYbWTpOBmf00oqpPnUFt")

//changeFromDatabase
module.exports.changeFromDatabase = async (req, res) => {

    if (!req?.body?.SellerID) return res.status(400).json({ 'message': 'ID required.' });


    const seller = await SellerDB.findOne({ _id: req.body.SellerID }).exec();
    const buyer = await BuyerDB.findOne({ _id: req.dbId }).exec();
    const product = await ProductDB.findOne({ _id: req.body.ProductID }).exec();

    if (product.IsSold) {
        return res.status(204).json({ "message": `Product has been sold` });
    }

    if (!product) {
        return res.status(204).json({ "message": `No Product matches Title` });
    }

    try {


        seller.ProductsSold = [...seller.ProductsSold, req.body.ProductID];


        buyer.BoughtProducts = [...buyer.BoughtProducts, req.body.ProductID];

        var updateProject = await SellerDB.updateOne(
            { '_id': req.dbId },
            { $pull: { Products: req.body.ProductID } },

        );


        product.IsSold = true;
        product.SoldDate = Date.now();
        product.Buyer = req.body.ID;
        product.SoldPrice = req.body.SoldPrice;


        await product.save();
        await buyer.save();
        await seller.save();

        res.json("Changed From Database");



    }

    catch (err) {
        console.log(err);
    }



}




//checkout
module.exports.checkout = async (req, res) => {

    if (!req?.body?.ProductID) return res.status(400).json({ 'message': 'ProductID required.' });


    console.log(req.body);

    const buyer = await BuyerDB.findOne({ _id: req.body.BuyerID }).exec();
    const product = await ProductDB.findOne({ _id: req.body.ProductID }).exec();
console.log("product.ProductOwner._id: ", product.ProductOwner._id)



    if (!product) {
        return res.status(204).json({ "message": `No Product matches Title` });
    }

    try {

        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: product.Name,


                        },
                        unit_amount: req.body.SoldPrice,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `http://localhost:3000/buyer/checkout-success/${product.ProductOwner._id}/${req.body.ProductID}/${req.body.SoldPrice}`,
            cancel_url: `http://localhost:3000/buyer/dashboard`,
        });




        res.send({ url: session.url });

    }

    catch (err) {
        console.log(err);
    }



}






module.exports.getBuyerproducts = async (req, res) => {


    //req.dbId is id of seller ProductsPaymentsToClear

    const products = await BuyerDB.findOne({ _id: req.dbId }).populate({ path: 'BoughtProducts', modal: 'BoughtProducts' }).populate({ path: 'ProductsPaymentsToClear', modal: 'ProductsPaymentsToClear' })
    if (!products) return res.status(204).json({ 'message': 'No Projects found.' });
    try {
        res.json(products)
    }
    catch (err) {
        res.status(500).json({ 'message': err.message });
    }

}




module.exports.placeBid = async (req, res) => {
    console.log("Place Bid", req.body)

    //Bid Time added here to make it secure

    if (!req?.body?.BidderID | !req?.body?.ProductID | !req?.body?.BidAmount) return res.status(400).json({ 'message': 'IDs are required.' });

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
