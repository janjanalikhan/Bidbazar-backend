const Sprint = require('../../model/SprintSchema');
const Requirement = require('../../model/RequirementSchema');
const ProjectDB = require('../../model/ProjectSchema');


module.exports.addSprint = async (req, res) => {

    var { SprintTitle, ProjectName, Description, Requirements, StartDate, Deadline } = req.body;
    if (!ProjectName || !Deadline || !SprintTitle) return res.status(400).json({ 'message': 'Title and Deadline are required.' });

    var Project = await ProjectDB.findOne({ Name: req.body.ProjectName });
    if (!Project) {
        return res.status(204).json({ "message": `No Project matches Name` });
    }
    const duplicate = await Sprint.findOne({ SprintTitle: req.body.SprintTitle, Project: Project._id });


    if (duplicate) return res.sendStatus(409); //Conflict 


    var CheckRequirements = new Array();
    console.log(req.body.Requirements)
    for (var i = 0; i < req.body.Requirements.length; i++) {
        temp = await Requirement.findOne({ Title: Requirements[i] });

        if (!temp) {
            return res.status(204).json({ "message": `No such Requirement exists` });
        }
        CheckRequirements = [...CheckRequirements, temp]
    }

    Requirements = CheckRequirements

    try {

        const newSprint = await Sprint.create({ SprintTitle, ProjectName, Description, Requirements, StartDate, Deadline });
        console.log(newSprint);


        var updateProject = await ProjectDB.updateOne(
            { '_id': Project._id },
            { $push: { Sprints: newSprint } },
        )

        res.status(201).json({ 'success': `New ${newSprint} created!` });
    }
    catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}




module.exports.deleteSprint = async (req, res) => {
    if (!req?.body?.SprintTitle || !req?.body?.ProjectName) return res.status(400).json({ 'message': 'Title and Project Name required.' });

 
    var Project = await ProjectDB.findOne({ Name: req.body.ProjectName });
    if (!Project) {
        return res.status(204).json({ "message": `No Project matches Name` });
    }
 
    const sprint = await Sprint.findOne({ SprintTitle: req.body.SprintTitle, ProjectName: req?.body?.ProjectName });
    if (!sprint) {
        return res.status(204).json({ "message": `No such sprint exists` });
    }


    // var updateProject = await ProjectDB.updateOne(
    //     { '_id': Project._id },
    //     { $push: { Sprints: newSprint } },
    // )
    console.log(sprint._id) 
    var updateProject = await ProjectDB.updateOne(
        { '_id': Project._id },
        { $pull: { Sprints: sprint._id } },

    );

    const result = await sprint.deleteOne();
    res.json(result);
}




module.exports.getSprint = async (req, res) => {

    var { SprintTitle, ProjectName } = req.body;
    if (!ProjectName || !SprintTitle) return res.status(400).json({ 'message': 'Title and Deadline are required.' });

    const sprint = await Sprint.findOne({ SprintTitle: req.body.SprintTitle, ProjectName: ProjectName });
    if (!sprint) {
        return res.status(204).json({ "message": `No sprint matches Title` });
    }
    res.json(sprint);
}




module.exports.updateSprint = async (req, res) => {

    var { SprintTitle, ProjectName, Requirements } = req.body;
    if (!ProjectName || !SprintTitle) return res.status(400).json({ 'message': 'Title and Deadline are required.' });

    const sprint = await Sprint.findOne({ SprintTitle: req.body.SprintTitle, ProjectName: ProjectName });
    if (!sprint) {
        return res.status(204).json({ "message": `No sprint matches Title` });
    }

    //SprintTitle, ProjectName, Description, Requirements,  StartDate, Deadline
    if (req.body?.SprintTitle) sprint.SprintTitle = req.body.SprintTitle;
    if (req.body?.ProjectName) sprint.ProjectName = req.body.ProjectName;
    if (req.body?.Deadline) sprint.Deadline = req.body.Deadline;
    if (req.body?.Description) sprint.Description = req.body.Description;
    if (req.body?.StartDate) sprint.StartDate = req.body.StartDate;
    //if (req.body?.Requirements) sprint.Requirements = req.body.Requirements;


    var CheckRequirements = new Array();
    for (var i = 0; i < req.body.Requirements.length; i++) {
        temp = await Requirement.findOne({ Title: Requirements[i] });
        if (!temp) {
            return res.status(204).json({ "message": `No such Requirement exists` });
        }
        CheckRequirements = [...CheckRequirements, temp]
    }

    Requirements = CheckRequirements


    if (req.body?.Requirements) Sprint.Requirements = Requirements;


    const result = await sprint.save();
    res.json(result);
}



