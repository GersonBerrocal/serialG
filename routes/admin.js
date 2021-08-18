const express = require('express')
const path = require('path')
const { verifyToken } = require('../util/utilToken')

function admin(app) {
  const router = express.Router()
  app.use('/admin', router)
  router.get('/', function (req, res) {
    res
      .status(200)
      .sendFile(path.join(__dirname, '../public/pages/intermedio.html'))
  })
  router.get('/dashboard/:token', (req, res, next) => {
    const decode = verifyToken(req.params.token)
    if (decode.role && decode.role !== 'admin')
      return res.redirect('/directorio')
    res.sendFile(path.join(__dirname, '../public/pages/movieAdmin.html'))
  })
}

module.exports = admin
