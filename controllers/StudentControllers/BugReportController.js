const BugReportDB = require('../../model/BugReportSchema');
const RequirementDB = require('../../model/RequirementSchema');
const ProjectDB = require('../../model/ProjectSchema');



module.exports.addBugReport = async (req, res) => {

    var { BugReportTitle, ProjectName, Description, DateModified, DebuggingRequirement, SubmittedFile } = req.body;
    if (!BugReportTitle || !ProjectName || !DebuggingRequirement ) return res.status(400).json({ 'message': 'Title and Project required.' });
    
    var Project = await ProjectDB.findOne({ Name: req.body.ProjectName });
    if (!Project) {
        return res.status(204).json({ "message": `No Project matches Name` });
    }

    var DebuggingRequirement = await RequirementDB.findOne({ Title: DebuggingRequirement, ProjectName : ProjectName  });
    if (!DebuggingRequirement) {
        return res.status(204).json({ "message": `No Project matches Name` });
    }

    const duplicate = await BugReportDB.findOne({ BugReportTitle: req.body.BugReportTitle, Project: Project._id });


    if (duplicate) return res.sendStatus(409); //Conflict 

    try {

        const newBugReport = await BugReportDB.create({ BugReportTitle, ProjectName, Description, DateModified, DebuggingRequirement, SubmittedFile });
        console.log(newBugReport);

        res.status(201).json({ 'success': `New ${newBugReport} created!` });
    }
    catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports.getBugReport = async (req, res) => {

    var { BugReportTitle, ProjectName } = req.body;
    if (!BugReportTitle || !ProjectName ) return res.status(400).json({ 'message': 'Title and Project required.' });

    const bugreport = await BugReportDB.findOne({ BugReportTitle: BugReportTitle, ProjectName: ProjectName });
    if (!bugreport) {
        return res.status(204).json({ "message": `No bugreport matches Title` });
    }
    res.json(bugreport);
}

module.exports.deleteBugReport = async (req, res) => {
    var { BugReportTitle, ProjectName } = req.body;
    if (!BugReportTitle || !ProjectName) return res.status(400).json({ 'message': 'Title and Project required.' });

    const bugreport = await BugReportDB.findOne({ BugReportTitle: BugReportTitle,ProjectName: ProjectName}).exec();
    if (!bugreport) {
        return res.status(204).json({ "message": `No such bugreport exists` });
    }
    const result = await bugreport.deleteOne();
    res.json(result);
}

module.exports.updateBugReport = async (req, res) => {

    var { BugReportTitle, ProjectName} = req.body;
    if (!ProjectName || !BugReportTitle) return res.status(400).json({ 'message': 'Title and Name are required.' });

    const bugreport = await BugReportDB.findOne({ BugReportTitle: req.body.BugReportTitle, ProjectName: ProjectName });
    if (!bugreport) {
        return res.status(204).json({ "message": `No bugreport matches Title` });
    }

    const requirementObj = await RequirementDB.findOne({ Title: req.body.DebuggingRequirement, ProjectName: ProjectName });
    if (!requirementObj) {
        return res.status(204).json({ "message": `No requirement matches Title` });
    }

    //BugReportTitle, ProjectName, Description, DateModified, DebuggingRequirement, SubmittedFile

    if (req.body?.BugReportTitle) bugreport.BugReportTitle = req.body.BugReportTitle;
    if (req.body?.ProjectName) bugreport.ProjectName = req.body.ProjectName;
    if (req.body?.Description) bugreport.Description = req.body.Description;
    if (req.body?.DateModified) bugreport.DateModified = req.body.DateModified;
    if (req.body?.SubmittedFile) bugreport.SubmittedFile = req.body.SubmittedFile;
    if (req.body?.DebuggingRequirement) requirementObj.DebuggingRequirement = requirementObj;


    const result = await bugreport.save();
    res.json(result);
}


