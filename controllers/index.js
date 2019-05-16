var express = require('express');
var router = express.Router();
let verifyToken = require('../middlewares/verifyToken');

router.use('/', require('./user'));
router.use('/users', verifyToken, require('./users'));

module.exports = router;
