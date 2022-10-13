var mongoose = require("mongoose");
var TemplateSchema = new mongoose.Schema({

  

  Title: {
    type: String,
    required: true,
    unique: true,
  },

  Description: {
    type: String,
  },

  DateModified: {
    type: Date,
    default: Date.now,
  },

  Deadline: {
    type: Date,
    required: true,

  },

  File: {
    type: String,
  }

});


module.exports = mongoose.model("Template", TemplateSchema);
