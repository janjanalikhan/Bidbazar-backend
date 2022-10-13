
var mongoose = require("mongoose");
var EvaluationCommitteeSchema = new mongoose.Schema({

    Name: {
        type: String,
        required: true,
        unique: true,
    },

    Remarks: {
        type: String,
    },

    Teacher: {
        type: mongoose.Schema.ObjectId,
        ref: 'Teacher'

    },

    Student: {
        type: mongoose.Schema.ObjectId,
        ref: 'Student'

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

module.exports = mongoose.model("EvaluationCommittee", EvaluationCommitteeSchema);




