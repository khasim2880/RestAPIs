let express = require('express');
let router = express.Router();
let jwt = require('jsonwebtoken');
let User = require('../models/user');

router.post('/signup', function(req, res){
    let user = new User({
        username: req.body.username,
        password: req.body.password
    });
    user.save(function(err, data){
        if(err){
            return res.json({error: true});
        }
        res.json({error:false});
    })
});

router.post('/authenticate', function(req, res){
    let data = {
        username: req.body.username,
        password: req.body.password
    };
    User.findOne(data).lean().exec(function(err, user){
        if(err){
            return res.json({error: true});
        }
        if(!user){
            return res.status(404).json({'message':'User not found!'});
        }
        let token = jwt.sign(user, global.config.jwt_secret, {
            expiresIn: 720 // expires in 30 minutes
        });
        //res.cookie["Authorization"] = "Bearer " + token;
        res.json({error:false, token: "Bearer "+ token, name: user.name});
    })
});

router.get('/allusers', function(req, res){
    User.find({}).lean().exec(function(err, user){
        if(err){
            return res.json({error: true});
        }
        if(!user){
            return res.status(404).json({'message':'Users not found!'});
        }
        res.json({error:false, users: user});
    })
});

router.get('/logout', function(req, res){
    //res.cookie["Authorization"] = null;
    res.json({error: false});
});

router.get('/', function(req, res){
    if(req.decoded){
        res.json({error: false, user: req.decoded.name});
    }else{
        res.json({error: true});
    }
});

module.exports = router;