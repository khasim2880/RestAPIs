var express = require('express');
var router = express.Router();
let verifyToken = require('../middlewares/verifyToken');

router.use('/', require('./user'));
router.use('/categories', verifyToken, require('./categories'));
router.use('/products', verifyToken, require('./products'));

module.exports = router;
