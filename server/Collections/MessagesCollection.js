const mongoose = require('mongoose');
const {Schema, Types} = mongoose;

const messageSchema = new Schema({
    id: Types.ObjectId,
    groupID: String,
    senderID: String,
    content: String,
    profileURL: String,
    username: String,
    first_name: String,
    last_name: String,
    parentMessage: {
        type: Types.ObjectId,
        ref: 'Message'
    }
}, {timestamps: true});

const message = mongoose.model('Messages', messageSchema, 'Message')

module.exports = message;