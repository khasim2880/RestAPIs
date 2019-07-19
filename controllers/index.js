var express = require('express');
var router = express.Router();
let verifyToken = require('../middlewares/verifyToken');

router.use('/', require('./user'));
router.use('/logout', verifyToken, require('./user'));
router.use('/verifyToken', verifyToken, require('./user'));
router.use('/categories', verifyToken, require('./categories'));
router.use('/', verifyToken, require('./products'));
router.use('/messages', verifyToken, require('./chat'));

module.exports = router;
