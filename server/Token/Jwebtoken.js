const {sign, verify} = require('jsonwebtoken');

const createToken = (user) => {
    const payload = {
       user: user
    };
    return sign(payload, '@a$2148126231!!?!3', { expiresIn: '1d' });
}

module.exports = {createToken}