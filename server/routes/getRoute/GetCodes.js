const express = require('express');
const router = express.Router();
const codes = require('../../Collections/CodesCollection');


//Endpoint to get the codes based on the group id
router.get('/getCodes/:groupID', async(req, res) => {
     const groupID = req.params.groupID;

     try {
         const getCodes = await codes.find({groupID: groupID}).sort({createdAt: -1});
         

         if(getCodes){
             return res.send(getCodes)
         }

     } catch (error) {
        console.log(error)
     }
})

module.exports = router;