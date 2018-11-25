module.exports = function(req, res, next) {
    if(!req.user) {
        res.redirect('/');
        console.log('user is not logged in.')
    } else {
        return next();
    }
}
