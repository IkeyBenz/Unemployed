const User = require('../models/user');

module.exports = function (app) {

    app.get('/users', (req, res) => {
        User.find({}).then(users => {
            res.render('users', { users: users });
        });
    });

    app.get('/users/:id', (req, res) => {
        User.findById(req.params.id).then(user => {
            // For some reason 'user._id == req.user._id' was return false
            // So this was my quick fix...
            if (req.user && String(user._id) == String(req.user._id)) {
                // Visiting his own profile
                res.render('profile', { user: req.user, profile: user, authorizedEditor: true });
            } else {
                // Visiting someone else's profile
                res.render('profile', { user: req.user, profile: user, authorizedEditor: false });
            }
        });
    });

    app.patch('/users/:id/update', (req, res) => {
        User.findByIdAndUpdate(req.params.id, req.body, () => {
            User.findById(req.params.id).then(user => {
                res.render('profile', { user: req.user, profile: user, authorizedEditor: true });
            });
        });
    });

}
