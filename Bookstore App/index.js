var express = require('express');
var app = express();
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var logger = require('morgan');
var path = require('path');

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/adminportaldb',{
    useNewUrlParser:true,
    useUnifiedTopology: true,
    promiseLibrary: require('bluebird')
})
.then(()=>{console.log('Mongoose connection is successful');})
.catch((err)=>{console.error(err);})


// app.use(express.bodyParser());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'build')));

var book = require('./routes/route-book');
var auth = require('./routes/auth-login-register');
app.use('/api/book',book);
app.use('/api/auth',auth);

app.use(function(req,res,next){
    var err = new Error('Not Found');
    err.status=404;
    next(err);
})

app.use(function(err,req,res,next){
    //set locals to provide errors in development
    res.locals.message = err.message;
    // res.locals.Error = req.app.get('env') = 'development' ? err: {};
    
    // render error page
    res.status(err.status||500);
    
    // res.render('error');
    res.json({ 
        message: err.message,
        error: err 
    });

})

module.exports= app;