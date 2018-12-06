const User = require('../models/user');
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    if (req.cookies.UnToken) {
        const uid = jwt.decode(req.cookie('unToken'), process.env.CLIENT_SECRET)._id;
        User.findById(uid).then(user => {
            req.user = user;
            res.locals.authenticatedUser = user;
            return next();
        });
    } else {
        return next();
    }
}
