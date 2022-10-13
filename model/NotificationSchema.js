var mongoose = require("mongoose");
var NotificationSchema = new mongoose.Schema({
    
    Title: {
        type: String,
    },

    Content: {
        type: String,
    },
  

    Sender:{
        type: mongoose.Schema.ObjectId,
        ref: 'Student'
    },

    Date: {
        type: Date,
        default: Date.now,
    },

});

module.exports = mongoose.model("Notification", NotificationSchema);
