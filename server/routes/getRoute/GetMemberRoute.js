const express = require('express');
const router = express.Router();
const groups = require('../../Collections/GroupCollection');
const user = require('../../Collections/UserCollection');


// Function to get the members
const getMembers = async (member, userRole) => {
    try {
        const findMember = await user.findOne({userID: member})
       
          return {
            user: findMember,
            role: userRole
          };
    } catch (error){
        console.error(error)
    }
    
}


// Endpoint for getting the members
router.get('/getMember/:groupName', async(req, res) => {
    const groupName = req.params.groupName;
    try {
        const findGroup = await groups.findOne({ groupName: { $regex: new RegExp(`^${groupName}$`, 'i') } });

        if (!findGroup) {
            console.log("NOT FOUND")
            return res.status(404).send('Group not found');
        }

        const promiseMember = findGroup.groupMembers.map((item) => getMembers(item.memberID, item.role));
        const members = await Promise.all(promiseMember);
        
        res.send(members);
       
    }catch(error) {
        console.log(error)
    }
})

module.exports = router;