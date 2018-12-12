const User = require('../models/user');

module.exports = function (app) {

    app.get('/users', (req, res) => {
        User.find({}).then(users => {
            res.json(users);
        }).catch(console.error)
    });
///Do we need this route or will it be handled by front end?
    app.get('/users/:id', (req, res) => {
        User.findById(req.params.id).then(user => {
            res.json(user)
        }).catch(err => {
            console.log(err.message);
            res.status(400).send(err);
        })
    })

    // app.get('/users/:id', (req, res) => {
    //     User.findById(req.params.id).then(user => {
    //         // For some reason 'user._id == req.user._id' was return false
    //         // So this was my quick fix...
    //         if (req.user && String(user._id) == String(req.user._id)) {
    //             // Visiting his own profile
    //             res.render('profile', { user: req.user, profile: user, authorizedEditor: true });
    //         } else {
    //             // Visiting someone else's profile
    //             res.render('profile', { user: req.user, profile: user, authorizedEditor: false });
    //         }
    //     });
    // });
//////// NOTE: // NOTE: Figure out how this will be handled now 
    // app.patch('/users/:id/update', (req, res) => {
    //     User.findByIdAndUpdate(req.params.id, req.body, () => {
    //         User.findById(req.params.id).then(user => {
    //             res.render('profile', { user: req.user, profile: user, authorizedEditor: true });
    //         });
    //     });
    // });

}
