const admin = require('firebase-admin');


const serviceAcc = require('../ServiceAccount.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAcc),
    storageBucket: 'codashare.appspot.com'
})


module.exports = {
    admin
}