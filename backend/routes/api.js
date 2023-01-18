const express = require('express')
const mongoose = require('mongoose')
const isAuthenticated = require('../middlewares/isAuthenticated')

const Tweet = require('../models/tweet')

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const tweets = await Tweet.find().where('parent').equals(null)
    res.json(tweets)
  } catch (e) {
    res.send('error occured')
  }
})

router.post('/tweet', async (req, res) => {
  const { id } = req.body
  // console.log(id)
  try {
    const tweet = await Tweet.findById({ _id: id })
    // console.log(tweet)
    res.json(tweet)
  } catch (e) {
    res.send('error occured')
  }
})

router.post('/replies', async (req, res) => {
  const { id } = req.body
  try {
    const tweets = await Tweet.find().where('parent').equals(id)
    res.json(tweets)
  } catch (e) {
    res.send('error occured')
  }
})

router.post('/search', async (req, res) => {
  const { crit } = req.body
  const { query } = req.body
  try {
    if (crit === 'users') {
      const tweets = await Tweet.find().where('author').equals(query)
      res.json(tweets)
    } else {
      const tweets = await Tweet.find({ tweetText: new RegExp(query, 'i') })
      console.log(tweets)
      res.json(tweets)
    }
  } catch (e) {
    res.send('error occured')
  }
})

router.get('/logged', async (req, res) => {
  const logged = req.session.username
  if (logged) {
    res.send(true)
  } else {
    res.send(false)
  }
})

router.post('/like', isAuthenticated, async (req, res) => {
  try {
    const { like } = req.body
    const { _id } = req.body
    await Tweet.findByIdAndUpdate(_id, { $inc: { likes: like } })
    res.send('like was added successfully')
  } catch (e) {
    res.send('error occured')
  }
})

router.post('/reply', isAuthenticated, async (req, res) => {
  try {
    const { tweetText } = req.body
    const { parent } = req.body
    const author = req.session.username
    const parentObj = new mongoose.Types.ObjectId(parent)
    await Tweet.create({ author, tweetText, parent: parentObj }, async (err, tweet) => {
      const id = tweet._id
      await Tweet.updateOne({ _id: parent }, { $addToSet: { replies: id } })
    })
    res.send('reply was added successfully')
  } catch (e) {
    res.send('error occured')
  }
})

router.post('/send', isAuthenticated, async (req, res) => {
  try {
    const { tweetText } = req.body
    const author = req.session.username
    await Tweet.create({ author, tweetText })
    res.send('tweet was added successfully')
  } catch (e) {
    res.send('error occured')
  }
})

module.exports = router
