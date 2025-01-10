const express = require('express');
const router = express.Router();
const groups = require('../../Collections/GroupCollection');
const mongoose = require('mongoose');
const User = require('../../Collections/UserCollection');


//End point to get groups based on user id
router.get('/getGroups/:userID', async (req, res) => {
    const userID = req.params.userID;
    try {
        const group = await groups.find({ 'groupMembers.memberID': userID });


        if(!group){
            return res.status(400).send({ error: 'User ID is required' });

        }
        res.status(200).send({group});
    } catch (err) {
        console.error(err);
    }

})

module.exports = router;