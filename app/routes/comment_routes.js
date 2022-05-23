// require the express library
const express = require('express')

// create a router using the express.router so our code is more modular
const router = express.Router()

// require the handle404 middleware, to handle not finding documents
const handle404 = require('./../lib/custom_errors')

// need story model since commentSchema is in the story model
const Story = require('../models/stories')

router.post('/comments', (req, res, next) => {
  const commentData = req.body.comment
  // expecting a key of storyId to be in the comment data
  const storyId = commentData.storyId

  Story.findById(storyId)
    .then(handle404)
    .then((story) => {
      story.comments.push(commentData)
      // .reviews matches the key in the restaurant routes

      return story.save()
    })
    .then((story) => res.status(201).json({ story: story }))
    .catch(next)
})

// UPDATE
router.patch('/comments/:commentID', (req, res, next) => {
  const commentID = req.params.commentID
  const commentData = req.body.comment
  const storyID = commentData.storyId

  Story.findById(storyID)
    .then(handle404)
    .then((story) => {
      const comment = story.comments.id(commentID)

      comment.set(commentData)

      return story.save()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router

// DESTROY
router.delete('/comments/:commentID', (req, res, next) => {
  const commentID = req.params.commentID
  const storyID = req.body.comment.storyId

  Story.findById(storyID)
    .then(handle404)
    .then((story) => {
      // save the review info in the variable 'review'
      const comment = story.comments.id(commentID)

      // then remove the 'review'
      comment.remove()

      return story.save()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

// be sure to export the router
module.exports = router
