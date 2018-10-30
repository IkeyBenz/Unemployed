const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const dotenv = require('dotenv').config();
const app = express();

app.engine('handlebars', exphbs({ defaultLayout: 'main', extname: 'hbs' }));
app.set('view engine', 'hbs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));



app.listen(5000, console.log("Listening on 5000"));


