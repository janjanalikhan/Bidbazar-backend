const jwt = require('jsonwebtoken');


const verifyJWT = (req, res, next) => {


    
    const cookies = req.cookies;
    
    if (!cookies?.jwt) return res.sendStatus(401);

    const RefreshToken = cookies.jwt;
  

    
    jwt.verify(
        RefreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
           
            if (err) return res.json(err); //invalid token
        
            req.Email = decoded.Email;
            req.Role = decoded.Role;
         
            next();
        }
    );
}

module.exports = verifyJWT