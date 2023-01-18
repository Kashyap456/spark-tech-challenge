const mongoose = require('mongoose')

const { Schema, model } = mongoose

// const { Schema, model } = require('mongoose')

const tweetSchema = new Schema({
  tweetText: { type: String, required: true },
  parent: { type: mongoose.ObjectId, default: null },
  replies: [mongoose.ObjectId],
  author: { type: String, required: true },
  likes: { type: Number, default: 0 },

  created_at: Date,
  updated_at: Date,
})

const Tweet = model('Tweet', tweetSchema)

module.exports = Tweet
