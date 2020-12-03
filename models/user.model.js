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
const User = mongoose.model('User', userSchema);

module.exports = User