const express = require('express');
const users = require('../../Collections/UserCollection');
const router = express.Router();
const bcrypt = require('bcrypt');

router.post('/updateName', async(req, res) => {
    const { userID, first_Name, last_Name, password } = req.body;

   
    console.log(userID, first_Name, last_Name, password);
    try {
         const findUser = await users.findOne({userID: userID });

         const match = await bcrypt.compare(password, findUser.password);

         if(!match){
            return res.send({message: "Incorrect password!"});
         }

         await findUser.updateOne({first_name: first_Name});
         await findUser.updateOne({last_name: last_Name});

         return res.send({message: "Updated successfully!"});
    } catch (error) {
        console.log(error);
    }
 
})

module.exports = router;