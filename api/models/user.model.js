const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
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
});

// Note: arrow functions changes the scope of 'this'
userSchema.pre('save', async function (next) {
    const user = this;
    const saltRounds = 10

    if (user.isModified('password')) {
        const hash = bcrypt.hashSync(user.password, saltRounds);
        user.password = hash;
    }
    next();
})

module.exports = mongoose.model('User', userSchema);