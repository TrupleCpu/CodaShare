const express = require('express');
const router = express.Router();
const groups = require('../../Collections/GroupCollection');

router.post('/deleteMember', async(req, res) => {
    const groupName = req.body.groupName;
    const memberId = req.body.memberId;
     try{
         const group = await groups.findOne({ groupName: { $regex: new RegExp(`^${groupName}$`, 'i') } });
         const updatedMembers = group.groupMembers.filter(member => member.memberID !== memberId);

         group.groupMembers = updatedMembers;
         
         const updateGroup = await group.save();

         res.send({message: "Member deleted successfuly"})

     } catch (error) {
         console.log(error);
     }
})

module.exports = router;