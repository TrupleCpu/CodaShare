const express = require('express');
const router = express.Router();
const message = require('../../Collections/MessagesCollection');


// Endpoint for getting the message
router.get('/getMessage/:groupID', async(req, res) => {
    const groupID = req.params.groupID;

    try {
          const getMessage = await message.find({groupID: groupID}).sort({createdAt: -1});
          res.send(getMessage);



    } catch(error) {
        console.error(error)
    }
})

module.exports = router;