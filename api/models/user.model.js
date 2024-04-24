const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true, 
        unique: true
    },
    password: {
        type: String, 
        required: true, 
        minlength: 6,
        maxlength: 128,
    },
    name: {
        type: String,
    }
});

module.exports = mongoose.model('User', userSchema);