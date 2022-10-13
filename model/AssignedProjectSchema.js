const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AssignedProjectSchema = new Schema({
    Committee: {
        type: String,
        required: true
    },
    Project:  {
        type: String,
        required: true
    },
 
});

module.exports = mongoose.model('AssignedProject' , AssignedProjectSchema);