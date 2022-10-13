const verifyRoles = (...allowedRoles) => {
    //req.role = TeamLead
    //allowedRoles = [team Lead]

    return (req, res, next) => {



        
        if (!req?.Role) return res.sendStatus(401);

        console.log(req.Role, "+" , allowedRoles )
        
        const rolesArray = [...allowedRoles];

        if (rolesArray.includes(req.Role)) {

            console.log("Aasada")
            
            next();
        }

        else  return res.sendStatus(401);
        
    }
}

module.exports = verifyRoles