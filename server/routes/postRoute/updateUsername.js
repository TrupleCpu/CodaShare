const express = require('express');
const users = require('../../Collections/UserCollection');
const router = express.Router();
const bcrypt = require('bcrypt');

router.post('/updateUsername', async(req, res) => {
  const {userID, userName, password} = req.body;

  try {
    const findUser = await users.findOne({userID: userID});
    
    const match = await bcrypt.compare(password, findUser.password);
    
    if(!match){
        return res.send({message: "Incorrect password!"});
    }

    await findUser.updateOne({username: userName});

    return res.send({message: "Updated successfully!"});

  } catch (error) {
     console.log(error)
  }

})

module.exports = router;