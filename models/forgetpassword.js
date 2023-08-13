const mongoose = require('mongoose');

const forgotPasswordSchema = new mongoose.Schema({
    
    active: {
        type: Boolean,
        required: true,
        default: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User', 
    },
});

const ForgotPassword = mongoose.model('ForgotPassword', forgotPasswordSchema);

module.exports = ForgotPassword;
