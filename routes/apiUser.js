const express = require('express')
const ServiceUser = require('../services/serviceUser')
const serviceUser = new ServiceUser()

function apiUser(app) {
  const router = express.Router()
  app.use('/user', router)

  router.post('/signUp', async function (req, res) {
    const user = req.body
    const userId = await serviceUser.createUser(user)
    res.json(userId)
  })

  router.post('/login', function (req, res) {
    const user = req.body
    res.json(user)
  })
}

module.exports = apiUser
