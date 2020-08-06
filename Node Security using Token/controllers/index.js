var express = require('express');
var app = express();
var verifyToken = require('../middleware/verifytoken');

app.use('/user',require('./user'));
app.use('/protected',verifyToken,require('./protected'));
module.exports = app;
