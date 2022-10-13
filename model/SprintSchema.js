var mongoose = require("mongoose");
var SprintSchema = new mongoose.Schema({

 
    SprintTitle: {
        type: String,
        required: true,

    }, 
 
    ProjectName: {
        type: String,
        required: true,
    },
    
    Description: {
        type: String,
    },

    Requirements: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Requirement'

    }],
  
    StartDate: {
        type: Date,
        default: Date.now,
    },

    Deadline: {
        type: Date,
        required: true,

    }
});
module.exports = mongoose.model("Sprint", SprintSchema);

