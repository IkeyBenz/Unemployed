const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const dotenv = require('dotenv').config();
const methodOverride = require('method-override');
const passport = require('passport');
const passportSetup = require('./services/passport');
const authController = require('./controllers/auth');
const postController = require('./controllers/posts');
const commentController = require('./controllers/comments');
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
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }));
app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(express.static('public'));
// app.use(checkAuth);

// Controllers
// require('./controllers/pages')(app);
app.use('/', authController);
app.use('/', postController);
app.use('/', commentController);
app.use('/', require('./controllers/users'));

app.listen(5000, console.log("Listening on 5000"));

module.exports = app;
