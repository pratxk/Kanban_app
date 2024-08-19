const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        enum: ['admin','user'],
        required: true,
        default:'user'
    },

    status: {
        type: Boolean,
        default: true
    },

}, { timestamps: true ,versionKey:false});

const userModel = mongoose.model('User', userSchema);
module.exports = userModel;
