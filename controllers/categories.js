let express = require('express');
let router = express.Router();
let Category = require('../models/category');

router.get('/', function(req, res){
    if(req.decoded){
        Category.find().lean().exec(function(error, categories){
            if(error) {
                res.json({error: true});
            }
            res.json(categories);
        });
    }
});


module.exports = router;