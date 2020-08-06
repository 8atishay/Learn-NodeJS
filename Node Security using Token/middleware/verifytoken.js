var jwt = require('jsonwebtoken');

module.exports = function(req,res,next){
    var token = req.body.token || req.query.token || req.header['x-access-token'];
    if(token){
        jwt.verify(token,global.config.jwt_secret,function(err,decoded){
            if(err){
                return res.json({error:true});
            }
            req.decoded = decoded;
            next();
        })
    }else{
        // forbidden without token
        return res.status(403).send({error:true});
    }
}