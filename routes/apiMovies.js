const express = require('express')
const ServiceMovie = require('../services/serviceMovies')
const serviceMovies = new ServiceMovie()
const formidable = require('express-formidable')
const path = require('path')
const verifyTokenRequest = require('../util/middleware/verifyTokenRequest')

const validateHandler = require('../util/middleware/validateHandler')
const {
  createMovieSchema,
  idMovieSchema,
  updateMovieSchema
} = require('../util/schema/movie')

function apiMovies(app) {
  const router = express.Router()
  app.use('/api/movies', router)

  router.get('/', async function (req, res) {
    const result = await serviceMovies.getMovies()
    res.json(result)
  })
  router.get('/list', async function (req, res) {
    const result = await serviceMovies.listMovies()
    res.json(result)
  })
  router.get(
    '/:idMovie',
    validateHandler(idMovieSchema, 'params'),
    async function (req, res) {
      const idMovie = req.params.idMovie
      const movie = await serviceMovies.getMovie(idMovie)
      res.json(movie)
    }
  )
  //  solo premiun
  router.get(
    '/video/:idMovie/:index',
    verifyTokenRequest,
    async function (req, res) {
      if (req.token.plan === 'premiun' || req.token.plan === 'estandar') {
        const { idMovie, index } = req.params
        const movie = await serviceMovies.getContent(idMovie)
        const result = movie.content[index]
        res.json(result)
      } else {
        res.sendStatus(403)
      }
    }
  )
  //  rutas solo para admins
  router.delete(
    '/:idMovie',
    validateHandler(idMovieSchema, 'params'),
    async function (req, res) {
      const idMovie = req.params.idMovie
      const movie = await serviceMovies.deleteMovie(idMovie)
      res.json(movie)
    }
  )
  router.put(
    '/:idMovie',
    validateHandler(idMovieSchema, 'params'),
    validateHandler(updateMovieSchema),
    async function (req, res) {
      const newDataMovie = req.body
      const movieId = req.params.idMovie
      const result = await serviceMovies.updateMovie(movieId, newDataMovie)
      res.json(result)
    }
  )
  router.post(
    '/',
    formidable({
      encoding: 'utf-8',
      uploadDir: path.join(__dirname, '../public/img'),
      multiples: true,
      keepExtensions: true // req.files to be arrays of files
    }),
    async function (req, res) {
      const newMovie = {
        title: req.fields.title,
        genres: req.fields.genres.split(','),
        description: req.fields.description,
        time: Number(req.fields.time),
        plan: req.fields.plan,
        content: JSON.parse(req.fields.content)
      }
      const filePath = req.files.cover.path
      const pathCover = filePath.split('public')[1]
      newMovie.cover = pathCover
      const result = createMovieSchema.validate(newMovie)
      if (result.error)
        return res.status(400).send({ message: 'error en el schema' })
      newMovie.views = 0
      const movie = await serviceMovies.createMovie(newMovie)
      res.status(200).json(movie)
    }
  )
}

module.exports = apiMovies
