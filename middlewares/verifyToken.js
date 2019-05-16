var jwt = require('jsonwebtoken');

module.exports = function(req,res,next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'] || res.cookie.Authorization;
    if (token) {
        token = token.replace("Bearer ", "");
        // verifies secret and checks exp
        jwt.verify(token, global.config.jwt_secret, function(err, decoded) {
            if (err) { //failed verification.
                return res.status(401).json({"error": true});
            }
            req.decoded = decoded;
            next(); //no error, proceed
        });
    } else {
        // forbidden without token
        return res.status(401).send({
            "error": true
        });
    }
}