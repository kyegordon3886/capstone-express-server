// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// pull in Mongoose model for event
const Story = require('../models/stories')
// const Comment = require('../models/comments')

// this is a collection of methods that help us detect situations when we need
// to throw a custom error
const customErrors = require('../../lib/custom_errors')

// we'll use this function to send 404 when non-existant document is requested
const handle404 = customErrors.handle404
// we'll use this function to send 401 when a user tries to modify a resource
// that's owned by someone else
const requireOwnership = customErrors.requireOwnership

// this is middleware that will remove blank fields from `req.body`, e.g.
// { example: { title: '', text: 'foo' } } -> { example: { text: 'foo' } }
const removeBlanks = require('../../lib/remove_blank_fields')
// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `req.user`
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

// CREATE
// POST /stories
router.post('/stories', requireToken, (req, res, next) => {
  // get story data from request
  const story = req.body.story
  // set owner of new story to be current user
  story.owner = req.user.id

  Story.create(story)
    // respond to successful `create` with status 201 and JSON of new "story"
    .then(story => {
      res.status(201).json({ story: story.toObject() })
    })
    // if an error occurs, pass it off to our error handler
    // the error handler needs the error message and the `res` object so that it
    // can send an error message back to the client
    .catch(next)
})

// INDEX
// GET /stories
router.get('/stories', requireToken, (req, res, next) => {
  Story.find()
    .then((stories) => {
      // `stories` will be an array of Mongoose documents
      // we want to convert each one to a POJO, so we use `.map` to
      // apply `.toObject` to each one
      return stories.map((story) => story.toObject())
    })
  // respond with status 200 and JSON of the stories
    .then((stories) => res.status(200).json({ stories: stories }))
  // if an error occurs, pass it to the handler
    .catch(next)
})

// SHOW
// GET /stories/5a7db6c74d55bc51bdf39793(ID)
router.get('/stories/:id', requireToken, (req, res, next) => {
  // req.params.id will be set based on the `:id` in the route
  Story.findById(req.params.id)
    .then(handle404)
    // if `findById` is successful, respond with 200 and "story" JSON
    .then(story => res.status(200).json({ story: story.toObject() }))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// UPDATE
// PATCH /stories/5a7db6c74d55bc51bdf39793
router.patch('/stories/:id', requireToken, removeBlanks, (req, res, next) => {
  // if the client attempts to change the `owner` property by including a new
  // owner, prevent that by deleting that key/value pair
  // delete req.body.story.owner

  Story.findById(req.params.id)
    .then(handle404)
    .then(story => {
      // pass the `req` object and the Mongoose record to `requireOwnership`
      // it will throw an error if the current user isn't the owner
      requireOwnership(req, story)

      // pass the result of Mongoose's `.update` to the next `.then`
      return story.updateOne(req.body.story)
    })
    // if that succeeded, return 204 and no JSON(will show 'no content')
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// DESTROY
// DELETE /stories/5a7db6c74d55bc51bdf39793
router.delete('/stories/:id', requireToken, (req, res, next) => {
  Story.findById(req.params.id)
    .then(handle404)
    .then(story => {
      // throw an error if current user doesn't own `story`
      requireOwnership(req, story)
      // delete the event ONLY IF the above didn't throw error
      story.deleteOne()
    })
    // send back 204 and no content if the deletion succeeded
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// UPDATE
// PATCH /like/:id
// must use different url path (like instead of stories) since we're already using patch for events above
router.patch('/like/:id', requireToken, (req, res, next) => {
  // console.log(req.body) // body: { likes: { user: '628be6558fd28e6920c911d2', likeStatus: [] } },
  // console.log('in router.patch for liked')
  const likeData = req.body.likes // coming from client/has to match up with model / must use this in curl script
  const storyId = req.params.id

  Story.findById(storyId)
    .then(handle404)
    // .then(() => {
    //   this.setState({ liked: this.state.story.likes.filter(like => like.user === user.id) })
    // })
    .then((story) => {
      // push like data into story
      // if liked, owned by user exists in this story, update that one
      // console.log('array of all likes for story')
      // console.log(story.likes)
      // console.log('user id')
      // console.log(likeData._id)
      const foundLikeIndex = story.likes.findIndex(likes => likes.user == req.user.id)
      // leave it loosly equal to the user.id
      // foundLikeIndex is a number
      // !foundLike is saying if there is no like that matches the user id, then push in the new kike to the array
      if (foundLikeIndex === -1) {
        // make a new like, and push it into the likes array
        story.likes.push(likeData)
      } else {
      // if there a likeStatus found for the user, switch it to it's opposite
        story.likes[foundLikeIndex].likeStatus = !story.likes[foundLikeIndex].likeStatus
        // console.log('found like')
        // console.log('flipping like')
      }
      // console.log(foundLikeIndex)
      // if (story.data.likes === false) {
      //   return (story.data.likes.likeStatus.user = true)
      // } else if (story.likeStatus === true) {
      //   return (story.likeStatus = false)
      // }
      // otherwise, make a new like
      // console.log(story)
      // console.log(story.data)
      return story.save()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
