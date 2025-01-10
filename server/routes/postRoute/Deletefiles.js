const express = require('express');
const router = express.Router();
const codes = require('../../Collections/CodesCollection');
const users = require('../../Collections/UserCollection')
const { admin } = require('../../Firebase/Service');


// Endpoint to delete a code file
router.post('/deleteFile', async(req, res) => {
    const fileName = req.body.fileName;
    
    try {
       
        const bucket = admin.storage().bucket();
        await bucket.file(`${fileName}-${req.body.groupName}`).delete();

        const user = await users.findOne({username: req.body.username});
        const currSharedCode = user.sharedCode || 0;

        await users.updateOne(
            {username: req.body.username},
            {$set: {sharedCode: currSharedCode - 1}}
        )
   
        
        await codes.deleteOne({fileAddress: "https://storage.googleapis.com/codashare.appspot.com/" + fileName + `-${req.body.groupName}` });

        res.send({message: "Deleted successfuly!"});
        
    } catch (error){
        console.log(error);
    }

});

module.exports = router;