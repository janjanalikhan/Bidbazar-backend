const Requirement = require('../../model/RequirementSchema');
const TeacherDB = require('../../model/TeacherSchema');
const StudentDB = require('../../model/StudentSchema');
const ProjectDB = require('../../model/ProjectSchema');


module.exports.addRequirement = async (req, res) => {

    console.log("AssignedTo SFSFSFSFSFFS", req.body.AssignedTo)


    var { Title, Description, ProjectName, AssignedTo, Type, Priority, Accepted, Comments,
        File = new Array(), SubmittedFile = new Array(), DateModified, start, end } = req.body;
    if (!Title || !AssignedTo || !ProjectName) return res.status(400).json({
        'message':
            'Title of Requirement, Assigned To, Priority and Project Name required.'
    });

    try {

        const Project = await ProjectDB.findOne({ Name: ProjectName });
        if (!Project) {
            return res.status(209).json({ "message": `No such project exists` });
        }
        const RequirementObj = await Requirement.findOne({ Title: Title, ProjectName: ProjectName });

        if (RequirementObj) {
            return res.status(209).json({ "message": `Record already exists` })
        };



        const newRequirement = await Requirement.create({
            Title, Description, ProjectName, AssignedTo, Type, Priority, Accepted, Comments,
            File, SubmittedFile, DateModified, start, end
        });

        var updateProject = await ProjectDB.updateOne(
            { '_id': Project._id },
            { $push: { Requirements: newRequirement } },
        )

        res.status(201).json({ 'success': `New ${newRequirement} created!` });
    }
    catch (err) {
        res.status(500).json({ 'message': err.message });
    }

}


module.exports.deleteRequirement = async (req, res) => {
    console.log("REQUEST: ", req.body)

    if (!req?.body?.Title || !req?.body?.ProjectName) return res.status(400).json({ 'message': 'Title required.' });
    try {

        const Project = await ProjectDB.findOne({ Name: req?.body?.ProjectName });

        if (!Project) {
            return res.status(209).json({ "message": `No such project exists` });
        }

        const RequirementObj = await Requirement.findOne({ Title: req.body.Title, ProjectName: req?.body?.ProjectName });

        if (!RequirementObj) {
            return res.status(209).json({ "message": `No such project exists` })
        };

        var updateProject = await ProjectDB.updateOne(
            { '_id': Project._id },
            { $pull: { Requirements: RequirementObj._id } },

        );
        const result = await RequirementObj.deleteOne();
        res.json(result);
    }
    catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}



module.exports.updateRequirementLead = async (req, res) => {

    console.log("REQUEST: ", req.body.Title , req.body.ProjectName)

    if (!req?.body?.Title || !req?.body?.ProjectName) { //Name of Requirement
        return res.status(400).json({ 'message': 'Name required.' });
    }

    try {
        const Project = await ProjectDB.findOne({ Name: req?.body?.ProjectName });

        if (!Project) {
            return res.status(209).json({ "message": `No such project exists` });
        }

        const RequirementObj = await Requirement.findOne({ Title: req.body.Title, ProjectName: req.body.ProjectName });
        console.log("RequirementObj: ", RequirementObj)
        if (!RequirementObj) {
            return res.status(209).json({ "message": `No such Requirement in the Project` })
        };


        if (req.body.Description) RequirementObj.Description = req.body.Description;


        if (req.body.AssignedTo) { // AssignedTo = Student RegNo
            var StudentObj = await StudentDB.findOne({ RegNo: req.body.AssignedTo })
            if (!StudentObj) {
                return res.status(209).json({ "message": `No such Student in the Project` })
            }
            RequirementObj.AssignedTo = StudentObj;
        }



        if (req.body.Type) RequirementObj.Type = req.body.Type;
        if (req.body.Priority) RequirementObj.Priority = req.body.Priority;
        if (req.body.Accepted) RequirementObj.Accepted = req.body.Accepted;



        if (req.body.File) RequirementObj.File = req.body.File;
        if (req.body.SubmittedFile) RequirementObj.SubmittedFile = req.body.SubmittedFile;
        if (req.body.DateModified) RequirementObj.DateModified = req.body.DateModified;



        if (req.body.start) RequirementObj.start = req.body.start;
        if (req.body.end) RequirementObj.end = req.body.end;
        if (req.body.Rename) {

            const check = await Requirement.findOne({ Title: req.body.Rename, ProjectName: req.body.ProjectName });


            if (check) {

                return res.status(409).json({ "message": `Can't Rename: Already a Requirement with similar Name exists` });
            }
            //ss



            RequirementObj.Title = req.body.Rename;
        }

        const result = await RequirementObj.save();
        res.json(result);

    }
    catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}


module.exports.updateRequirementMember = async (req, res) => {

    if (!req?.body?.Title || !req?.body?.ProjectName) { //Name of Requirement
        return res.status(400).json({ 'message': 'Name required.' });
    }

    try {
        const Project = await ProjectDB.findOne({ Name: req?.body?.ProjectName });

        if (!Project) {
            return res.status(209).json({ "message": `No such project exists` });
        }

        const RequirementObj = await Requirement.findOne({ Title: req.body.Title, ProjectName: req?.body?.ProjectName });

        if (!RequirementObj) {
            return res.status(209).json({ "message": `No such Requirement in the Project` })
        };

        if (req.body?.Priority) RequirementObj.Priority = req.body.Priority;
        if (req.body?.Accepted) RequirementObj.Accepted = req.body.Accepted;
        if (req.body?.SubmittedFile) RequirementObj.SubmittedFile = req.body.SubmittedFile;
        if (req.body?.DateModified) RequirementObj.DateModified = req.body.DateModified;
        if (req.body?.start) RequirementObj.start = req.body.start;


        const result = await RequirementObj.save();
        res.json(result);

    }
    catch (err) {
        res.status(500).json({ 'message': err.message });
    }

}


module.exports.getAllRequirement = async (req, res) => {

    try {

        if (!req?.body?.ProjectName) { //Name of Requirement
            return res.status(400).json({ 'message': 'Project Name required.' });
        }
        const Project = await ProjectDB.findOne({ Name: req?.body?.ProjectName });

        if (!Project) {
            return res.status(209).json({ "message": `No such project exists` });
        }
        const ProjectContent = await ProjectDB.findOne({ Name: req?.body?.ProjectName }).populate({ path: 'Requirements' })
        res.json(ProjectContent.Requirements);

    }
    catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}




module.exports.getStudentRequirement = async (req, res) => {

    try {

        if (!req?.body?.ProjectName) { //Project Name of Requirement
            return res.status(400).json({ 'message': 'Project Name required.' });
        }
        const Project = await ProjectDB.findOne({ Name: req?.body?.ProjectName });

        if (!Project) {
            return res.status(209).json({ "message": `No such project exists` });
        }

        if (!req?.body?.RegNo) { //RegNo of Requirement
            return res.status(400).json({ 'message': 'Student RegNO required.' });
        }
        const student = await StudentDB.findOne({ RegNo: req?.body?.RegNo });

        if (!student) {
            return res.status(209).json({ "message": `No such student exists` });
        }

        const StudentRequirements = await Requirement.find({ ProjectName: req?.body?.ProjectName, AssignedTo: student }).populate('AssignedTo')
        console.log(StudentRequirements)
        res.json(StudentRequirements);

        ;


    }
    catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}





module.exports.getRequirement = async (req, res) => {
    try {
        if (!req?.body?.Title || !req?.body?.ProjectName) return res.status(400).json({ 'message': 'Title required.' });

        const Project = await ProjectDB.findOne({ Name: req?.body?.ProjectName });

        if (!Project) {
            return res.status(209).json({ "message": `No such project exists` });
        }

        const RequirementObj = await Requirement.findOne({ Title: req.body.Title, ProjectName: req?.body?.ProjectName });

        if (!RequirementObj) {
            return res.status(209).json({ "message": `No such Requirement exist in the Project` })
        };

        res.json(RequirementObj);

    }
    catch (err) {
        res.status(500).json({ 'message': err.message });
    }


}




// //--------------------------------------------------------------


module.exports.addRequirementComments = async (req, res) => {

    if (!req?.body?.Title || !req?.body?.Student || !req?.body?.Content || !req?.body?.ProjectName) {
        return res.status(400).json({ 'message': 'Project Name, Req Title, Student RegNo and Content required.' });
    }

    const Project = await ProjectDB.findOne({ Name: req?.body?.ProjectName });

    if (!Project) {
        return res.status(209).json({ "message": `No such project exists` });
    }

    const RequirementObj = await Requirement.findOne({ Title: req.body.Title, ProjectName: req.body.ProjectName });
    console.log(RequirementObj)

    if (!RequirementObj) {
        return res.status(209).json({ "message": `No such Requirement exist in the Project` })
    };

    const StudentObj = await StudentDB.findOne({ RegNo: req.body.Student });
    if (!StudentObj) {
        return res.status(204).json({ "message": `No such Student exists` });
    }
    try {
        var AddComment = await Requirement.updateOne(
            { '_id': RequirementObj._id },
            { $push: { Comments: { 'Student': StudentObj, 'Content': req?.body?.Content } } },
        );
        res.json(AddComment);
    }
    catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}


module.exports.deleteRequirementComments = async (req, res) => {

    if (!req?.body?.Title || !req?.body?.Student || !req?.body?.ProjectName) {
        return res.status(400).json({ 'message': 'Project Name, Req Title, Student RegNo  required.' });
    }

    const Project = await ProjectDB.findOne({ Name: req?.body?.ProjectName });

    if (!Project) {
        return res.status(209).json({ "message": `No such project exists` });
    }

    const RequirementObj = await Requirement.findOne({ Title: req.body.Title, ProjectName: req.body.ProjectName });
    console.log(RequirementObj)

    if (!RequirementObj) {
        return res.status(209).json({ "message": `No such Requirement exist in the Project` })
    };

    const StudentObj = await StudentDB.findOne({ RegNo: req.body.Student });
    if (!StudentObj) {
        return res.status(204).json({ "message": `No such Student exists` });
    }

    try {
        var DeleteRequirement = await Requirement.updateOne(
            { '_id': RequirementObj._id },
            { $pull: { Comments: { '_id': req.params._id } } },
            // false, // Upsert
            // true, // Multi
        );
        res.send(DeleteRequirement);
    }
    catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

//getRequirementComments

module.exports.getRequirementComments = async (req, res) => {
    if (!req?.body?.Title || !req?.body?.ProjectName) return res.status(400).json({ 'message': 'Title required.' });

    const Project = await ProjectDB.findOne({ Name: req?.body?.ProjectName });

    if (!Project) {
        return res.status(209).json({ "message": `No such project exists` });
    }

    const RequirementObj = await Requirement.findOne({ Title: req.body.Title, ProjectName: req.body.ProjectName });
    console.log(RequirementObj)

    if (!RequirementObj) {
        return res.status(209).json({ "message": `No such Requirement exist in the Project` })
    };

    DisplayComment = RequirementObj.Comments;
    res.json(DisplayComment);
}