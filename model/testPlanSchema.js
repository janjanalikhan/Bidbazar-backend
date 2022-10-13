var mongoose = require("mongoose");
var TestPlanSchema = new mongoose.Schema({

  

  TestPlanTitle: {
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

  DateModified: {
    type: Date,
    default: Date.now,
  },


  TestingRequirement: {
   type: mongoose.Schema.ObjectId,
    ref: 'Requirement',
  },

  TestPass: {
    type: Boolean,
  },

  SubmittedFile: [
    {
      type: String,
    },
  ],


});
module.exports = mongoose.model("TestPlan", TestPlanSchema);
