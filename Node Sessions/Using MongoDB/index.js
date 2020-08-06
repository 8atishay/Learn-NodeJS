var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require("mongoose");
var sessions = require('express-session');
var MongStore = require('connect-mongo')(sessions);

var app = express();

// Include Routes
var routes = require('./routes/router');
app.use('/',routes);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

mongoose.connect('mongodb://MyTester:xyz123@localhost:27017/ecommercedb'
                ,{ useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;

//Handle MongoDB error
db.on('error',console.error.bind(console,'connection error:'));
db.on('open',function(){
    console.log("We are connected");
})

// use sessions for tracking logins
app.use(sessions({
    secret: 'aasshhh',
    resave: true,
    saveUninitialized:false,
    store: new MongStore({
        mongooseConnection: db
    })
}))

// can use either of the two below 
//      1
// app.get('/',function(req,res){
//     res.sendFile(__dirname+'/views/index.html');
// })
//Serve static file from template
//      2
   app.use(express.static(__dirname+'/views'));

app.listen(5000,function(){
    console.log('The Server is running at port 5000');
})