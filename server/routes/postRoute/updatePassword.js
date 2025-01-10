const express = require('express');
const users = require('../../Collections/UserCollection');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.post('/updatePassword', async(req, res) => {
   const { currPassword, newPassword, userID } = req.body;

   try {
       const findUser = await users.findOne({userID: userID});
       
       const match = await bcrypt.compare(currPassword, findUser.password);

       if(!match){
        return res.send({message: "Incorrect password!"})
       }

       bcrypt.hash(newPassword, saltRounds, async(err, hash) => {
           if(err){
            return res.send({message: "An error occured!"})
           }

           await findUser.updateOne({password: hash})
       })

       res.send({message: "Updated successfully!"});
       

   } catch (error) {
      console.log(error);
   }

})

module.exports = router;