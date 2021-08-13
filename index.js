const express = require('express')
const app = express()

const apiMovies = require('./routes/apiMovies')

app.use(express.json())
apiMovies(app)

app.listen(3000, () => {
  console.log('app corriendo en el puerto 3000')
})
