const verifyToken = require('../utilToken')
function verifyTokenRequest(req, res, next) {
  // eslint-disable-next-line dot-notation
  if (req.headers['authorization']) {
    try {
      // eslint-disable-next-line dot-notation
      const token = req.headers['authorization'].split(' ')[1]
      const resultToken = verifyToken(token)
      req.token = resultToken
      next()
    } catch (err) {
      next('error')
    }
  } else {
    next('error')
  }
}
module.exports = verifyTokenRequest
