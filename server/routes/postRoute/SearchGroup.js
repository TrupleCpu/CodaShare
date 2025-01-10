const express = require('express');
const router = express.Router();
const groups = require('../../Collections/GroupCollection');

router.post('/searchGroup', async(req, res) => {
    const userSearch = req.body.userSearch;
    try{
        const group = await groups.find({groupName: new RegExp(userSearch, 'i')});
        if(!group){
            res.send({message: "Name not found!"});
        }
        res.send(group);

    }catch(error){
        console.log(error);
    }
})

module.exports = router;

