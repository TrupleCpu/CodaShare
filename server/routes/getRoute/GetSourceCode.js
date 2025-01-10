const express = require('express');
const router = express.Router();
const codes = require('../../Collections/CodesCollection');


// Endpoint for getting the source code based on the extracted file
router.get('/getSourceCode/:codeID', async(req, res) => {
    const codeID = req.params.codeID;
   
    try {
         const getCodeData = await codes.findById(codeID);
        const codeLink = getCodeData.fileAddress;
        const codeSenderID = getCodeData.senderID;
         
        const response = await fetch(codeLink);
        const text = await response.text();

        res.send({text, codeSenderID})

   } catch (error) {
    console.log(error)
   }
})

/*
app.get('/test', async(req, res) => {
    try {
        const url = "https://storage.googleapis.com/codashare.appspot.com/Untitled1.c"
        const response = await fetch(url);
        const text = await response.text();

        res.send(text);
    } catch(error) {
           console.log(error)
    }
})

*/

module.exports = router;