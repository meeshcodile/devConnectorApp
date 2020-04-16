const express = require("express");
const router = express.Router();
const mongoose = require('mongoose')
const passport = require('passport')

// loading  profiles and user models
const User = require('../../models/user')
const Profile = require('../../models/profile')
const validationProfileInput = require('../../validation/profile')
const validationExperienceInput = require('../../validation/experience')
const validationEducationInput = require('../../validation/education')

// @route GET api/profile 
// @route private
// get current user profile
router.get('/',passport.authenticate('jwt',{session:false}),(req,res)=>{
      const errors = {}
      console.log(req.user)
     Profile.findOne({user:req.user.id}).populate('user', ['name', 'avatar']).then(profile =>{
           if(!profile){
                 errors.noprofile ='there is no profile for the user'
                 return res.status(400).json(errors)
           }
           res.json(profile)
     })
     .catch(err =>{
           res.status(404).json(err)
     })
})

// @route Get api/profile/all
// @route public
// get all profile
router.get('/all',(req, res)=>{
      Profile.find().populate('user', ['name', 'avatar']).then(profiles =>{
            if(!profiles){
                  errors.noprofile = 'there are no profiles'
                  return res.status(404).json(errors)
            }
            res.json(profiles)
      })
      .catch(err =>{
            res.status(404).json({profiles:'there are no profiles'})
      })
})

// @route Get api/profile/handle/:handle 
// @route private
// get profile by handle
router.get('/handle/:handle',(req, res)=>{
      Profile.findOne({handle:req.params.handle}).populate('user',['name', 'avatar']).then(profile =>{
            if(!profile){
                  errors.noprofile = 'there is no profile for this user'
                  res.status(404).json(errors)
            }
            res.json(profile)
      }).catch(err=>{
            res.status(404).json({invalidUserHandle: 'no user profile found with that handle' })
      })
})


// @route Get api/profile/user/:user_id
// @route public
// get profile by handle
router.get('/user/:user_id', (req, res) => {
      Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar']).then(profile => {
            if (!profile) {
                  errors.noprofile = 'there is no profile for this user'
                  res.status(404).json(errors)
            }
            res.json(profile)
      }).catch(err => {
            res.status(404).json({invalidUserId :'no user profile found with that id'})
      })
})

// @route POST api/profile 
// @route private
// creating and updating user profile
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
     
      // gettin errors 
      const {errors, isValid} = validationProfileInput(req.body)

      // checking validations
      if(!isValid){
            return res.status(400).json(errors)
      }

      // getting user profile fields
      const profileFields ={}
      profileFields.user = req.user.id
      if(req.body.handle) profileFields.handle = req.body.handle
      if (req.body.company) profileFields.company = req.body.company
      if (req.body.website) profileFields.website = req.body.website
      if (req.body.location) profileFields.location = req.body.location
      if (req.body.bio) profileFields.bio = req.body.bio
      if (req.body.status) profileFields.status = req.body.status
      if (req.body.githubusername) profileFields.githubusername = req.body.githubusername

      // skills and to be splitted into an array
      if(typeof req.body.skills !== 'undefined'){
            profileFields.skills = req.body.skills.split(',')
      }

      // social fields
      profileFields.social = {}
      if (req.body.youtube) profileFields.social.youtube = req.body.youtube
      if (req.body.twitter) profileFields.social.twitter = req.body.twitter
      if (req.body.instagram) profileFields.social.instagram = req.body.instagram
      if (req.body.facebook) profileFields.social.facebook = req.body.facebook
      if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin

      Profile.findOne({user: req.user.id}).then(profile =>{
            if(profile){
                  // update profile
                  Profile.findOneAndUpdate({user:req.user.id}, {$set: profileFields}, {new:true}).then(profile =>{
                        res.json(profile)
                  })
            }else{
                  // creating profile

                  // check if the handle exist
                  Profile.findOneAndUpdate({handle:profileFields.handle}).then(profile =>{
                        if(profile){
                              errors.handle = 'that handlde already exist'
                              res.status(400).json(errors)
                        }
                        // if no handle we then save
                        new Profile(profileFields).save().then(profile =>{
                              res.json(profile)
                        })
                  })
            }
      })

})

// @route POST api/profile/add-experience
// @route private
// adding user experience
router.post('/experience', passport.authenticate('jwt', {session:false}),(req, res)=>{
      // gettin errors 
      const { errors, isValid } = validationExperienceInput(req.body)

      // checking validations
      if (!isValid) {
            return res.status(400).json(errors)
      }


      Profile.findOne({user:req.user.id}).then(profile =>{
            const newExperience ={
                  title:req.body.title,
                  location:req.body.location,
                  from: req.body.from,
                  to:req.body.to,
                  company:req.body.company,
                  current:req.body.current,
                  description:req.body.description
            }
            // adding user experience to the profile
            profile.experience.unshift(newExperience)
            profile.save().then(profile =>{
                  res.status(200).json(profile)
            })
      })
})

// @route POST api/profile/add-education
// @route private
// adding user education
router.post('/education', passport.authenticate('jwt', { session: false }), (req, res) => {
      // gettin errors 
      const { errors, isValid } = validationEducationInput(req.body)

      // checking validations
      if (!isValid) {
            return res.status(400).json(errors)
      }

      Profile.findOne({ user: req.user.id }).then(profile => {
            const newEducation = {
                  school: req.body.school,
                  fieldofstudy: req.body.fieldofstudy,
                  from: req.body.from,
                  to: req.body.to,
                  degree: req.body.degree,
                  current: req.body.current,
                  description: req.body.description
            }
            // adding user experience to the profile
            profile.education.unshift(newEducation)
            profile.save().then(profile => {
                  res.status(200).json(profile)
            })
      })
})

// @route POST api/profile/delet/:experienceId
// @route private
// deleting user experience
router.delete('/experience/:experience_id',passport.authenticate('jwt',{session:false}), (req ,res)=>{
      Profile.findOne({user:req.user.id}).then(profile =>{
            // get remove index
            const removeIndex = profile.experience.map(item =>{item.id}).indexOf(req.params.experience_id)

            // splice out of array
            profile.experience.splice(removeIndex, 1)

            // saving to the database
            profile.save().then(profile =>{
                  res.json(profile)
            })
      }).catch(err =>{
            res.status(404).json(err)
      })
} )


// @route POST api/profile/delet/:educationId
// @route private
// deleting user education from profile
router.delete('/education/:education_id', passport.authenticate('jwt', { session: false }), (req, res) => {
      Profile.findOne({ user: req.user.id }).then(profile => {
            // get remove index
            const removeIndex = profile.education.map(item => { item.id }).indexOf(req.params.education_id)

            // splice out of array
            profile.education.splice(removeIndex, 1)

            // saving to the database
            profile.save().then(profile => {
                  res.json(profile)
            })
      }).catch(err => {
            res.status(404).json(err)
      })
})

// @route POST api/profile/delet/:user_id
// @route private
// deleting user and profile from the database
router.delete('/', passport.authenticate('jwt', { session: false }), (req, res) => {
      Profile.findOneAndRemove({user: req.user.id}).then(profile =>{
            User.findOneAndRemove({_id : req.user.id}).then(()=>{
                  res.json({success:true})
            })
      })
})

module.exports = router;
