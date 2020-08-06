var express = require('express');
var app = express();
var jwt = require('jsonwebtoken');
var User = require('../models/schema');

app.post('/signup',function(req,res){
    var user = new User({
        email: req.body.email,
        password: req.body.password
    })
    
    user.save(function(err,data){
        if (err){
            throw err;
        }else{
            res.send('The data is being posted successfully');
        }
    })

    // var userData = {
    //     email :req.body.email,
    //     password: req.body.passwordConf,
    // }

    // User.create(userData,function(err,user){
    //     if(err){
    //         throw err;
    //     }
    //     else{
    //         res.send('The data is being posted successfully');
    //     }
    // })
})

app.post('/authenticate',function(req,res){
    var user ={
        email: req.body.email,
        password: req.body.password
    }

    User.findOne(user).lean().exec(function(err,userDetail){
        if(err){
            return res.json({error: true})
        }if(!userDetail){
            return res.status(404).json({'message': "User detail not found"});
        }
        console.log(userDetail);
        var token = jwt.sign(userDetail,global.config.jwt_secret,{
            expiresIn: '1h'
        });
        res.json({error:false, token: token});
    })
})

module.exports = app;