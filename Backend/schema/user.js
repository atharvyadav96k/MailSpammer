const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
        },
        mails: [
            {
                email: {
                    type: String,
                    required: true
                },
                password: {
                    type: String,
                    required: true
                }
            }
        ],
        token: {
            type: String
        }
    }, 
    {
        timestamps: true
    }
);

module.exports = mongoose.model('users', userSchema);