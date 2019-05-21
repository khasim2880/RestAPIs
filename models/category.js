var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('categories', new Schema({ 
    id: {
        type: String,
        required: true
    }, 
    name: {
        type: String,
        required: true
    }
}));