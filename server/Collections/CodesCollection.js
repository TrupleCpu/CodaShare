const mongoose = require('mongoose');
const {Schema, Types} = mongoose;

const codesSchema = new Schema({
    id: Types.ObjectId,
    groupID: String,
    senderID: String,
    description: String,
    filename: String,
    fileAddress: String,

}, {timestamps: true})

const codes = mongoose.model('Codes', codesSchema, 'Codes');

module.exports = codes;