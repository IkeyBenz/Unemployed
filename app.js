const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const expressValidator = require('express-validator');
const path = require('path');

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
app.use(require('cookie-parser')());
app.use(methodOverride('_method'));
app.use(express.static('public'));

// Controllers
app.use('/api', require('./middleware/check-auth'), require('./controllers/api'));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        console.log("SENDING FILE !!!!!!!!!!!")
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

app.listen(process.env.PORT || 3000, console.log("Listening on 3000"));

module.exports = app;
