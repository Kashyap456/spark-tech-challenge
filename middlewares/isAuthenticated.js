const isAuthenticated = (req, res, next) => {
  console.log(req.session.username);
  if (req.session.username) {
    next();
  } else {
    err = new Error("Hello");
    next(err);
  }
};

module.exports = isAuthenticated;
