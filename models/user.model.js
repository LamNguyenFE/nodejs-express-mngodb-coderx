const mongoose = require('mongoose');

//Schema
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    phone: String,
    avatar: String,
})

//mOdel
//tham so thu 3 la colections name 
const User = mongoose.model('User', userSchema, 'users');

module.exports = User