const express = require('express')
const ServiceMovie = require('../services/serviceMovies')
const serviceMovies = new ServiceMovie()

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
  router.get('/:idMovie', async function (req, res) {
    const idMovie = req.params.idMovie
    const movie = await serviceMovies.getMovie(idMovie)
    res.json(movie)
  })
  //  rutas solo para admins
  router.delete('/:idMovie', async function (req, res) {
    const idMovie = req.params.idMovie
    const movie = await serviceMovies.deleteMovie(idMovie)
    res.json(movie)
  })
  router.post('/', async function (req, res) {
    const newMovie = req.body
    const movie = await serviceMovies.createMovie(newMovie)
    res.json(movie)
  })
  router.put('/:idMovie', async function (req, res) {
    const newDataMovie = req.body
    const movieId = req.params.idMovie
    const result = await serviceMovies.updateMovie(movieId, newDataMovie)
    res.json(result)
  })
}

module.exports = apiMovies
