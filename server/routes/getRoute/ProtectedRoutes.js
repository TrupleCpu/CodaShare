const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const users = require('../../Collections/UserCollection');

function Validate_Token(req, res, next){
    const headerAuth = req.headers['authorization'];
    const token = headerAuth && headerAuth.split(' ')[1];
    
    
    if(!token){
    return res.sendStatus(401);
    }
    jwt.verify(token, '@a$2148126231!!?!3', (err, user) => {
        if(err){
          return res.sendStatus(403);
        }
        req.session.user = user;
        next();
    });

}

router.get('/protected', Validate_Token, async(req, res) => {
    
    const findUser = await users.findOne({userID: req.session.user.user.userID});
    if(!findUser){
        return res.send({message: 'An error occured'})
    }

    return res.status(200).send({user: findUser})

})

module.exports = router;