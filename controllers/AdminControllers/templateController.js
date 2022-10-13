const Template = require('../../model/TemplateSchema');

module.exports.addTemplate = async (req, res) => {


    var { Title,  Deadline, File, Description } = req.body;
    if (!Title || !Deadline) return res.status(400).json({ 'message': 'Title and Deadline are required.' });


    const duplicate = await Template.findOne({ Title: Title });
    if (duplicate) return res.sendStatus(409); //Conflict 
    try {

        const newTemplate = await Template.create({ Title,  Deadline, File, Description });
        console.log(newTemplate);

        res.status(201).json({ 'success': `New ${newTemplate} created!` });
    }
    catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}


module.exports.deleteTemplate = async (req, res) => {
    if (!req?.params?.title) return res.status(400).json({ 'message': 'Title required.' });

    const template = await Template.findOne({ Title: req.params.title });
    if (!template) {
        return res.status(204).json({ "message": `No such template exists` });
    }
    const result = await template.deleteOne();
    res.json(result);
}


module.exports.updateTemplate = async (req, res) => {
    console.log("Hi"  +req.body.Title)
    if (!req?.body?.Title) {
        return res.status(400).json({ 'message': 'Title is required.' });
    }
    const template = await Template.findOne({ Title: req.body.Title }).exec();
    if (!template) {
        return res.status(204).json({ "message": `No Template matches Title` });
    }
    if (req.body?.Title) template.Title = req.body.Title;
    if (req.body?.DateModified) template.DateModified = req.body.DateModified;
    if (req.body?.Deadline) template.Deadline = req.body.Deadline;
    if (req.body?.File) template.File = req.body.File;
    if (req.body?.Description) template.Description = req.body.Description;



    const result = await template.save();
    res.json(result);
}


module.exports.getAllTemplate = async (req, res) => {
    const templates = await Template.find();
    if (!templates) return res.status(204).json({ 'message': 'No Templates found.' });
    try {
        res.json(templates);
    }
    catch (err) {
        res.status(500).json({ 'message': err.message });
    }

}

module.exports.getTemplate = async (req, res) => {
    if (!req?.body?.Title) return res.status(400).json({ 'message': 'Title required.' });

    const template = await Template.findOne({ Title: req.body.Title }).exec();
    if (!template) {
        return res.status(204).json({ "message": `No template matches Title` });
    }
    res.json(template);
}




//--------------------------------------------------------------





