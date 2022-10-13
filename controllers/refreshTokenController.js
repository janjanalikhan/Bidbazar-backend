const User = require('../model/AdminSchema');
const Student = require('../model/StudentSchema');
const jwt = require('jsonwebtoken');

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const RefreshToken = cookies.jwt;

    console.log(RefreshToken)

    const foundUser = await Student.findOne({ RefreshToken }).exec();
    if (!foundUser) return res.sendStatus(403); //Forbidden 

    
    // evaluate jwt 
    jwt.verify(
        RefreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser.RegNo !== decoded.RegNo) return res.sendStatus(403);
            const role  = foundUser.Role;
            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "RegNo": decoded.RegNo,
                        "Role": role
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '10s' }
            );
            res.json({ role, accessToken })
        }
    );
}

module.exports = { handleRefreshToken }