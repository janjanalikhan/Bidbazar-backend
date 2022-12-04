const Seller = require('../model/SellerSchema');
const Buyer = require('../model/BuyerSchema');
const Admin = require('../model/AdminSchema');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const SignUp = async (req, res) => {




    var { Name, Email, Password, PhoneNumber, Address, ProfilePicture, CategoryInterestedIn, Country, Role } = req.body;
    if (!Name || !Email || !Password) return res.status(400).json({ 'message': 'Name, Email and Password is required.' });

    if (Role == "Seller") {
        const duplicate = await Seller.findOne({ Email: Email }).exec();
        if (duplicate) return res.sendStatus(409); //Conflict 
        try {
            //encrypt the password
            Password = await bcrypt.hash(Password, 10);

            const newSeller = await Seller.create({
                Name, Email, Password, PhoneNumber, ProfilePicture, Role, Country
            });



            res.status(201).json({ 'success': `New Seller ${newSeller} created!` });
        }
        catch (err) {
            res.status(500).json({ 'message': err.message });
        }

    }

    else if (Role == "Buyer") {

        const duplicate = await Buyer.findOne({ Email: Email }).exec();
        if (duplicate) return res.sendStatus(409); //Conflict 
        try {
            //encrypt the password
            Password = await bcrypt.hash(Password, 10);

            const newBuyer = await Buyer.create({
                Name, Email, Password, PhoneNumber, Address, ProfilePicture, Role, CategoryInterestedIn, Country
            });



            res.status(201).json({ 'success': `New Buyer created!` });
        }
        catch (err) {
            res.status(500).json({ 'message': err.message });
        }


    }


}


const SellerLogin = async (req, res) => {


    const { Email, Password } = req.body;

    if (!Email || !Password) return res.status(400).json({ 'message': 'Email and password are required.' });

    const foundSeller = await Seller.findOne({ Email: Email }).exec();


    if (!foundSeller) return res.sendStatus(401); //Unauthorized 
    const match = await bcrypt.compare(Password, foundSeller.Password);

    if (match) {


        const refreshToken = jwt.sign(

            {
                "dbId": foundSeller._id,
                "Email": foundSeller.Email,
                "Name": foundSeller.Name,
                "Role": "Seller"
            },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );
        // Saving refreshToken with current user in db
        foundSeller.RefreshToken = refreshToken;

        const result = await foundSeller.save();

        // Creates Secure Cookie with refresh token

        res.cookie('jwt', refreshToken, { secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });

        console.log("Seller Successfully Logged In")
        // Send authorization roles and access token to user
        res.json({ Role: "Seller", refreshToken });

    } else {
        res.sendStatus(401);
    }


}

const BuyerLogin = async (req, res) => {

    const { Email, Password } = req.body;

    if (!Email || !Password) return res.status(400).json({ 'message': 'Email and password are required.' });

    const foundBuyer = await Buyer.findOne({ Email: Email }).exec();


    if (!foundBuyer) return res.sendStatus(401); //Unauthorized 
    const match = await bcrypt.compare(Password, foundBuyer.Password);
    console.log(process.env.ACCESS_TOKEN_SECRET)
    if (match) {

        const refreshToken = jwt.sign(
            {
                "dbId": foundBuyer._id,
                "Email": foundBuyer.Email,
                "Name": foundBuyer.Name,
                "Role": "Buyer"

            },
            "" + process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );
        // Saving refreshToken with current user in db
        foundBuyer.RefreshToken = refreshToken;

        const result = await foundBuyer.save();

        // Creates Secure Cookie with refresh token

        res.cookie('jwt', refreshToken, { secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });

        console.log("Buyer Successfully Logged In ")
        // Send authorization roles and access token to user
        res.json({ Role: "Buyer", refreshToken });

    } else {
        res.sendStatus(401);
    }



}


const AdminLogin = async (req, res) => {

    console.log(req.body)

    const { Email, Password } = req.body;

    if (!Email || !Password) return res.status(401).json({ 'message': 'Email and password are required.' });


    const foundAdmin = await Admin.findOne({ Email: Email }).exec();

    if (foundAdmin == null) return res.sendStatus(401); //Unauthorized
    if (Password != foundAdmin.Password) return res.sendStatus(401); //Unauthorized 

    console.log("FOUND")


    const refreshToken = jwt.sign(
        {
            "dbId": foundAdmin._id,
            "Name": "Admin",
            "Email": foundAdmin.Email,
            "Role": "Admin"

        },
        "" + process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '1d' }
    );
    // Saving refreshToken with current user in db
    foundAdmin.RefreshToken = refreshToken;

    const result = await foundAdmin.save();


    // Creates Secure Cookie with refresh token
    res.cookie('jwt', refreshToken, { secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });

    // Send authorization roles and access token to user
    res.json({ refreshToken, "Role": "Admin" });

}

module.exports = { SignUp, SellerLogin, BuyerLogin, AdminLogin };