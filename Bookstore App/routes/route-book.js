var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Book = require('../models/book');
var passport = require('passport');
require('../config/passport')(passport);

var test = function(req,res,next){
    // console.log(ExtractJwt.fromAuthHeaderWithScheme('JWT'));
    next();
}

getToken = function(headers){
    if(headers && headers.authorization){
        var parted = headers.authorization.split(' ');
        if(parted.length===2){
            return parted[1];
        }else{
            return null;
        }
    }
}

// Get All Books 
router.get('/',test,passport.authenticate('jwt',{session:false}),function(req,res,next){
    
    var token = getToken(req.headers);
    if(token){
        Book.find(function(err,data){
            if (err){
                return next();
            }
            res.json(data);
        })
    }else{
        // console.log('error');
        return res.status(403).send({success:false, msg:'Unautherized'});
    }
})
    

// Save Book 
router.post('/',passport.authenticate('jwt',{session:false}),function(req,res){
    var token = getToken(req.header);
    // console.log('routes book');
    if(token){
        Book.create(req.body,function(err,data){
            if (err){
                throw err;
            }
            res.json(data);
        })
    }else{
        return res.status(403).send({success:false, msg:'Unautharized'});
    }
})

module.exports = router;
