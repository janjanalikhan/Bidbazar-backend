
var mongoose = require("mongoose");
var RubricsCommitteeSchema = new mongoose.Schema({

    Name: {
        type: String,
        required: true,
        unique: true,
    },

    Remarks: {
        type: String,
    },

    Questions: [
        {
            Criteria: {
                type: String,
            },
            ObtainedMarks: {
                type: Number
            },
            TotalMark: {
                type: Number
            }
        }
    ],
}
);

module.exports = mongoose.model("RubricsCommittee", RubricsCommitteeSchema);




