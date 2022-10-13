

const Announcement = require('../../model/AnnouncementSchema');


module.exports.addAnnouncement = async (req, res) => {


    var { Title, Description, ModifiedDate} = req.body;
    if (!Title) return res.status(400).json({ 'message': 'Title is required.' });

    const duplicate = await Announcement.findOne({ Title: Title }).exec();
    if (duplicate) return res.sendStatus(409); //Conflict 
    try {

        const newAnnouncement = await Announcement.create({ Title, Description, ModifiedDate});
        console.log(newAnnouncement);

        res.status(201).json({ 'success': `New ${newAnnouncement} created!` });
    }
    catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}


module.exports.deleteAnnouncement = async (req, res) => {
    console.log("Here" + req?.params?.title)

    if (!req?.params?.title) return res.status(400).json({ 'message': 'Title required.' });


    const announcement = await Announcement.findOne({ Title: req.params.title });
    if (!announcement) {
        return res.status(204).json({ "message": `No such announcements exists` });
    }
    const result = await announcement.deleteOne();
    res.json(result);
}


module.exports.updateAnnouncement = async (req, res) => {
    if (!req?.body?.Title) {
        return res.status(400).json({ 'message': 'Title is required.' });
    }
    const announcement = await Announcement.findOne({ Title: req.body.Title });
    if (!announcement) {
        return res.status(204).json({ "message": `No Announcement matches Title` });
    }
    if (req.body?.Title) announcement.Title = req.body.Title;
    if (req.body?.Description) announcement.Description = req.body.Description;


    const result = await announcement.save();
    res.json(result);
}


module.exports.getAllAnnouncement = async (req, res) => {
    const announcements = await Announcement.find();
    if (!announcements) return res.status(204).json({ 'message': 'No Announcements found.' });
    try {
        res.json(announcements);
    }
    catch (err) {
        res.status(500).json({ 'message': err.message });
    }

}

module.exports.getAnnouncement = async (req, res) => {
    if (!req?.body?.Title) return res.status(400).json({ 'message': 'Title required.' });

    const announcement = await Announcement.findOne({ Title: req.body.Title });
    if (!announcement) {
        return res.status(204).json({ "message": `No announcement matches Title` });
    }
    res.json(announcement);
}

