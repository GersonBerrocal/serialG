const { MongoClient, ObjectId } = require('mongodb')
const config = require('../config')
const USER = encodeURIComponent(config.dbUser)
const PASSWORD = encodeURIComponent(config.dbPassword)
const dbName = config.dbName

const MONGO_URI = `mongodb://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}?authSource=admin&retryWrites=true&w=majority`

class MongoLib {
  constructor() {
    this.client = new MongoClient(MONGO_URI)
    this.dbName = dbName
  }

  connect() {
    if (!MongoLib.connection) {
      MongoLib.connection = new Promise((resolve, reject) => {
        this.client.connect((err) => {
          if (err) reject(err)
          console.log('Connected to mongo')
          resolve(this.client.db(this.dbName))
        })
      })
    }
    return MongoLib.connection
  }

  getAll(collection, query = {}, conditions = {}) {
    return this.connect().then((db) => {
      return db
        .collection(collection)
        .find(query, { projection: conditions })
        .toArray()
    })
  }

  getOne(collection, id, query = null) {
    let q
    if (query) q = query
    else q = { _id: ObjectId(id) }
    return this.connect().then((db) => {
      return db.collection(collection).findOne(q)
    })
  }

  create(collection, data) {
    return this.connect()
      .then((db) => {
        return db.collection(collection).insertOne(data)
      })
      .then((result) => result.insertedId)
  }

  update(collection, id, data) {
    return this.connect()
      .then((db) => {
        return db
          .collection(collection)
          .updateOne({ _id: ObjectId(id) }, { $set: data }, { upsert: true })
      })
      .then((result) => result.updatedId || id)
  }

  delete(collection, id) {
    return this.connect()
      .then((db) => {
        return db.collection(collection).deleteOne({ _id: ObjectId(id) })
      })
      .then(() => id)
  }
}

module.exports = MongoLib
