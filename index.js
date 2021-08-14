const express = require('express')
const app = express()

const apiMovies = require('./routes/apiMovies')
const apiUser = require('./routes/apiUser')

const notFoundHandler = require('./util/middleware/notFoundHandler')

app.use(express.json())
apiUser(app)
apiMovies(app)

app.use(notFoundHandler)

app.use((err, req, res, next) => {
  res.json(err)
})
app.listen(3000, () => {
  console.log('app corriendo en el puerto 3000')
})
