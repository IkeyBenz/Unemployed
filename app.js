const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const dotenv = require('dotenv').config();
const methodOverride = require('method-override');
const passport = require('passport');
const cookieSession = require('cookie-session');
const mongoose = require('mongoose');
const app = express();

// Database Connections
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/unemployed', { useNewUrlParser: true });
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error'))
mongoose.Promise = global.Promise;

// Passport setup
require('./services/passport');
app.use(passport.initialize());
app.use(passport.session());

// Middleware
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }));
app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(express.static('public'));

// Controllers
// require('./controllers/pages')(app);
require('./controllers/auth')(app, passport);
require('./controllers/posts')(app);

// Session Handling
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY]
}));

app.listen(5000, console.log("Listening on 5000"));

module.exports = app;
