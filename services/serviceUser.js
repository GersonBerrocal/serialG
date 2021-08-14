const MongoLib = require('../libs/mongo')

class ServiceUser {
  constructor() {
    this.mongoDB = new MongoLib()
    this.collection = 'user'
  }

  createUser(user) {
    return this.mongoDB.create(this.collection, user)
  }

  getUser(userName) {
    return this.mongoDB.getOne(this.collection, null, { user_name: userName })
  }

  deleteUser(userId) {
    return this.mongoDB.delete(this.collection, userId)
  }

  todos() {
    return this.mongoDB.getAll(this.collection)
  }
}

module.exports = ServiceUser
