const express = require('express');
const router = express.Router();

const groups = require('../../Collections/GroupCollection');

// Function to insert the members with its designated roles
function insertMember(memberID, ownerID) {
   let members = []
   for(let i = 0; i < memberID.length; i++){
      members.push({
         memberID: memberID[i],
         role: ownerID === memberID[i] ? "Owner" : "Member"
      }
      );
   }
   return members;
}


// Endpoint to create a group
router.post('/createGroup', async(req, res) => { 
    const memberID = req.body.membersID;
    const data = {
      ownerID: req.body.ownerID,
      groupName: req.body.groupName,
      groupDescription: req.body.description,
      groupMembers: insertMember(memberID, req.body.ownerID),
      ownerUser: req.body.ownerUser,
      ownerProfile: req.body.ownerProfile,
      languageUsed: req.body.languageUsed
  }
  try {
     const check = await groups.findOne({ groupName: { $regex: new RegExp(`^${req.body.groupName}$`, 'i') } });
     
     if(check){
        console.log("Group name already used");
        res.send({message: "Group name already used"})
        return;
     }
     
     const createGroup = await groups.insertMany(data);
     console.log(createGroup ? "Success" : "Failed");
     res.status(200).send({message: "Success"})
  } catch (err) {
     console.error(err);
  }
})

module.exports = router;

