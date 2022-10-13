const StudentDB = require('../../model/StudentSchema');
const TeacherDB = require('../../model/TeacherSchema');

const EvaluationSupervisor = require('../../model/EvaluationSupervisorSchema');
const EvaluationCommittee = require('../../model/EvaluationCommitteeSchema');
const { $where } = require('../../model/StudentSchema');


//StudentEvaluationController

module.exports.getEvaluation = async (req, res) => {

    var { Name, Teacher, Student } = req.body;

    if (!Name || !Student)//Name of Evaluation i.e Scope, SRS, SDS, Student RegNo and Teacher Email Required
        return res.status(400).json({ message: "Name required." });

    //        const project = await Project.findOne({ Name: req.body.Name }).exec();

    var StudentObj = await StudentDB.findOne({ Student: req.body.Name }).exec();
    var StudentID = StudentObj._id;
    var evaluation = await EvaluationSupervisor.find({ Student: StudentObj._id }).exec();
    if (!evaluation) {
        return res.status(204).json({ message: "No Evaluation for student:" + StudentObj.Name +  "matches name"});
    }
    res.json(evaluation);
};