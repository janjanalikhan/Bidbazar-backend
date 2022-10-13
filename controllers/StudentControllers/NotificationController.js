const NotificationDB = require('../../model/NotificationSchema');
const StudentDB = require('../../model/StudentSchema');
const ProjectDB = require('../../model/ProjectSchema');

module.exports.getNotifications = async (req, res) => {

    var { Title } = req.body;
    var Email = req.Email;
   // if (!Email) return res.status(400).json({ 'message': 'Email is required.' });

    const notification = await NotificationDB.findOne({ Title: req.body.Title });
    if (!notification) {
        return res.status(204).json({ "message": `No notification matches Title` });
    }
    res.json(notification);
}

module.exports.sendNotification = async (req, res) => {

    var { Title, Content, Sender, Date} = req.body;
    if (!Title) return res.status(400).json({ 'message': 'Title is required.' });

    try {
        const newNotification = await NotificationDB.create({ Title, Content, Sender, Date });
        console.log(newNotification);

        var updateStudent = await StudentDB.updateOne(
            { _id: CommitteeObj._id },
            { $push: { Students: StudentDB } }
        );


        res.status(201).json({ 'success': `New ${newNotification} created!` });
    }

    catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}


   




