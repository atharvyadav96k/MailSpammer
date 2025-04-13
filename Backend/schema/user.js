const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    verified : {
        type: Boolean,
        default: false
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    forms : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "forms"
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model('user', userSchema);