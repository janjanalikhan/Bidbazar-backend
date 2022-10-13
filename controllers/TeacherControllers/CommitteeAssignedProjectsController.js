const Committee = require("../../model/CommitteeSchema");
const ProjectDB = require("../../model/ProjectSchema");


module.exports.getAllGroup = async (req, res) => {
    var { CommitteeName } = req.body; 
    if (!CommitteeName )
        return res.status(400).json({ message: "CommitteeName are required." });
    try {
     
        var CommitteeObj = await Committee.findOne({ Name: CommitteeName });

        if (!CommitteeObj) {
            return res.status(209).json({ message: `No such Committee exists` });
        }

        const AllCommittees = await Committee.findOne({ Name: CommitteeName }).populate({ path: 'Projects' })
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

        var CommitteeObj = await Committee.findOne({ Name: CommitteeName });

        if (!CommitteeObj) {
            return res.status(209).json({ message: `No such Committee exists` });
        }

        const Group = await Committee.findOne({Name: CommitteeName, Projects: Project._id});

        if (!Group) {
            return res.status(209).json({ message: `No such Project exists` });
        }

        res.json(Project);


      
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

