const express = require('express')
const ServiceUser = require('../services/serviceUser')
const serviceUser = new ServiceUser()
const { generateToken } = require('../util/utilToken')
const verifyTokenRequest = require('../util/middleware/verifyTokenRequest')

const infoUserResponse = require('../util/infoUserResponse')

const validateHandler = require('../util/middleware/validateHandler')
const {
  createUserSchema,
  updateUserSchema,
  idUserSchema
} = require('../util/schema/user')

function apiUser(app) {
  const router = express.Router()
  app.use('/user', router)

  router.get('/', verifyTokenRequest, async function (req, res) {
    const user = await serviceUser.getUser(req.token.user_name)
    const userResult = infoUserResponse(user)
    res.json({ data: userResult, message: 'datos encontrados' })
  })

  router.post(
    '/singUp',
    validateHandler(createUserSchema),
    async function (req, res) {
      const user = req.body
      const userName = user['user_name']
      const userBase = await serviceUser.getUser(userName)
      if (userBase)
        return res.status(400).json({ message: 'el usario ya existe' })
      user['role'] = 'normal'
      user['plan'] = 'free'
      const userId = await serviceUser.createUser(user)
      const userData = await serviceUser.getUser(false, userId)
      const infoUser = infoUserResponse(userData)
      res.json({
        message: 'usuario creado',
        data: infoUser,
        token: generateToken(infoUser)
      })
    }
  )

  router.post('/login', async function (req, res) {
    const { userName, password } = req.body
    const user = await serviceUser.getUser(userName)
    if (!user) return res.status(404).json({ message: 'el usuario no existe' })
    else if (user.password !== password)
      return res.status(403).json({ message: 'La constraseña es incorrecta' })
    const infoUser = infoUserResponse(user)
    const token = generateToken(infoUser)
    res.json({ token })
  })

  router.delete(
    '/:userId',
    verifyTokenRequest,
    validateHandler(idUserSchema, 'params'),
    async function (req, res) {
      // if (req.token.role === 'admin') {
      const userId = req.params.userId
      const resultDelete = await serviceUser.deleteUser(userId)
      res.json({ id: resultDelete })
      // }
      // res.status(403).json({ message: 'Acceso denegado' })
    }
  )

  router.put(
    '/',
    verifyTokenRequest,
    validateHandler(updateUserSchema),
    async function (req, res) {
      const userId = req.token._id
      const data = req.body
      const id = await serviceUser.updateUser(userId, data)
      const userData = await serviceUser.getUser(null, id)
      const infoUser = infoUserResponse(userData)
      const token = generateToken(infoUser)
      res.status(200).json({ token })
    }
  )
}

module.exports = apiUser
