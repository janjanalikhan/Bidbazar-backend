const Committee = require('../../model/CommitteeSchema');
const TeacherDB = require('../../model/TeacherSchema');
const ProjectDB = require('../../model/ProjectSchema');

module.exports.addGroup = async (req, res) => {
    var { CommitteeName, ProjectName } = req.body;     // Committe Name and Project Name
    if (!CommitteeName || !ProjectName) return res.status(400).json({ 'message': 'CommitteeName, Teacher, ProjectName are required.' });

    const Project = await ProjectDB.findOne({ Name: ProjectName });

    if (!Project) {
        return res.status(209).json({ "message": `No such project exists` });
    }

    const CommitteeObj = await Committee.findOne({ Name: CommitteeName });

    if (!CommitteeObj) {
        return res.status(209).json({ "message": `No such Committee exists` });
    }

    const Group = await Committee.findOne({ Name: CommitteeName, Projects: ProjectName });

    if (Group) {
        return res.sendStatus(409); //Conflict 
    };

    var updateCommittee = await Committee.updateOne(
        { '_id': CommitteeObj._id },
        { $push: { Projects: Project } },

    );

}



module.exports.addCommittee = async (req, res) => {

    var { Name, Teacher = new Array() } = req.body;     // Committe Name and array of teacher Object IDs
    if (!Name) return res.status(400).json({ 'message': 'Name is required.' });

    const duplicate = await Committee.findOne({ Name: Name }).exec();
    if (duplicate) return res.sendStatus(409); //Conflict 

    try {
        validTeachers = new Array();
        for (var i = 0; i < Teacher.length; i++) {
            temp = await TeacherDB.findOne({ _id: Teacher[i] });
            if (!temp) {
                return res.status(204).json({ "message": `No such Teacher exists` });
            }
            var updateTeacher = await TeacherDB.updateOne(
                { '_id': temp._id },
                { 'isCommittee': true  },
        
            );
            validTeachers = [...validTeachers, temp]
        }

        Teacher = validTeachers

        console.log("Hi")


        const newCommittee = await Committee.create({ Name, Teacher });
        console.log(newCommittee);



        for (var i = 0; i < Teacher.length; i++) {
            var updateTeacher = await TeacherDB.updateOne(
                { '_id': Teacher[i]._id },
                { 'Committee': newCommittee  },
        
            );

        }


        res.status(201).json({ 'success': `New ${newCommittee} created!` });
    }
    catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports.deleteCommittee = async (req, res) => {
    if (!req?.body?.Name) return res.status(400).json({ 'message': 'Name required.' });

    const committee = await Committee.findOne({ Name: req.body.Name });
    if (!committee) {
        return res.status(204).json({ "message": `No such Committee exists` });
    }

    try {
        validTeachers = new Array();
        for (var i = 0; i < committee.Teacher.length; i++) {
            temp = await TeacherDB.findOne({ _id: committee.Teacher[i] });
            if (!temp) {
                return res.status(204).json({ "message": `No such Teacher exists` });
            }

            var updateTeacher = await TeacherDB.updateOne(
                { '_id': temp._id },
                { 'isCommittee': false },

            );
        }

        const result = await committee.deleteOne();
        res.json(result);

    }


    catch (err) {
        res.status(500).json({ 'message': err.message });
    }

    
}


module.exports.updateCommittee = async (req, res) => {
    if (!req?.body?.Name) {
        return res.status(400).json({ 'message': 'Name required.' });
    }
    const committee = await Committee.findOne({ Name: req.body.Name }).exec();
    if (!committee) {
        return res.status(204).json({ "message": `No Committee matches Name` });
    }
    if (req.body?.Name) committee.Name = req.body.Name;


    validTeachers = new Array();
    for (var i = 0; i < req.body.Teacher.length; i++) {
        temp = await TeacherDB.findOne({ Email: req.body.Teacher[i] });
        if (!temp) {
            return res.status(204).json({ "message": `No such Teacher exists` });
        }
        validTeachers = [...validTeachers, temp]
    }

    var Teacher = validTeachers



    if (req.body?.Teacher) committee.Teacher = Teacher;

    const result = await committee.save();
    res.json(result);
}


module.exports.getAllCommittee = async (req, res) => {


    const committees = await Committee.find().populate('Projects').populate("Teacher")

    if (!committees) return res.status(204).json({ 'message': 'No Committees found.' });
    try {
        res.json(committees);
    }
    catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports.getCommittee = async (req, res) => {
    if (!req?.body?.Name) return res.status(400).json({ 'message': 'Name required.' });

    const committee = await Committee.findOne({ Name: req.body.Name }).exec();
    if (!committee) {
        return res.status(204).json({ "message": `No committee matches Name` });
    }
    res.json(committee);
}




//--------------------------------------------------------------





