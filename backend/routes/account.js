const express = require('express')
const isAuthenticated = require('../middlewares/isAuthenticated')

const User = require('../models/User')

const router = express.Router()

router.post('/signup', async (req, res) => {
  const { username, password } = req.body

  try {
    await User.create({ username, password })
    res.send('user creation was successful')
  } catch (e) {
    res.status(400)
    res.send('user creation had a problem')
  }
})

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body
    const user = await User.findOne({ username, password })
    // console.log(user)
    req.session.username = user.username
    // console.log(req.session)
    res.send('logged in')
  } catch (e) {
    res.status(400)
    res.send('error occured')
  }
})

router.post('/logout', isAuthenticated, async (req, res) => {
  try {
    req.session.username = undefined
    res.send('logged out')
  } catch (e) {
    res.send('error occured')
  }
})

module.exports = router
