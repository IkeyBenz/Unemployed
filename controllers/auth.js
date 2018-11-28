const passport = require('passport');

module.exports = function (app) {

    app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

    app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
        console.log(req.user)
        console.log('in callback')
        res.status(200).send('User Succesfully Authenticated')
    });

    app.get('/signout', (req, res) => {
        req.logout();
        return res.status(200).send('Succesfully Signed Out User')
    });

}
