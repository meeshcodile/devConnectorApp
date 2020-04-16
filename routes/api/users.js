const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../../config/accessFunctions')
const passport = require('passport')

// loding input validation
const validateRegisterInput = require('../../validation/reigister')
const validateLoginInput = require('../../validation/login')

// @route Get api/users/
//@route public
router.get('',(req, res)=>{
    res.json({msg:'user routes'})
})

// @route POST Register Route
// @route public
router.post('/register', (req, res)=>{
    const {errors, isValid} = validateRegisterInput(req.body)

    // checking validation
    if(!isValid){
        return res.status(400).json(errors)
    }

    User.findOne({email:req.body.email}).then(user =>{
        if(user){
            errors.email ='email already in used'
            return res.status(400).json(errors)
        }else{
            const avatar = gravatar.url(req.body.email,{
                s:'200', //size
                r:'pg', // rating
                default:'mm' //default
            })

            const newUser = new User ({
                name:req.body.name,
                email:req.body.email,
                avatar,
                password:req.body.password
            })
            bcrypt.genSalt(10, (err, salt)=>{
                bcrypt.hash(newUser.password, salt, (err, hash)=>{
                    if(err){
                        throw err
                    }
                    newUser.password = hash
                    newUser.save().then((user)=>{
                        res.json(user)
                    }).catch(err =>{
                        console.log(err)
                    })
                })
            })
        }
    })
})


// @route POST login Route
// @route public
router.post('/login', (req, res)=>{

    const { errors, isValid } = validateLoginInput(req.body)

    // checking validation
    if (!isValid) {
        return res.status(400).json(errors)
    }

    const email = req.body.email
    const password = req.body.password

    // finding user email
    User.findOne({email}).then(user =>{
        if(!user){
            errors.email = 'user not found'
            return res.status(404).json(errors)
        }
        // checking the user password
        bcrypt.compare(password, user.password).then(isMatch =>{
            if(isMatch){
                // res.json({msg:'success'})
                // user matched

                // creating jwt payload
                const payload ={
                    id:user.id,
                    name:user.name,
                    avatar:user.avatar
                }
                // signin token
                jwt.sign(payload, keys.secretOrKey, {
                    expiresIn:3600,
                }, (err, token)=>{
                    res.json({
                        success:true,
                        token:'Bearer ' + token  
                    })
                })
                 
            }else{
                errors.password = 'password Incorrect'
                return res.status(400).json(errors)
            }
        })
    })
})

//@route current user
// @route private
router.get('/current',passport.authenticate('jwt',{
    session:false
}), (req, res)=>{
    res.json({
        id:req.user.id,
        name:req.user.name,
        email:req.user.email
    })
})

module.exports = router