var mongoose = require("mongoose");
var ProjectSchema = new mongoose.Schema({

    Name: {
        type: String,
        required: true,
        unique: true,
    },

    Description: {  
        type: String,
    },

    Status: {  
        type: String,
    },

    Requirements: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Requirement'

    }],

    Sprints: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Sprint'

    }],

    Backlogs: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Backlog'

    }],


    Deliverable:   [{
        type: mongoose.Schema.ObjectId,
        ref: 'Deliverable'
    }],
    
    
    TeamLeader:   {
        type: mongoose.Schema.ObjectId,
        ref: 'Student'
    },

    GroupMembers: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Student'
        }
    ],
    GroupStatus: {  // 0 = Pending, 1 = Approved, 2 = Rejected
        type: String,
        
    },

    GroupSupervisor: {
        type: mongoose.Schema.ObjectId,
        ref: 'Teacher'
    },
    GroupCoSupervisor: {
        type: mongoose.Schema.ObjectId,
        ref: 'Teacher'

    },
    GroupCommittee: {
        type: mongoose.Schema.ObjectId,
        ref: 'Committee'
    },

    Average: {
        type: Number,
    },


});
module.exports = mongoose.model("Project", ProjectSchema);

