const mongoose = require('mongoose');
const {Schema, Types} = mongoose;
const {v4: uuidv4} = require('uuid');

const userSchema = new Schema({
    userID: {type: String, default: uuidv4},
    first_name: String,
    last_name: String,
    username: String,
    email: String,
    password: String,
    profileURL: String,
    sharedCode: Number,
})
const User = mongoose.model('User', userSchema, 'users');

module.exports = User;
