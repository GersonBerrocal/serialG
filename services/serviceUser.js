const MongoLib = require('../libs/mongo')

class ServiceUser {
  constructor() {
    this.mongoDB = new MongoLib()
    this.collection = 'user'
  }

  createUser(user) {
    return this.mongoDB.create(this.collection, user)
  }
}

module.exports = ServiceUser
