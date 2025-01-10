const express = require('express');
const router = express.Router();
const groups = require('../../Collections/GroupCollection');


// Enpoint for getting the data of a signle group
router.get('/singleGroup/:groupName', async(req, res) => {
    const groupName = req.params.groupName;

    try {
        const getGroup = await groups.findOne({ groupName: { $regex: new RegExp(`^${groupName}$`, 'i') } });

        if(groupName){
            res.send({getGroup});
            return;
        } 
        res.send({message: 'Group not found'})

    } catch(error) {
        console.error(error)
    }
})

module.exports = router;