const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    ispremiumuser: {
        type: Boolean,
        default: false,
    },
    totalamount: {
        type: Number,
        default: 0,
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
