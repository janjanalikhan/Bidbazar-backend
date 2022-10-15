var mongoose = require("mongoose");
var SellerSchema = new mongoose.Schema({
  
  Name: {
    type: String,
    
  },

  Email: {
    type: String,
    required: true,
    unique: true,
  },
  
  Password: {
    type: String,
    required: true,
  },

  PhoneNumber: {
    type: Number,


  },

  Address:{
    type: String,

  },

  ProfilePicture: {
    type: String,
    
  },

  Role: {
    type: String,

  },


  Products: [{
   
    type: mongoose.Schema.ObjectId,
      ref: 'Product'

  }],

  Notification: [{
    type: String,

  }],

  Country: {
    type: String,

  },

  Reviews:[{
    type: String,

  }],

  ProductsSold: [{
   
    type: mongoose.Schema.ObjectId,
      ref: 'Product'

  }],

  RefreshToken: {
    type: String,
  }
});

module.exports = mongoose.model("Seller", SellerSchema);
