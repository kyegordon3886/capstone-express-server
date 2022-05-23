const mongoose = require('mongoose')
const commentSchema = require('./comments')
const storySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    },
    date: {
      type: Date
    },
    content: {
      type: String,
      required: true
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    // subdoc for comment schema
    comment: [commentSchema]
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Story', storySchema)
