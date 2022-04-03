const express = require('express')
const isAuthenticated = require('../middlewares/isAuthenticated')

const Question = require('../models/Question')

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const questions = await Question.find()
    res.json(questions)
  } catch (e) {
    console.log(e)
    res.send('error occured')
  }
})

router.post('/add', isAuthenticated, async (err, req, res, next) => {
  if (err) {
    next(err)
  } else {
    try {
      const { questionText } = req.body
      const author = req.session.username
      await Question.create({ author, questionText })
      res.send('question was added successfully')
    } catch (e) {
      console.log(e)
      res.send('error occured')
    }
  }
})

router.post('/answer', isAuthenticated, async (err, req, res, next) => {
  if (err) {
    next(err)
  } else {
    try {
      const { _id, answer } = req.body
      await Question.updateOne(_id, { answer })
      res.send('question was added successfully')
    } catch (e) {
      console.log(e)
      res.send('error occured')
    }
  }
})

module.exports = router
