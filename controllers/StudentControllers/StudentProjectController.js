const ProjectDB = require('../../model/ProjectSchema');
const StudentDB = require('../../model/StudentSchema');


module.exports.addTeamMember = async (req, res) => {

    var { Name, Student = new Array() } = req.body;
    if (!Name || !Student) return res.status(400).json({ //Teacher = new Array()
        'message': 'Name of Project and Student Array required.'
    });

    const project = await ProjectDB.findOne({ Name: req.body.Name });
    if (!project) {
        return res.status(204).json({ "message": `No Project matches Name` });
    }
    try {
        check = new Array();
        for (var i = 0; i < Student.length; i++) {
            temp = await StudentDB.findOne({ RegNo: Student[i] });
            if (!temp) {
                return res.status(204).json({ "message": `No such Student exists` });
            }
            temp.Project = project;
            check = [...check, temp]
        }
        Student = check

        if (req.body?.Student) project.GroupMembers = Student;
        const result = await project.save();
        res.json(result);
    }
    catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}


module.exports.updateRole = async (req, res) => {

    if (!req?.body?.Name || !req.body?.Student || !req.body?.Role) return res.status(400).json({
        'message': 'Name of Project, RegNo of Student and Role of student required.'
    });
    const project = await ProjectDB.findOne({ Name: req.body.Name });

    if (!project) {

        return res.status(204).json({ "message": `No Project matches Name` });
    }
    else if (project) {

        const student = await StudentDB.findOne({ RegNo: req.body.Student });

        if (!student) return res.status(204).json({ 'message': 'No student in the project found.' });

        if (req.body?.Student) student.Role = req.body.Role;


        const result = await student.save();

        res.json(result);

    }
}

module.exports.deleteTeamMember = async (req, res) => {
    var { Name, Student } = req.body;
    if (!Name || !Student) return res.status(400).json({
        'message': 'Name of Project and Student RegNo required.'
    });
    const project = await ProjectDB.findOne({ Name: req.body.Name }).exec();
    if (!project) {
        return res.status(204).json({ "message": `No Project matches Name` });
    }
    else if (project) {
        const student = await StudentDB.findOne({ RegNo: req.body.Student });
        var StudentID = student._id;
        console.log(StudentID)

        console.log(project.GroupMembers)

        var astudent = await ProjectDB.updateOne(
            { '_id': project._id },
            { $pull: { GroupMembers: StudentID } },
            // false, // Upsert
            // true, // Multi
        );

        res.send(astudent);

    }
}

//--------------------------------------------------------------






module.exports.updateProject = async (req, res) => {
    if (!req?.body?.Name) {
        return res.status(400).json({ 'message': 'Name is required.' });
    }
    const project = await ProjectDB.findOne({ Name: req.body.Name });
    if (!project) {
        return res.status(204).json({ "message": `No Project matches Name` });
    }

    if (req.body?.Status) project.Status = req.body.Status;

    if (req.body?.Deliverable) project.Deliverable = req.body.Deliverable;

    if (req.body?.GroupStatus) project.GroupStatus = req.body.GroupStatus;

    if (req.body?.Average) project.Average = req.body.Average;


    const result = await project.save();
    res.json(result);
}



module.exports.getAllProject = async (req, res) => {
    const projects = await ProjectDB.find();
    if (!projects) return res.status(204).json({ 'message': 'No Projects found.' });
    try {
        res.json(projects);
    }
    catch (err) {
        res.status(500).json({ 'message': err.message });
    }

}

module.exports.getProject = async (req, res) => {
    if (!req?.body?.Name) return res.status(400).json({ 'message': 'Name required.' });

    const project = await ProjectDB.findOne({ Name: req.body.Name }).populate('GroupMembers')
        .populate({ path: 'Requirements', modal: 'Requirements', populate: { path: 'AssignedTo', modal: 'Student' } })
        .populate('Sprints').populate('Deliverable').populate('TeamLeader')
        .populate('GroupSupervisor').populate('GroupCoSupervisor').populate('GroupCommittee');


    if (!project) {
        return res.status(204).json({ "message": `No Project matches Title` });
    }
    res.json(project);
}









