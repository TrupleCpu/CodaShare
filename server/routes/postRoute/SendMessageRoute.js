const express = require('express');
const router = express.Router();
const message = require('../../Collections/MessagesCollection')
const {io} = require('../../Socket/Socket')
router.post('/sendMessage', async(req, res) => {
   
    const data = {
        groupID: req.body.groupID,
        senderID: req.body.senderID,
        content: req.body.content,
        profileURL: req.body.profileURL,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: req.body.username,
        
        createdAt: req.body.createdAt
    }
    try {
        
       message.insertMany(data);
        
         
        io.to(data.groupID).emit('newMessage', data);
        
       res.status(200).send("Message sent successfuly")
    } catch(error){
        console.log(error)
    }
})

module.exports = router;