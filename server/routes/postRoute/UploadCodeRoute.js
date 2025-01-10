const express = require('express');
const router = express.Router();
const multer = require('multer');
const { admin } = require('../../Firebase/Service');
const codes = require('../../Collections/CodesCollection')
const users = require('../../Collections/UserCollection');
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/uploadCode', upload.array('file'), async (req, res) => {
  

    try {
        const uploadedFiles = req.files;
        const fileUrls = [];
        for (const file of uploadedFiles) {
            const check = await codes.findOne({fileAddress: "https://storage.googleapis.com/codashare.appspot.com/" + file.originalname + `-${req.query.groupName}`});

            if(check){
                return res.send({message: "filename already in used"})
            }

            const bucket = admin.storage().bucket();
            const filename = file.originalname + `-${req.query.groupName}`;
           const fileUpload = bucket.file(filename);

            const blobStream = fileUpload.createWriteStream({
                metadata: {
                    contentType: file.mimetype
                }
            })

            blobStream.on('error', (err) => {
                 console.log(err);
                 res.status(500).send('error');
            })

            blobStream.on('finish', () => {
                console.log('file uploaded to firebase');
            })
             const fileAddress = `https://storage.googleapis.com/codashare.appspot.com/${filename}`
            blobStream.end(file.buffer)
            const data = {
                groupID: req.query.groupID,
                senderID: req.query.senderID,
                description: req.query.description,
                filename: file.originalname,
                fileAddress: fileAddress
            }

            codes.insertMany([data])

            fileUrls.push(fileAddress);            
        }
       
        const user = await users.findOne({ userID: req.query.senderID });
        const currCodeShared = user.sharedCode || 0;

        const newCodeShared = currCodeShared + fileUrls.length;

        await users.updateOne(
            {userID: req.query.senderID},
            {$set: {sharedCode: newCodeShared}}
        )

        req.session.sharedCode = newCodeShared;
        
        console.log(fileUrls)
        res.status(200).json({ message: 'File uploaded successfully' }); 

    
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).send('Error uploading file.');
    }


});


module.exports = router;