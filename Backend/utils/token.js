const crypto = require('crypto');

exports.generateToken = () => {
    return crypto.randomBytes(32).toString('hex'); 
};
