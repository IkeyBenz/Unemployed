const api = require('express').Router();

// Forwards from /api route

api.use('/auth', require('./auth'));
api.use('/posts', require('./posts'));
api.use('/users', require('./users'));

module.exports = api;