const api = require('express').Router();

api.use('/auth', require('./auth'));
api.use('/posts', require('./posts'));
api.use('/users', require('./users'));

module.exports = api;