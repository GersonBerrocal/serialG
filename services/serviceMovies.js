// const { moviesMock   listMoviesMock  } = require('../util/mock/movies')
const MongoLib = require('../libs/mongo')

class ServiceMovies {
  constructor() {
    this.mongoDB = new MongoLib()
    this.collection = 'movies'
  }

  getMovies() {
    return this.mongoDB.getAll(this.collection, {})
  }

  listMovies() {
    return this.mongoDB.getAll(
      this.collection,
      {},
      { _id: 1, title: 1, cover: 1 }
    )
  }

  getMovie(idMovie) {
    return this.mongoDB.getOne(this.collection, idMovie)
  }

  createMovie(movie) {
    return this.mongoDB.create(this.collection, movie)
  }

  updateMovie(idMovie, movie) {
    return this.mongoDB.update(this.collection, idMovie, movie)
  }

  deleteMovie(idMovie) {
    return this.mongoDB.delete(this.collection, idMovie)
  }
}

module.exports = ServiceMovies
