const express = require('express')
const ServiceUser = require('../services/serviceUser')
const serviceUser = new ServiceUser()
const { generateToken, verifyToken } = require('../util/utilToken')

function apiUser(app) {
  const router = express.Router()
  app.use('/user', router)

  router.post('/signUp', async function (req, res) {
    const user = req.body
    const userId = await serviceUser.createUser(user)
    res.json(userId)
  })

  router.post('/login', async function (req, res) {
    const { userName, password } = req.body
    const user = await serviceUser.getUser(userName)
    if (!user) return res.sendStatus(404)
    else if (user.password !== password) return res.sendStatus(403)
    const { user_name, role, plan } = user
    const token = generateToken({ user_name, role, plan })
    res.json({ token })
  })

  router.get('/todos', async function (req, res) {
    const todosUser = await serviceUser.todos()
    res.json(todosUser)
  })

  router.delete('/:userId', verifyTokenRequest, async function (req, res) {
    if (req.token.role === 'admin') {
      const userId = req.params.userId
      const resultDelete = await serviceUser.deleteUser(userId)
      res.json({ id: resultDelete })
    }
    res.sendStatus(403)
  })

  router.get('/:userName', verifyTokenRequest, async function (req, res) {
    const userName = req.params.userName
    if (req.token.user_name !== userName) return res.sendStatus(403)
    const user = await serviceUser.getUser(userName)
    res.json(user)
  })
}

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

module.exports = apiUser
