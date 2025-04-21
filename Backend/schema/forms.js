const mongoose = require('mongoose');

const formSchema  = mongoose.Schema({
    formName: {
        type: String,
        required: true
    },
    data : {
        type: String,
        default: ""
    },
    version: {
        type: Number,
        default: 0
    },
    user: {
        type: String
    }
});

module.exports = mongoose.model('forms', formSchema);