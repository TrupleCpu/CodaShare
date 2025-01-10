const express = require('express');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const fs = require('fs')
const { admin } = require('../../Firebase/Service')
const router = express.Router();
const User = require('../../Collections/UserCollection');

const bucket = admin.storage().bucket();
const path = require('path');
const mime = require('mime-types');
const images = [
   '../ImagesProfile/image__6.png',
   '../ImagesProfile/image__7.png',
   '../ImagesProfile/image__8.png',
   '../ImagesProfile/image__9.png',
   '../ImagesProfile/image__10.png',
   '../ImagesProfile/image__11.png',
   '../ImagesProfile/image__12.png',
   '../ImagesProfile/image__13.png',
   '../ImagesProfile/image__14.png',
]


router.post('/signup', async (req, res) => {
   const randomImages = images[Math.floor(Math.random() * images.length)];

   const imagePath = path.join(__dirname, randomImages);
   const imageBuffer = fs.readFileSync(imagePath);
   const fileExtension = mime.extension(mime.lookup(imagePath));
   const timeStamp = new Date().getTime();
   const fileUpload = bucket.file(`${req.body.username}_${timeStamp}.${fileExtension}`)
   
   const bloblSream = await fileUpload.save(imageBuffer, {
      metadata: {
         contentType: mime.lookup(imagePath)
      }
   })
   const imageURL = `https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`;

     try {
         const check = await User.findOne({username:  req.body.username});
         if(check?.username === req.body.username){
           res.send("Username already exist");
            console.log("Username already exist");
            return;
         }
         const checkMail = await User.findOne({email: req.body.email})
         if(checkMail?.email === req.body.email){
           res.send("Email already exist!");
            console.log("Email already exist");
            return;
         }
         bcrypt.hash(req.body.password, saltRounds, async function(err, hash){
            if(err){
                console.error(error)
                return;
            }
            const data = {
                first_name: req.body.fName,
                last_name: req.body.lName,
                username: req.body.username,
                email: req.body.email,
                password: hash,
                profileURL: imageURL,
                sharedCode: 0
             }
             
            const user = await User.insertMany([data]);

            res.send(user ? "Successfully register!" : "There is something wrong please check");
            console.log("Inserted!");
         })

         console.log("Inserted")
     } catch (error) {
        console.error(error)
     }
})

module.exports = router;