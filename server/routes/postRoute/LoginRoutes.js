const express = require('express')
const router = express.Router();
const bcrypt = require('bcrypt')
const Users = require('../../Collections/UserCollection');
const {createToken} = require('../../Token/Jwebtoken')

router.post('/signin', async(req, res) => {
    const {email, password} = req.body;

    try {
        const user = await Users.findOne({ email });
        if(!user){
            return res.send({message: "Username not found!"});
            
        }
        const match = await bcrypt.compare(password, user.password)
        if(!match){
            return res.send({message: "Password doesn't match!"});
         
        }
        
        const User = user.username;
        const accessToken = createToken(user);
        req.session.user = user;
        req.session.token = accessToken;

        res.cookie("access-token", accessToken, {
            httpOnly: true
        })
        res.send({
            message: "Logged In",
            Authorize: true,
            accessToken,
            user
        })
    } catch (error) {
        console.error(error);
    }
})

module.exports = router;