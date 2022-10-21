var mongoose = require("mongoose");
var BidSchema = new mongoose.Schema({
  
  Bidder: {
    type: mongoose.Schema.ObjectId,
    ref: "Buyer",
    
  },

  Amount: {
    type: String,
    
  },


  Date:{
    type: Date,
    default: Date.now
  }
  
});

module.exports = mongoose.model("Bid", BidSchema);
