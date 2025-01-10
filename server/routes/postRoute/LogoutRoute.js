const express = require('express')
const router = express.Router();

router.post('/destroy', (req, res) => {
    req.session.destroy((err) => {
        if(err){
            res.status(500).send({message: "ERRROR UPON LOGGIN OUT!"})
        } else {
            res.clearCookie('access-token');
            res.clearCookie('accessible-token');
            res.status(200).json({loggedIn: false});
        }
    })
})

module.exports = router;