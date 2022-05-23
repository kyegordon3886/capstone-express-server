const mongoose = require('mongoose')
const commentSchema = new mongoose.Schema({

  title: {
    type: String,
    require: true
  },
  content: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

// only export the reviewSchema, do not export it as a model
module.exports = commentSchema
