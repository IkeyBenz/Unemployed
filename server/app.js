const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const expressValidator = require('express-validator');

const mongoose = require('mongoose');
const app = express();

require('dotenv').config();

// Database Connections
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/unemployed', { useNewUrlParser: true });
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error'))
mongoose.Promise = global.Promise;

// Setting up imported Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(expressValidator());
app.use(methodOverride('_method'));
app.use(express.static('public'));

// Controllers
require('./controllers/auth')(app);
require('./controllers/users')(app);
require('./controllers/posts')(app);
require('./controllers/comments')(app);

app.listen(3000, console.log("Listening on 3000"));

module.exports = app;
