const User = require('../models/user');
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    if (req.cookies.UnToken) {
        const uid = jwt.decode(req.cookies.UnToken, process.env.CLIENT_SECRET)._id;
        User.findById(uid).then(user => {
            req.user = user;
            return next();
        });
    } else {
        res.user = null;
        return next();
    }
}
