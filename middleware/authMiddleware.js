const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
    //grab token from cookies 
    const token= req.cookies.jwt

    //check json web token exists and is verififed 
    if (token){
        jwt.verify(token, 'net ninja secret', (err, decodedToken) => {
           if (err) {
            console.log(err.message);
            res.redirect('/login');
             } else {
                console.log(decodedToken);
                next();
             } 
        })
    }
    else{
        res.redirect('/login');
    }
}

// check current user 

const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    
    if (token) {
        jwt.verify(token, 'net ninja secret', async (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.locals.user = null;
                next(); 
            } else {
                console.log(decodedToken);
                let user = await User.findByID(decodedToken.id);
                res.locals.user = user; 
                next();
            }
        })
    }
    else {
        res.local.user = nulll;
        next();

    }
}
module.exports = {requireAuth, checkUser};