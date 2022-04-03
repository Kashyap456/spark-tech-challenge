const isAuthenticated = (req, res, next) => {
  if (req.session.username) {
    next()
  } else {
    const err = new Error('Hello')
    next(err)
  }
}

module.exports = isAuthenticated
