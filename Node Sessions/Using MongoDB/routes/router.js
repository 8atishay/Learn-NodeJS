var express = require('express');
// var router = express.Router();
var app = express();
var User = require("../models/user");

app.get('/',function(req,res){
    res.sendFile(__dirname+'/views/index.html');
})

app.post('/',function(req,res,next){
    // confirm user type the same password
    if(req.body.password != req.body.passwordConf){
        var err = new Error('Password do  not march.');
        err.status = 400;
        res.send('Password do not match');
        return next(err);
    }

    if(req.body.email && req.body.username &&
    req.body.password && req.body.passwordConf){
        var userData = {
            email :req.body.email,
            username: req.body.username,
            password: req.body.passwordConf,
            passwordConf: req.body.passwordConf
        }

        User.create(userData,function(err,user){
            if(err){
                throw err;
            }
            else{
                req.session.userID = user._id;
                return res.redirect('/admin');
            }
        })
    }
})

app.get('/admin',function(req,res,next){
    if(req.session.userID){
        User.findById(req.session.userID).exec(function(err,user){
            if(err){
                return next(err);
            }else{
                if (user == null){
                    var err = new Error('Not Authorisesd');
                    err.status = 400;
                    return next(err);
                }else{
                    return res.send('<h2>Hello '+user.username+'!!</h2>'+"<br><a href='/logout'>Logout</a>");
                }
            }
        })
    }
})

app.get('/logout',function(req,res,next){
    if(req.session){
        req.session.destroy(function(err){
            if (err){
                return next(err);
            }else{
                return res.redirect('/');
            }
        });
    }
})

module.exports = app;