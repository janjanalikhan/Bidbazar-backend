var mongoose = require("mongoose");
var BacklogSchema = new mongoose.Schema({

    Project: {
        type: String,
        required: true,
    },
     

    Requirements: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Requirement'

    }],
  

});
module.exports = mongoose.model("Backlog", BacklogSchema);

