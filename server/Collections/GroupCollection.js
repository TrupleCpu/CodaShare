const mongoose = require('mongoose');
const {Schema, Types} = mongoose;

const groupSchema = new Schema({
    id: Types.ObjectId,
    ownerID: String,
    groupName: String,
    groupDescription: String,
    groupMembers: [{
        memberID: String,
        role: String
    }],
    ownerUser: String,
    ownerProfile: String,
    languageUsed: String,
}, {timestamps: true })

const groups = mongoose.model('Group', groupSchema, 'Groups');

module.exports = groups;