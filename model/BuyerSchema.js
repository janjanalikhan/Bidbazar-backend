var mongoose = require("mongoose");
var BuyerSchema = new mongoose.Schema({
  
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

  Address: {
    type: String,

  },

  ProfilePicture: {
    type: String,
    
  },

  Role: {
    type: String,

  },


  BoughtProducts: [{
   
    type: mongoose.Schema.ObjectId,
      ref: 'Product'

  }],

  ProductsPaymentsToClear: [{
    
    type: mongoose.Schema.ObjectId,
      ref: 'Product'

  }],

  Notification: [{
    type: String,

  }],

  Country: {
    type: String,

  },

  CategoryInterestedIn: {
    type: String,

  },

  Reviews:[{
    type: String,

  }],





  RefreshToken: {
    type: String,
  }
});

module.exports = mongoose.model("Buyer", BuyerSchema);
