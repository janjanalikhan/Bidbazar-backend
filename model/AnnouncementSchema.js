var mongoose = require("mongoose");
var AnnouncementSchema = new mongoose.Schema({

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


});


module.exports = mongoose.model("Announcement", AnnouncementSchema);
