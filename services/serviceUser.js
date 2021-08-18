const MongoLib = require('../libs/mongo')

class ServiceUser {
  constructor() {
    this.mongoDB = new MongoLib()
    this.collection = 'user'
  }

  createUser(user) {
    return this.mongoDB.create(this.collection, user)
  }

  getUser(userName, userId = null) {
    const req = userName ? { user_name: userName } : null
    return this.mongoDB.getOne(this.collection, userId, req)
  }

  deleteUser(userId) {
    return this.mongoDB.delete(this.collection, userId)
  }

  todos() {
    return this.mongoDB.getAll(this.collection)
  }

  updateUser(userId, data) {
    return this.mongoDB.update(this.collection, userId, data)
  }
}

module.exports = ServiceUser
