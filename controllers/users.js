let express = require('express');
let router = express.Router();
let User = require('../models/user');

router.get('/', function(req, res){
    if(req.decoded){
        User.find().lean().exec(function(error, users){
            if(error) {
                res.json({error: false});
            }
            res.json(users);
        });
    }
});


module.exports = router;