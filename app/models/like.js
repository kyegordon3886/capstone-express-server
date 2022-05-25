const mongoose = require('mongoose')

const likeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    likeStatus: {
      default: false,
      type: Boolean
    }
  },
  {
    timestamps: true
  }
)

module.exports = likeSchema
