const User = require('../models/user');
const jwt = require('jsonwebtoken');

module.exports = function (app) {

    app.post('/signup', (req, res) => {
        const newUser = new User(req.body);
        newUser.save().then(user => {
            const token = jwt.sign({ _id: user._id }, process.env.CLIENT_SECRET, { expiresIn: '60 days' });
            res.cookie(process.env.COOKIE, token, { maxAge: 900000, httpOnly: true });
            res.status(200).end();
        }).catch(error => {
            res.status(400).send(error);
        });
    });

    app.post('/signin', (req, res) => {
        User.findOne({ email: req.body.email }, 'email password').then(user => {
            user.comparePassword(req.body.password, (error, isMatch) => {
                if (isMatch) {
                    const token = jwt.sign({ _id: user._id }, process.env.CLIENT_SECRET, { expiresIn: '60 days' });
                    res.cookie(process.env.COOKIE, token, { maxAge: 900000, httpOnly: true });
                    res.status(200).end();
                } else {
                    res.status(400).send('Incorrect Password');
                }
                if (error) {
                    res.status(400).send(error);
                }
            });
        }).catch(error => {
            res.status(400).send(error);
        });
    });

    app.get('/signout', (req, res) => {
        res.clearCookie(process.env.COOKIE);
        res.status(200).end();
    });

}