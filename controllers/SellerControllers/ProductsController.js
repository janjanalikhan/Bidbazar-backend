
const SellerDB = require('../../model/SellerSchema');
const ProductDB = require('../../model/ProductSchema');
const BidDB = require('../../model/BidSchema');



module.exports.getSingleProducts = async (req, res) => {


    if (!req?.body?.ID) return res.status(400).json({ 'message': 'ID required.' });

    const product = await ProductDB.findOne({ _id: req.body.ID }).populate({ path: 'Bids', modal: 'Bids', populate: { path: 'Bidder', modal: 'Buyer' } }).populate("ProductOwner");

    if (!product) {
        return res.status(204).json({ "message": `No Product matches Title` });
    }
    res.json(product);

}

module.exports.getAllProducts = async (req, res) => {

//  
    const product = await ProductDB.find().populate({ path: 'Bids', modal: 'Bids', populate: { path: 'Bidder', modal: 'Buyer' } }).populate("ProductOwner");
    if (!product) return res.status(204).json({ 'message': 'No Product found.' });
    try {
       
        res.json(product)
    }
    catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}



module.exports.deleteProduct = async (req, res) => {
    if (!req?.body?.ID) return res.status(400).json({ 'message': 'ID required.' });

    const product = await ProductDB.findOne({ _id: req.body.ID }).exec();
    if (!product) {
        return res.status(204).json({ "message": `No such product exists` });
    }
    const result = await product.deleteOne();
    res.json(result);
}




module.exports.getSellerProducts = async (req, res) => {


    //req.dbId is id of seller

    const products = await SellerDB.findOne({ _id: req.dbId }).populate('Products');
    if (!products) return res.status(204).json({ 'message': 'No Projects found.' });
    try {
        res.json(products)
    }
    catch (err) {
        res.status(500).json({ 'message': err.message });
    }

}


module.exports.addProduct = async (req, res) => {


   

    var { 
        ProductOwnerID,
        Name, 
        Description, 
        Category, 
        Location, 
        InitialPrice, 
        MaxAllowedBid, 
        BidClosingDate, 
        Image } = req.body;

    if (!Name || !ProductOwnerID) return res.status(400).json({ 'message': 'Name || ProductOwnerID  is required.' });

    const duplicate = await ProductDB.findOne({ Name: Name }).exec();
    if (duplicate) return res.sendStatus(409); //Conflict 
    try {


        const ProductOwner = await SellerDB.findOne({ _id: ProductOwnerID });
    

        const newProduct = await ProductDB.create({
            ProductOwner,
            Name, 
            Description, 
            Category, 
            InitialPrice, 
            MaxAllowedBid, 
            Location,
            BidClosingDate,
            Image
        });

        ProductOwner.Products = [...ProductOwner.Products, newProduct._id];


        const result = await ProductOwner.save();

        res.status(201).json({ 'success': `New ${newProduct} created! and added to seller array of products` });

    }
    catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}



module.exports.updateProject = async (req, res) => {
    if (!req?.body?.Name) {
        return res.status(400).json({ 'message': 'Name is required.' });
    }
    const project = await Project.findOne({ Name: req.body.Name }).exec();
    if (!project) {
        return res.status(204).json({ "message": `No Project matches Name` });
    }

    if (req.body?.Name) project.Title = req.body.Name;
    if (req.body?.Description) project.Description = req.body.Description;
    if (req.body?.Status) project.Status = req.body.Status;
    if (req.body?.Deliverable) project.Deliverable = req.body.Deliverable;

    if (req.body?.TeamLeader) {

        var TeamLeader = await Student.findOne({ RegNo: req.body.TeamLeader });
        if (!TeamLeader) {
            return res.status(204).json({ "message": `No such student exists` });
        }
        project.TeamLeader = TeamLeader;

    }

    if (req.body?.GroupMembers) project.GroupMembers = [...project.GroupMembers, req.body.GroupMembers];
    if (req.body?.GroupStatus) project.GroupStatus = req.body.GroupStatus;

    if (req.body?.GroupSupervisor) {
        var GroupSupervisor = await Teacher.findOne({ Email: req.body.GroupCoSupervisor });
        if (!GroupCoSupervisor) {
            return res.status(204).json({ "message": `No such Teacher exists` });
        }
        project.GroupSupervisor = GroupSupervisor;

    }
    if (req.body?.GroupCoSupervisor) {
        var GroupCoSupervisor = await Teacher.findOne({ Email: req.body.GroupCoSupervisor });
        if (!GroupCoSupervisor) {
            return res.status(204).json({ "message": `No such Teacher exists` });
        }
        project.GroupCoSupervisor = GroupCoSupervisor;
    }

    if (req.body?.GroupCommittee) {
        var GroupCommittee = await Committee.findOne({ Name: req.body.GroupCommittee });
        if (!GroupCoSupervisor) {
            return res.status(204).json({ "message": `No such GroupCommittee exists` });
        }
        project.GroupCommittee = GroupCommittee;
    }
    if (req.body?.Average) project.Average = req.body.Average;


    const result = await project.save();
    res.json(result);
}
