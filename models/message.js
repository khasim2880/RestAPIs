var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('messages', new Schema({ 
    fromName: {
        type: String,
        required: true
    }, 
    toName: {
        type: String,
        required: true
    }, 
    message: {
        type: String,
        required: true
    }
}));