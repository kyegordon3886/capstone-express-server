// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// this is a collection of methods that help us detect situations when we need
// to throw a custom error
const customErrors = require('../../lib/custom_errors')

// we'll use this function to send 404 when non-existant document is requested
const handle404 = customErrors.handle404
// we'll use this function to send 401 when a user tries to modify a resource
// that's owned by someone else
// const requireOwnership = customErrors.requireOwnership

// so that a token MUST be passed for that route to be available
// it will also set `req.user`
const requireToken = passport.authenticate('bearer', { session: false })

// // this is middleware that will remove blank fields from `req.body`, e.g.
// // { example: { title: '', text: 'foo' } } -> { example: { text: 'foo' } }
// const removeBlanks = require('../../lib/remove_blank_fields')
// // passing this as a second argument to `router.<verb>` will make it
// // so that a token MUST be passed for that route to be available
// // it will also set `req.user`
// const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

// need story model since commentSchema is in the story model
const Story = require('../models/stories')

router.post('/comments', requireToken, (req, res, next) => {
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
router.patch('/comments/:commentID', requireToken, (req, res, next) => {
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
router.delete('/comments/:commentID', requireToken, (req, res, next) => {
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
