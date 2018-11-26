const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const methodOverride = require('method-override');
const passport = require('passport');
require('./services/passport');
const cookieSession = require('cookie-session');

const mongoose = require('mongoose');
const app = express();


// Session Handling
app.use(cookieSession({
    name: 'UN-Session',
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY]
}));

// Passport setup
app.use(passport.initialize());
app.use(passport.session());

// Database Connections
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/unemployed', { useNewUrlParser: true });
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error'))
mongoose.Promise = global.Promise;

// Setting up imported Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(express.static('public'));

// Controllers
require('./controllers/auth')(app);
require('./controllers/users')(app);
require('./controllers/posts')(app);
require('./controllers/comments')(app);

app.listen(5000, console.log("Listening on 5000"));

module.exports = app;
