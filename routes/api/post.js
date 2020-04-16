const express = require("express");
const router = express.Router();
const passport = require('passport')


// loading the models
const Post = require('../../models/post')
const User = require('../../models/user')
const validationPostInput = require('../../validation/post')
const Profile = require('../../models/profile')


// @route get api/post
// creating post
// access public
router.get('/', (req, res)=>{
      Post.find().sort({date:-1}).then(posts=>{
            res.json(posts)
      }).catch(err =>{
            res.status(404).json({ noposfound: 'no posts found' })
      })
})

// @route get api/post/:id
// get post by id
// access public
router.get('/:id', (req, res) => {
      Post.findById(req.params.id).then(post => {
            res.json(post)
      }).catch(err => {
            res.status(404).json({noposfound:'no post with that id found'})
      })
})

// @route post api/post
// creating post
// access private
router.post('/', passport.authenticate('jwt',{session:false}), (req, res)=>{
      // gettin errors 
      const { errors, isValid } = validationPostInput(req.body)

      // checking validations
      if (!isValid) {
            return res.status(400).json(errors)
      }

      const newPost =  new Post({
            text:req.body.text,
            name:req.body.name,
            avatar:req.body.avatar,
            user:req.user.id
      })

      newPost.save().then(post =>{
            res.json(post)
      })
})

// @route delete api/post/:id
// delelting post
// access private
router.delete('/:id', passport.authenticate('jwt', {session:false}), (req, res)=>{
      Profile.findOne({user:req.user.id}).then(profile =>{
            Post.findById(req.params.id).then(post =>{
                  // check for post owner
                  if(post.user.toString() !==req.user.id){
                        return res.status(401).json({error:'user not authorized'})
                  }
            // delete post
            post.remove().then(()=>{
                  res.json({success:true})
            }).catch(err =>{
                  res.status(404).json({ nopostfound: 'no post found' })
            })
            })
      })
})

// @route like api/post//likes/id
// liking a post post
// access private
router.post('/like/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
      Profile.findOne({ user: req.user.id }).then(profile => {
            Post.findById(req.params.id).then(post => {
                  // like post
                  if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0){
                        return res.status(400).json({alreadyLike: 'user already liked post'})
                  } 
                  // adding user id to the array
                  post.likes.unshift({user:req.user.id})
                  post.save().then(post =>{
                        res.json(post)
                  })
                  
            })
                  .catch(err => {
                        res.status(404).json({ nopostfound: 'no post found' })
                  })
      })
})

// @route like api/post/likes/id
// unliking a post post
// access private
router.post('/unlike/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
      Profile.findOne({ user: req.user.id }).then(profile => {
            Post.findById(req.params.id).then(post => {
                  // like post
                  if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
                        return res.status(400).json({ notLike: 'you have not liked the post yet' })
                  }
                  // get remove index
                  const removeIndex = post.likes.map(item => item.user.toString()).indexOf(req.user.id)

                  // splice the id from the array
                  post.likes.splice(removeIndex, 1)

                  // saving
                  post.save().then(()=>{
                        res.json(post)
                  })
                 

            })
                  .catch(err => {
                        res.status(404).json({ nopostfound: 'no post found' })
                  })
      })
})

// @route like api/post/comment/id
// adding comment to post
// access private
router.post('/comment/:id', passport.authenticate('jwt', {session:false}), (req, res)=>{
      // gettin errors 
      const { errors, isValid } = validationPostInput(req.body)

      // checking validations
      if (!isValid) {
            return res.status(400).json(errors)
      }

      Post.findById(req.params.id).then(post =>{
            const newComment = {
                  text: req.body.text,
                  name:req.body.name,
                  avatar: req.body.avatar,
                  user: req.user.id
            }
            // adding comment to the array
            post.comments.unshift(newComment)
            
            // saving the comment
            post.save().then(()=>{
                  res.json(post)
            })
      }).catch(err =>{
            res.status(404).json({nopostfound:'no post found'})
      })
})

// @route like api/post/comment/:id/:comment_Id
// deleting comment from post
// access private
router.delete('/comment/:id/:comment_id', passport.authenticate('jwt', { session: false }), (req, res) => {
      
      Post.findById(req.params.id).then(post => {
      //      checking if the comment exist
      if(post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length ===0 ){
            return res.status(404).json({commentnotexist: "comment does not exist"})
      }

      // get the remove index
      const removeIndex = post.comments.map(item => item._id.toString()).indexOf(req.params.comment_id)

      // splice the comment from the array
      post.comments.splice(removeIndex, 1)

      post.save().then(post =>{
            res.json(post)
      })

      }).catch(err => {
            res.status(404).json({ nopostfound: 'no comment found' })
      })
})


module.exports = router;
