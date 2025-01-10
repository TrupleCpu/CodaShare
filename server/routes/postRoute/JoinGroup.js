const express = require('express');
const router = express.Router();
const groups = require('../../Collections/GroupCollection');


// Endpoint for joing a group
router.post('/joinGroup', async(req, res) => {
     try {
         const group = await groups.findOne({_id: req.body.groupID})
         group.groupMembers.push({memberID: req.body.userID});
        

         await group.save();
         res.send({message: "Successfully joined!"});
     } catch (err){
        console.error(err)
     }
})

module.exports = router;