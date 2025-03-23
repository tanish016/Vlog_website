const jwt = require('jsonwebtoken');
const secretKey = process.env.jwtSecret || 'workoutapp';

const checkAuth = (req, res, next) => {
    const token = req.cookies.token;
    if (token) {
        jwt.verify(token, secretKey, (err, user) => {
            if (err) {
                return next();
            }
            console.log("check it ");
            return res.redirect('/');
        });
    } else {
        next();
    }
};

module.exports = checkAuth;