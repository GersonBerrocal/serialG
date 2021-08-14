const express = require('express')
const ServiceMovie = require('../services/serviceMovies')
const serviceMovies = new ServiceMovie()

const validateHandler = require('../util/middleware/validateHandler')
const {
  createMovieSchema,
  idMovieSchema,
  updateMovieSchema,
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
  router.post(
    '/',
    validateHandler(createMovieSchema),
    async function (req, res) {
      const newMovie = req.body
      newMovie.views = 0
      const movie = await serviceMovies.createMovie(newMovie)
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
}

module.exports = apiMovies
