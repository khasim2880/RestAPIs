let express = require('express');
let router = express.Router();
let Product = require('../models/product');

router.post('/', function(req, res){
    if(req.decoded){
        Product.find({category: req.body.category}).lean().exec(function(error, products){
            if(error) {
                res.json({error: true});
            }
            res.json(products);
        });
    }
});


module.exports = router;