const mongoose = require('mongoose');

//Schema
const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    image: String,
    price: Number,
})

//mOdel
const Product = mongoose.model('product', productSchema);

module.exports = Product