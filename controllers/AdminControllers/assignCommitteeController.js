const CommitteeDB = require("../../model/CommitteeSchema");
const TeacherDB = require("../../model/TeacherSchema");
const ProjectDB = require("../../model/ProjectSchema");
const AssignedProjectDB = require("../../model/AssignedProjectSchema");

//const { set } = require("mongoose");

module.exports.addGroup = async (req, res) => {

console.log(req.body)

    var { CommitteeName, ProjectName } = req.body; 
    if (!CommitteeName || !ProjectName)
        return res.status(400).json({ message: "CommitteeName, ProjectName are required." });
    try {
        var Project = await ProjectDB.findOne({ Name: ProjectName });





        if (!Project) {
            return res.status(209).json({ message: `No such project exists` });
        }

        var CommitteeObj = await CommitteeDB.findOne({ Name: CommitteeName });



        if (!CommitteeObj) {
            return res.status(209).json({ message: `No such Committee exists` });
        }


        const Group = await CommitteeDB.findOne({
            Name: CommitteeName,
            Projects: Project._id,
        });

        if (Group) {
            return res.sendStatus(409); //Conflict
        }



        var updateCommittee = await CommitteeDB.updateOne(
            { _id: CommitteeObj._id },
            { $push: { Projects: Project } }
        );


        Project.GroupCommittee = CommitteeObj;

        var UpdateProject = await ProjectDB.updateOne({ Name: ProjectName }, {$set: {GroupCommittee:CommitteeObj }});




        CommitteeObj = await CommitteeDB.findOne({ Name: CommitteeName });
        const result = await CommitteeObj.save();



        var Committee = req.body.CommitteeName  
        Project = req.body.ProjectName



        const AssignedProject = await AssignedProjectDB.create({ Committee, Project });
        console.log(AssignedProject);


        res.json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};



module.exports.getAssignedProject = async (req, res) => {
   
    try {
     

      

        const AssignedProject = await AssignedProjectDB.find()
        res.json(AssignedProject);


    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


//getAssignedProject






module.exports.deleteGroup = async (req, res) => {


    var { CommitteeName, ProjectName } = req.body; 
    if (!CommitteeName || !ProjectName)
        return res.status(400).json({ message: "CommitteeName,  ProjectName are required." });
    try {
        const Project = await ProjectDB.findOne({ Name: ProjectName });

        if (!Project) {
            return res.status(209).json({ message: `No such project exists` });
        }

        var CommitteeObj = await CommitteeDB.findOne({ Name: CommitteeName });

        if (!CommitteeObj) {
            return res.status(209).json({ message: `No such Committee exists` });
        }

        const Group = await CommitteeDB.findOne({
            Name: CommitteeName,
            Projects: Project._id,
        });

        if (!Group) {
            return res.status(209).json({ message: `No such Project exists` });
        }

        var updateCommittee = await CommitteeDB.updateOne(
            { _id: CommitteeObj._id },
            { $pull: { Projects: Project._id } }
        );

        CommitteeObj = await CommitteeDB.findOne({ Name: CommitteeName });
        const result = await CommitteeObj.save();

        const AssignedGroups = await AssignedProjectDB.findOne({ Name: req.body.CommitteeName , Project: req.body.ProjectName });
        const DeleteAssign = await  AssignedGroups.delete();
        console.log(DeleteAssign)


        res.json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};




module.exports.getAllGroup = async (req, res) => {
    var { CommitteeName } = req.body; 
    if (!CommitteeName )
        return res.status(400).json({ message: "CommitteeName are required." });
    try {
     
        var CommitteeObj = await CommitteeDB.findOne({ Name: CommitteeName });

        if (!CommitteeObj) {
            return res.status(209).json({ message: `No such Committee exists` });
        }

        const AllCommittees = await CommitteeDB.findOne({ Name: CommitteeName }).populate({ path: 'Projects' })
        res.json(AllCommittees.Projects);


    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};




module.exports.getOneGroup = async (req, res) => {
    var { CommitteeName, ProjectName } = req.body; // Committe Name and array of teacher emails
    if (!CommitteeName || !ProjectName)
        return res.status(400).json({ message: "CommitteeName, ProjectName are required." });
    try {
        const Project = await ProjectDB.findOne({ Name: ProjectName });

        if (!Project) {
            return res.status(209).json({ message: `No such project exists` });
        }

        var CommitteeObj = await CommitteeDB.findOne({ Name: CommitteeName });

        if (!CommitteeObj) {
            return res.status(209).json({ message: `No such Committee exists` });
        }

        const Group = await CommitteeDB.findOne({Name: CommitteeName, Projects: Project._id});

        if (!Group) {
            return res.status(209).json({ message: `No such Project exists` });
        }

        res.json(Project);


      
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

