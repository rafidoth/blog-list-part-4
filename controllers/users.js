const express = require('express')
const userRouter = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

userRouter.post('/',async (req,res)=>{
    const {username, name, password} = req.body
    console.log(password.length)
    if(password.length<4){
        return res.status(401).json({
            error: 'invalid password, it must be longer than 3 characters'
          })
    }
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
    const user = new User({
        username,
        name,
        passwordHash
    })

    const savedUser = await user.save()

    res.status(201).json(savedUser)
})


userRouter.get('/',async (req,res)=>{
    const users = await User.find({}).populate('blogs',{title :1, url:1})
    res.json(users)
})

module.exports = userRouter
