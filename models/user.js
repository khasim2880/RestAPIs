var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('users', new Schema({ 
    username: {
        type: String,
        required: true
    }, 
    password: {
        type: String,
        required: true
    },
    token: String
}));