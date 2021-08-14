const jwt = require('jsonwebtoken')
const config = require('../config')

function generateToken(data) {
  const token = jwt.sign(data, config.secretToken)
  return token
}

function verifyToken(token) {
  const decode = jwt.verify(token, config.secretToken)
  return decode
}
module.exports = { generateToken, verifyToken }
