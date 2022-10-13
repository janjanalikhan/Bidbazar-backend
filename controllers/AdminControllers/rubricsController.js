const RubricsCommittee = require("../../model/RubricsCommitteeSchema");
const RubricsSupervisor = require('../../model/RubricsSupervisorSchema');

module.exports.addCommitteeRubrics = async (req, res) => {
  var { Name,  Questions } = req.body;
 
  if (!Name || !Questions) return res.status(400).json({ message: "Wrong Evaluation Object" });

  const duplicate = await RubricsCommittee.findOne({ Name : Name }).exec();

  if (duplicate) return res.sendStatus(409); //Conflict

  try {
    const newRubricsCommittee = await RubricsCommittee.create({ Name, Questions });
    console.log(newRubricsCommittee);

    res.status(201).json({ success: `New ${newRubricsCommittee} created!` });
    
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}


module.exports.addSupervisorRubrics = async (req, res) => {
  var { Name, Questions } = req.body;
 
  if (!Name || !Questions ) return res.status(400).json({ message: "Wrong Evaluation Object" });

  const duplicate = await RubricsSupervisor.findOne({ Name : Name }).exec();

  if (duplicate) return res.sendStatus(409); //Conflict

  try {
    const newRubricsSupervisor = await RubricsSupervisor.create({ Name, Questions });
    console.log(newRubricsSupervisor);

    res.status(201).json({ success: `New ${newRubricsSupervisor} created!` });
    
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

//--------------------------------------------------------------

module.exports.deleteCommitteeRubrics = async (req, res) => {
  if (!req?.body?.Name)
    return res.status(400).json({ message: "Name required." });

  const rubrics = await RubricsCommittee.findOne({ Name: req.body.Name }).exec();
  if (!rubrics) {
    return res.status(204).json({ message: `No such Rubrics exists` });
  }
  const result = await rubrics.deleteOne();
  res.json(result);
};

module.exports.deleteSupervisorRubrics = async (req, res) => {
  if (!req?.body?.Name)
    return res.status(400).json({ message: "Name required." });

  const rubrics = await RubricsSupervisor.findOne({ Name: req.body.Name }).exec();
  if (!rubrics) {
    return res.status(204).json({ message: `No such Rubrics exists` });
  }
  const result = await rubrics.deleteOne();
  res.json(result);
};

//---------------------------------------------------------------

module.exports.getCommitteeRubrics = async (req, res) => {


  const rubrics = await RubricsCommittee.find();
  if (!rubrics) {
    return res.status(204).json({ message: `No Rubrics matches name` });
  }
  res.json(rubrics);
};

module.exports.getSupervisorRubrics = async (req, res) => {


  const rubrics = await RubricsSupervisor.find();
  if (!rubrics) {
    return res.status(204).json({ message: `No Rubrics matches name` });
  }
  res.json(rubrics);
};


module.exports.supervisorAddQuestion= async (req, res) => {

  var { Name,  Question_Object } = req.body;

  if (!Name || !Question_Object) {
      return res.status(400).json({ 'message': 'Name of Evaluation and Question is required.' });
  }
  const rubrics = await RubricsSupervisor.findOne({ Name: req.body.Name });
  if (!rubrics) {
    return res.status(204).json({ message: `No Rubrics matches name` });
  }
  if (req.body?.Question_Object) {

    var updateRubrics = await RubricsSupervisor.updateOne(
      { '_id': rubrics._id },
      { $push: { Questions: Question_Object } },
  )
  }
  const result = await rubrics.save();
  res.json(result);
}

module.exports.supervisorDeleteQuestion= async (req, res) => {

  var { Name,  Question_id } = req.body;


  if (!Name || !Question_id) {
      return res.status(400).json({ 'message': 'Name of Evaluation and Question ID is required.' });
  }

  const rubrics = await RubricsSupervisor.findOne({ Name: req.body.Name });
  if (!rubrics) {
    return res.status(204).json({ message: `No Rubrics matches name` });
  }
  if (req.body?.Question_id) {

    var updateRubrics = await RubricsSupervisor.updateOne(
      { '_id': rubrics._id },
      { $pull: { Questions: {'_id': Question_id  }}},
  )
  }
  res.json(rubrics.Questions);

}




module.exports.committeeAddQuestion= async (req, res) => {

  var { Name,  Question_Object } = req.body;

  if (!Name || !Question_Object) {
      return res.status(400).json({ 'message': 'Name of Evaluation and Question is required.' });
  }
  const rubrics = await RubricsCommittee.findOne({ Name: req.body.Name });
  if (!rubrics) {
    return res.status(204).json({ message: `No Rubrics matches name` });
  }
  if (req.body?.Question_Object) {

    var updateRubrics = await RubricsCommittee.updateOne(
      { '_id': rubrics._id },
      { $push: { Questions: Question_Object } },
  )
  }
  const result = await rubrics.save();
  res.json(result);
}








module.exports.committeeDeleteQuestion= async (req, res) => {

  console.log(req.body)

  var { Name,  Question_id } = req.body;

  console.log("Here", req.body)

  if (!Name || !Question_id) {
      return res.status(400).json({ 'message': 'Name of Evaluation and Question ID is required.' });
  }
  console.log("Bye");

  const rubrics = await RubricsCommittee.findOne({ Name: req.body.Name });
  if (!rubrics) {
    return res.status(204).json({ message: `No Rubrics matches name` });
  }
  if (req.body?.Question_id) {

    var updateRubrics = await RubricsCommittee.updateOne(
      { '_id': rubrics._id },
      { $pull: { Questions: {'_id': Question_id  }}},
  )
  }
  console.log(rubrics)
  res.json(rubrics);

  

}
