const express = require('express')
const isAuthenticated = require('../middlewares/isAuthenticated')

const Question = require('../models/question')

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const questions = await Question.find()
    res.json(questions)
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

router.post('/add', isAuthenticated, async (req, res) => {
  try {
    const { questionText } = req.body
    const author = req.session.username
    await Question.create({ author, questionText })
    res.send('question was added successfully')
  } catch (e) {
    res.send('error occured')
  }
})

router.post('/answer', isAuthenticated, async (req, res) => {
  try {
    const { id, answer } = req.body
    await Question.updateOne({ _id: id }, { answer })
    res.send('question was updated successfully')
  } catch (e) {
    res.send('error occured')
  }
})

module.exports = router
