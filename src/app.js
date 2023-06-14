const express = require('express');
const connection = require('./config/DatabaseConfig')
const bodyParser = require('body-parser');
var path = require('path');
const tutorialRoute = require('./routes/tutorial.route')
const chatRoute = require('./routes/chat.route.js')



const app = express();


app.use(express.json());
app.use(bodyParser.json());
app.use('/Chat',chatRoute);
app.use('/api/tutorial', tutorialRoute);




module.exports = app;