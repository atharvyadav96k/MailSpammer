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
    }
});

module.exports = mongoose.model('forms', formSchema);