var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;

var User = require('../models/User');
var settings = require('../config/settings');


module.exports= function(passport){
    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('JWT');
    // opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = settings.secret;
    passport.use(new JwtStrategy(opts,function(jwt_payload,done){
        User.findById(jwt_payload._id)
            .then(user=>{
                if (user){
                    return done(null, user);
                }
                return done(null,false);    
            })
            .catch(err=>{
                console.error(err);
            });
  
        // User.findOne({username:'},function(err,user){
        // User.findById(jwt_payload.id,function(err,user){
        //     if (err){    
        //         return done(err,false);
        //     }
        //     if (user){
        //         return done(null, user);
        //     }
        //     else{
        //         return done(null,false);
        //     }
        // })
    }))      
}