
var mongoose = require("mongoose");
var EvaluationSupervisorSchema = new mongoose.Schema({

    Name: {
        type: String,
        required: true,
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

module.exports = mongoose.model("EvaluationSupervisor", EvaluationSupervisorSchema);




