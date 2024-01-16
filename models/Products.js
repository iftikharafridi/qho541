const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    path: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    }
});

const Products = mongoose.model('Products', productSchema, 'products');

 module.exports = Products;
//export default Products;