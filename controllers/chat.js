let express = require('express');
let router = express.Router();
let Message = require('../models/message');

router.post('/save', function(req, res){
    if(req.decoded){
        let message = new Message({
            fromName: req.body.fromName,
            toName: req.body.toName,
            message: req.body.message
        });
        message.save(function(err, data){
            if(err){
                return res.json({error: true});
            }
            res.json({error:false});
        });
    }
});

router.post('/deleteall', function(req, res){
    if(req.decoded){
        Message.deleteMany(function(err, data){
            if(err){
                return res.json({error: true});
            }
            res.json({error:false});
        });
    }
});

router.post('/get', function(req, res){
    if(req.decoded){
        var dat = {
            $or: [
                {
                    fromName: {
                        $in: [req.body.fromName, req.body.toName]
                    }, 
                    toName: {
                        $in: [req.body.fromName, req.body.toName]
                    }
                }
            ]
        };
        Message.find(dat, function(err, data){
            if(err){
                return res.json({error: true});
            }
            res.json({error:false, messages: data});
        });
    }
});

module.exports = router;