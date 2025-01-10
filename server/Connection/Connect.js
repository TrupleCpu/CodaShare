const mongoose = require('mongoose');

const uri = 'mongodb+srv://carl:0909185525544@cluster0.hzvjcl7.mongodb.net/CodaShare?retryWrites=true&w=majority&appName=Cluster0';

async function ConnectUser(){
    try {
        await mongoose.connect(uri);
        console.log('connected');

    }catch (error) {
        console.error(error)
    }
}

module.exports = ConnectUser;