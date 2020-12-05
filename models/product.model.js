const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

//Schema
const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    image: String,
    price: Number,
}, {
    timestamps: true
})

productSchema.plugin(mongoosePaginate);
//mOdel
const Product = mongoose.model('Product', productSchema, 'products');

module.exports = Product