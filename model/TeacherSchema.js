var mongoose = require("mongoose");
var TeacherSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
    unique: true,
  },
  Password: {
    type: String,
    required: true,
  },

  ProfilePicture: {
    type: String,
    
  },

  PhoneNumber: {
    type: Number,
    required: true,  },
  Gender: {
    type: Boolean,
  },
  isSupervisor: {
    type: Boolean,
    required: true,
  },
  isCommittee: {
    type: Boolean,
    required: true,
  },


  MyProjects: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Project'

  }],


  Committee: {
    type: mongoose.Schema.ObjectId,
    ref: 'Committee'

  },

  Designation: {
    type: String,
  },
  RefreshToken: {
    type: String,
  }
});
module.exports = mongoose.model("Teacher", TeacherSchema);
