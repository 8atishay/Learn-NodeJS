var express = require('express');
const { Mongoose } = require('mongoose');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
global.config = require('./configurations/config');
var jwt = require('jsonwebtoken');
var User = require('./models/schema');

mongoose.connect('mongodb://MyTester:xyz123@localhost:27017/ecommercedb'
                ,{ useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

db.once("open", function() {
  console.log("Connection Successful!");
});

app.use(bodyParser.json());
app.use(require('./controllers'));

 
app.get('/',function(req,res){
    res.send("Hello World!!");
})


app.listen(5000,function(){
    console.log('App running at port 5000!!');
})