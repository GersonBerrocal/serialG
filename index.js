const express = require('express')
const app = express()
const path = require('path')

const apiMovies = require('./routes/apiMovies')
const apiUser = require('./routes/apiUser')
const validateHandler = require('./util/middleware/validateHandler')
const { idMovieSchema } = require('./util/schema/movie')
const admin = require('./routes/admin')

const notFoundHandler = require('./util/middleware/notFoundHandler')

app.use(express.json())

app.use(express.static('public'))
app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '/public/index.html'))
})
app.get('/directorio', (req, res) => {
  res
    .status(200)
    .sendFile(path.join(__dirname, '/public/pages/directorio.html'))
})
app.get(
  '/movie/:idMovie',
  validateHandler(idMovieSchema, 'params'),
  (req, res) => {
    const movieId = req.params.idMovie
    res.status(200)
    res.redirect(`../../pages/movie.html?movieId=${movieId}`)
    // .sendFile(
    //   path.join(__dirname, `/public/pages/movie.html?movieId=${movieId}`)
    // )
  }
)
apiUser(app)
apiMovies(app)
admin(app)
app.use(notFoundHandler)

app.use((err, req, res, next) => {
  // res.status(err.status).json({ err: err.message })
  const status = err.status || 500
  const message = err.message || 'Ocurrio un error'
  res.status(status).json({ err: message })
})
app.listen(3000, () => {
  console.log('app corriendo en el puerto 3000')
})
