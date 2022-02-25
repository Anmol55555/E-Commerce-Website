// Middleware File to verify user JWT token to be used in user.js file

const jwt = require("jsonwebtoken");


const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;
    if(authHeader) {                                                    // If authHeader exist, then we are gonna verify the token
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SEC, (err, user) => {
            if(err) {
                res.status(403).json("Token is not valid!");
            }
            req.user = user;
            next();                                                      // this make it leaves the function and export 
        });
    }
    else {                                                              // If we do not get authHeader
        return res.status(401).json("You are not authenticated");
    }

};

const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.id === req.params.id || req.user.isAdmin == true) {             // if the user db id matches with the id enetered in the route link  OR  the given user is the admin then , we will match the JWT token and authorize the user to perform CRUD operations.
            next();
        }
        else {
            res.status(403).json("You are not allowed to do that");
        }

    })
}

// To verify Admin Token only as product page type functionality (CRUD) ooperations can only be performed by admin only
const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.isAdmin == true) {             // the given user is the admin then only , we will match the JWT token and authorize the user to perform CRUD operations.
            next();
        }
        else {
            res.status(403).json("You are not allowed to do that");
        }

    })
}


module.exports = { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin };