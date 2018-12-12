const User = require('../models/user');
const users = require('express').Router();

// Top level forwarding from /api/users
users.get('/', (req, res) => {
    User.find({}).then(users => {
        res.json(users);
    }).catch(console.error)
});

users.get('/:id', (req, res) => {
    User.findById(req.params.id).then(user => {
        res.json(user)
    }).catch(err => {
        console.log(err.message);
        res.status(400).send(err);
    });
});

module.exports = users;