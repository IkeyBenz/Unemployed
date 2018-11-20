const passport = require('passport');

module.exports = function (app) {

    app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

    app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
        res.redirect('/');
    });

    app.get('/signout', (req, res) => {
        req.logout();
        res.redirect('/');
    });

}

