var mongoose = require("mongoose");
var AdminSchema = new mongoose.Schema({
  
  Email: {
    type: String,
    
  },
  Password: {
    type: String,
    
  },

  Shipped: [{
    
    type: mongoose.Schema.ObjectId,
      ref: 'Product'

  }],

  ToBeShipped: [{
    
    type: mongoose.Schema.ObjectId,
      ref: 'Product'

  }],

});

module.exports = mongoose.model("Admin", AdminSchema);
