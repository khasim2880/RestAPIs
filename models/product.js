var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const Price = new mongoose.Schema({
    listprice: {
      type: String,
      required: true
    },
    salesprice: {
      type: String,
      required: true
    }
});

module.exports = mongoose.model('products', new Schema({ 
    id: {
        type: Number,
        required: true
    }, 
    image_url: {
        type: String,
        required: true
    },
    sku: {
        type: String,
        required: true
    },
    type: String,
    title: String,
    description: String,
    category: String,
    price: {
        type: Object,
        of: Price,
        required: true
    }
}));