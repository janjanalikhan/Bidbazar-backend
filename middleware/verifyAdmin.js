const jwt = require('jsonwebtoken');


const verifyAdmin = (req, res, next) => {
    const cookies = req.cookies;
    console.log("COOKIES")
    if (!cookies?.jwt) return res.sendStatus(401);

    const RefreshToken = cookies.jwt;

    console.log(RefreshToken)
    
    jwt.verify(
        RefreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.sendStatus(403); //invalid token
            // req.Adminname = decoded.Admin;
            // req.Password = decoded.Password;
            next();
        }
    );
}

module.exports = verifyAdmin