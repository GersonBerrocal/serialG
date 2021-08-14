const express = require('express')
const app = express()

const apiMovies = require('./routes/apiMovies')
const apiUser = require('./routes/apiUser')

app.use(express.json())
apiUser(app)
apiMovies(app)

app.listen(3000, () => {
  console.log('app corriendo en el puerto 3000')
})
