var mongoose = require("mongoose");
var ProductSchema = new mongoose.Schema({
  ProductOwner: {
    type: mongoose.Schema.ObjectId,
    ref: "Seller",
  },

  Name: {
    type: String,
  },

  Image : {
    type: String,
  },

  Description: {
    type: String,
  },

  Category: {
    type: String,
  },
  InitialPrice: {
    type: String,
  },
  Bids: [{ type: mongoose.Schema.ObjectId, ref: "Bid" }],

  MaxAllowedBid: {
    // calucated at the backend when product is added according to the category
    type: String,
  },
  Location: {
    type: String,
  },

  Buyer: {
    type: mongoose.Schema.ObjectId,
    ref: "Buyer",
  },

  BidClosingDate: {
    type: Date,
  },

  BidAccepted: {
    type: Boolean,
    default: false,
  },


  
  AcceptedBidPrice: {
    type: String,
  },
  IsSold: {
    type: Boolean,
    default: false,
  },

  SoldPrice: {
    type: String,
  },

  SoldDate: {
    type: Date,
  },
  
});

module.exports = mongoose.model("Product", ProductSchema);
