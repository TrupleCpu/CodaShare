const express = require('express');
const router = express.Router();
const groups = require('../../Collections/GroupCollection');
const users = require('../../Collections/UserCollection');


// Endpoint to add a member
router.post('/addMember', async (req, res) => {
     const userID = req.body.userID;
     try {
      
      
      // Checks if the user exist
      const checkUserID = await users.findOne({userID: userID});
      
      if(!checkUserID){
         console.log(checkUserID)
         console.log("User not found!")
         return res.send({message: "User not found!"});
      }
         

         // Check the group using regex
         const group =  await groups.findOne({ groupName: { $regex: new RegExp(`^${req.body.groupName}$`, 'i') } });
         if(!group){
            return res.status(404).send({message: "Group not found!"});
         }
      
         const check = group.groupMembers.find(member => member.memberID.toString() === req.body.userID);
         if(check){
            return res.status(200).send({message: "This user is already in the group!"})
         }
         group.groupMembers.push({memberID: req.body.userID, role: "Member"});
         const result = await group.save();
        console.log(result ? "Added" : "Failed")
        res.send({message: "Success!"});
     } catch (err){
        console.error(err);
     }
})

module.exports = router;