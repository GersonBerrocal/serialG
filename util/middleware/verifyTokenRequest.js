const { verifyToken } = require('../utilToken')
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
      next({ message: 'el token es invalido', status: 400 })
    }
  } else {
    next({ message: 'token no encontrado', status: 404 })
  }
}
module.exports = verifyTokenRequest
