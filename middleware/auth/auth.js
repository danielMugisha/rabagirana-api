const express = require('express');
const router = express.Router();
const User = require('../auth/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const RefreshToken = require('./RefreshToken');
router.post('/signup', (req, res)=>{
    let {firstName, lastName, username, password} = req.body;
    firstName.trim();
    lastName.trim();
    username.trim();
    password.trim();

    if(firstName == "" || lastName == "" || username =="" || password ==""){
        res.status(400).json({
            status: 'BAD REQUEST',
            message: 'Empty fields'
        })
    }else if(!/^[a-zA-Z ]*/.test(firstName)){
        res.status(400).json({
            status: 'BAD REQUEST',
            message: 'Invalid first name'
        })
    }else if(!/^[a-zA-Z ]*/.test(lastName)){
        res.status(400).json({
            status: 'BAD REQUEST',
            message: 'Invalid last name'
        })
    }else if(!/^[a-zA-Z ]*/.test(username)){
        res.status(400).json({
            status: 'BAD REQUEST',
            message: 'Invalid user name'
        })
    }else if(password.length < 8){
        res.status(400).json({
            status: 'BAD REQUEST',
            message: 'Invalid password'
        })
    }else{
        User
        .find({username})
        .then(result => {
            if(result.length){
                res.status(400).json({
                    status: 'BAD REQUEST',
                    message: 'user alredy exists'
                })
            }else{
                const saltRounds = 10;
                bcrypt.hash(password, saltRounds).then(hashedPassword =>{
                    const newUser = new User({
                        firstName,
                        lastName,
                        username: username,
                        password: hashedPassword
                    })

                    newUser.save().then(result=>{
                        res.status(200).json({
                            status: 'SUCCESS',
                            message: 'User saved successfully',
                            data: result
                        })
                    }).catch(err=>{
                        console.log(err)
                        res.status(500).json({
                        status: 'INTERNAL SERVER ERROR',
                        message: 'an error occured while saving the user'
                    })
                    })
                }).catch(err=>{
                    console.log(err)
                    res.status(500).json({
                    status: 'INTERNAL SERVER ERROR',
                    message: 'an error occured while hashing the password'
                })
            })
            }
        })
        .catch(err=>{
            console.log(err)
            res.status(500).json({
                status: 'INTERNAL SERVER ERROR',
                message: 'an error occured while checking for existing usrname'
            })
        })
    }

})

router.post('/signin', (req, res)=>{
    let {username, password} = req.body;
    username.trim();
    password.trim();

    if(username =="" || password ==""){
        res.status(400).json({
            status: 'BAD REQUEST',
            message: 'Empty fields'
        })
    }else{
        User
        .findOne({username})
        .then(result => {
            if(result){ 
                const hashedPassword = result.password
                bcrypt.compare(password, hashedPassword)
                .then(data => {
                    if(data){
                        var claims = {
                            firstName: result.firstName,
                            lastName: result.lastName,
                            username: result.username
                        }
                        const accessToken= jwt.sign(claims, process.env.ACCESS_TOKEN_SECRET,{expiresIn: '1d'}) // TODO: change this to a shorter period and implement refresh token
                        //const refreshToken= jwt.sign(claims, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '1d'})
                        //const _refreshToken = new RefreshToken({userId: result._id, refreshToken: refreshToken})
                        //_refreshToken.save();
                        res.status(200).json({
                            status: 'SUCCESS',
                            message: 'login successful',
                            data:{user: result, accessToken}
                        })
                    }else{
                        res.status(400).json({
                            status: 'BAD REQUEST',
                            message: 'Invalid Password'
                        })
                    }
                })
                .catch(err=>{
                    console.log(err)
                    res.status(500).json({
                    status: 'INTERNAL SERVER ERROR',
                    message: 'an error occured comparing passwords'
                    })
                })
            }else{
                res.status(400).json({
                    status: 'BAD REQUEST',
                    message: 'User does not exist'
                })
            }
        })
        .catch(err=>{
            console.log(err)
            res.status(500).json({
            status: 'INTERNAL SERVER ERROR',
            message: 'an error occured while fetching user'
            })
        })
    }
})

router.post('/token', (req, res)=>{
    let {refreshToken} = req.body;
    if(refreshToken == null) return res.sendStatus(401)
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user)=>{
        if(err) return res.sendStatus(403)
        var claims = {
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username
        }
        const accessToken = jwt.sign(claims, process.env.ACCESS_TOKEN_SECRET,{expiresIn: '30s'})
        res.status(200).json(accessToken)

    })
})


module.exports = router