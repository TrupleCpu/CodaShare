const express = require('express');
const router = express.Router();
const users = require('../../Collections/UserCollection')

// Endpoint for getting the user data
router.get('/getUser/:userName', async(req, res) => {
    const userName = req.params.userName;
    try {
        const getUser = await users.findOne({username: userName});
        
        res.send(getUser)
    } catch(error){
        console.log(error)
    }
})

module.exports = router;