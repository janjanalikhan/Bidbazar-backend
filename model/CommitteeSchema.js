var mongoose = require("mongoose");
var CommitteeSchema = new mongoose.Schema({


    Name: {
        type: String,
        required: true,
        unique: true,
    },

    Teacher: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Teacher'
        }
    ],

    Projects: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Project'
        }
    ],

 
});
module.exports = mongoose.model("Committee", CommitteeSchema);
