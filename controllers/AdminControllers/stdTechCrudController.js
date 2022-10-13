
const Student = require('../../model/StudentSchema');
const Teacher = require('../../model/TeacherSchema');



const bcrypt = require('bcrypt');


module.exports.addNewStudent = async (req, res) => {

    console.log("IM HERE")
    console.log(req.body.ProfilePicture)

    var { Name, RegNo, Email, Password, PhoneNumber, Gender, Position, FypStatus,
        CommitteeEvaluation, SupervisorEvaluation, Notifications, OnlineStatus, Project, ProfilePicture } = req.body;
    if (!Name || !RegNo || !Password) return res.status(400).json({ 'message': 'Username, Reg No and password are required.' });
    var Role = "TeamMember"
    // Check if user already exists
    const duplicate = await Student.findOne({ RegNo: RegNo }).exec();
    if (duplicate) return res.sendStatus(409); //Conflict 
    try {
        //encrypt the password
        Password = await bcrypt.hash(Password, 10);

        const newStudent = await Student.create({
            Name, RegNo, Email, Password, PhoneNumber, Gender,
            Role, Position, FypStatus, CommitteeEvaluation, SupervisorEvaluation, ProfilePicture,
            Notifications, OnlineStatus, Project
        });

        console.log(newStudent);

        res.status(201).json({ 'success': `New user ${newStudent} created!` });
    }
    catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}



module.exports.updateStudent = async (req, res) => {
    console.log("IM BODY", req.body)
    var { RegNo } = req.body;


    if (!RegNo) return res.status(400).json({ 'message': 'RegNo is required.' });



    const student = await Student.findOne({ RegNo: req.body.RegNo });
    if (!student) {
        return res.status(204).json({ "message": `No Student matches RegNo ${req.body.RegNo}.` });
    }
    if (req.body?.Name) student.Name = req.body.Name;
    if (req.body?.ProfilePicture) student.ProfilePicture = req.body.ProfilePicture;

    if (req.body?.RegNo) student.RegNo = req.body.RegNo;
    if (req.body?.Email) student.Email = req.body.Email;
    if (req.body?.PhoneNumber) student.PhoneNumber = req.body.PhoneNumber;
    if (req.body?.Gender) student.Gender = req.body.Gender;
    if (req.body?.Role) student.Role = req.body.Role;
    if (req.body?.Position) student.Position = req.body.Position;
    if (req.body?.FypStatus) student.FypStatus = req.body.FypStatus;
    if (req.body?.CommitteeEvaluation) student.CommitteeEvaluation = req.body.CommitteeEvaluation;
    if (req.body?.SupervisorEvaluation) student.SupervisorEvaluation = req.body.SupervisorEvaluation;
    if (req.body?.Notifications) student.SupervisorNotifications = req.body.SupervisorNotifications;
    if (req.body?.OnlineStatus) student.OnlineStatus = req.body.OnlineStatus;

    if (req.body?.Password) {
        student.Password = await bcrypt.hash(req.body.Password, 10);
    }

    const result = await student.save();
    res.json(result);
}


module.exports.deleteStudent = async (req, res) => {

    if (!req?.params?.regno) return res.status(400).json({ 'message': 'Student RegNo required.' });

    const student = await Student.findOne({ RegNo: req.params.regno }).exec();
    if (!student) {
        return res.status(204).json({ "message": `No student matches RegNo ${req.params.regno}.` });
    }
    const result = await student.deleteOne(); //{ _id: req.body.id }
    res.json(result);
}




module.exports.getStudent = async (req, res) => {

    if (!req?.body?.RegNo) return res.status(400).json({ 'message': 'Student RegNo required.' });

    const student = await Student.findOne({ RegNo: req.body.RegNo }).populate({ path: 'Project', modal: 'Project', populate: { path: 'Requirements', modal: 'Requirements', populate: { path: 'AssignedTo', modal: 'Student' } } }).populate({ path: 'CommitteeEvaluation', modal: 'CommitteeEvaluation' ,  populate: { path: 'Teacher', modal: 'Teacher'}})



    if (!student) {
        return res.status(204).json({ "message": `No student matches RegNo ${req.body.RegNo}.` });
    }
    console.log("IM HERE", student)
    res.json(student);

}



module.exports.getStudentForSupervisorEvaluation = async (req, res) => {

    if (!req?.body?.RegNo) return res.status(400).json({ 'message': 'Student RegNo required.' });

    const student = await Student.findOne({ RegNo: req.body.RegNo }).populate({ path: 'Project', modal: 'Project', populate: { path: 'Requirements', modal: 'Requirements', populate: { path: 'AssignedTo', modal: 'Student' } } }).populate({ path: 'SupervisorEvaluation', modal: 'SupervisorEvaluation' ,  populate: { path: 'Teacher', modal: 'Teacher'}})



    if (!student) {
        return res.status(204).json({ "message": `No student matches RegNo ${req.body.RegNo}.` });
    }
    console.log("IM HERE", student)
    res.json(student);

}




module.exports.getAllStudent = async (req, res) => {
    const students = await Student.find();
    if (!students) return res.status(204).json({ 'message': 'No Students found.' });
    try {
        res.json(students);
    }
    catch (err) {
        res.status(500).json({ 'message': err.message });
    }

}





//--------------------------------------------------------------






module.exports.addNewTeacher = async (req, res) => {

    var { Name, Email, Password, PhoneNumber, Gender, isSupervisor, isCommittee, Designation, ProfilePicture } = req.body;
    // Name = "Ali"
    // Email = "ali@yahoo.com"
    // Password = "1234",
    // PhoneNumber = "03001234567",
    // Gender = true,
    // Role = "Supervisor",
    // Designation = "Teacher";

    if (!Name || !Email || !Password) return res.status(400).json({ 'message': 'Name, Email and password are required.' });

    // Check if user already exists
    const duplicate = await Teacher.findOne({ Email: Email }).exec();
    if (duplicate) return res.sendStatus(409); //Conflict 
    try {
        //encrypt the password
        Password = await bcrypt.hash(Password, 10);

        const newTeacher = await Teacher.create({ Name, Email, Password, PhoneNumber, Gender, isSupervisor, isCommittee, Designation, ProfilePicture });
        console.log(newTeacher);

        res.status(201).json({ 'success': `New user ${newTeacher} created!` });
    }
    catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}


module.exports.updateTeacher = async (req, res) => {

    console.log("Here " + req.body.Email)

    console.log("")
    if (!req?.body?.Email) {
        return res.status(400).json({ 'message': 'Email parameter is required.' });
    }
    console.log("Check")

    const teacher = await Teacher.findOne({ Email: req.body.Email });

    if (!teacher) {
        return res.status(204).json({ "message": `No teacher matches  ${req.body.Email}.` });
    }
    if (req.body?.Name) teacher.Name = req.body.Name;
    if (req.body?.ProfilePicture) teacher.ProfilePicture = req.body.ProfilePicture;
    if (req.body?.Email) teacher.Email = req.body.Email;
    if (req.body?.PhoneNumber) teacher.PhoneNumber = req.body.PhoneNumber;
    if (req.body?.Gender) teacher.Gender = req.body.Gender;
    if (req.body?.isSupervisor) teacher.isSupervisor = req.body.isSupervisor;
    if (req.body?.isCommittee) teacher.isCommittee = req.body.isCommittee;
    if (req.body?.Designation) teacher.Designation = req.body.Designation;



    if (req.body?.Password) {
        teacher.Password = await bcrypt.hash(req.body.Password, 10);
    }

    const result = await teacher.save();
    res.json(result);

}




module.exports.deleteTeacher = async (req, res) => {

    if (!req?.params?.email) return res.status(400).json({ 'message': 'Teachers Email required.' });

    console.log("Hi")

    const teacher = await Teacher.findOne({ Email: req?.params?.email });
    if (!teacher) {
        return res.status(204).json({ "message": `No teacher matches email ${!req?.params?.email}.` });
    }
    const result = await teacher.deleteOne(); //{ _id: req.body.id }
    res.json(result);
}



module.exports.getTeacher = async (req, res) => {
    if (!req?.body?.Email) return res.status(400).json({ 'message': 'Teacher email required.' });

    const teacher = await Teacher.findOne({ Email: req.body.Email })
        .populate({
            path: 'Committee', modal: 'Committee', populate: { path: 'Teacher', modal: 'Teacher' },
            populate: { path: 'Projects', modal: 'Project', populate: { path: 'GroupMembers', modal: 'Student' } }
        })

    if (!teacher) {
        return res.status(204).json({ "message": `No teacher matches Email ${req.body.Email}.` });
    }
    res.json(teacher);



}






module.exports.getAllTeacher = async (req, res) => {

    const teachers = await Teacher.find();
    if (!teachers) return res.status(204).json({ 'message': 'No Teachers found.' });

    res.json(teachers);

}


//--------------------------------------------------------------



