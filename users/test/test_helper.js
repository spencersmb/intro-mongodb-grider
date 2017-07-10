const mongoose = require('mongoose')
mongoose.Promise = global.Promise // Tell Mongoose to use ES6 promises
before((done) => {
  mongoose.connect('mongodb://localhost/users_test', {
    useMongoClient: true
    /* other options */
  })
  mongoose.connection
    .once('open', () => {
      console.log('Good to go!')
      done()
    }
    ).on('error', (error) => {
      console.warn('Warning', error)
    })
})

const dropCollection = collectionName =>
  mongoose.connection.collections[collectionName].drop().catch(err =>
    err.message === 'ns not found'
      ? Promise.resolve()
      : Promise.reject(err)
  )

const asyncWrapper = async (fn, type) => {
  try {
    await fn(type)
  } catch (e) {
    console.log('ERRORS', e)
  }
}

const collectionsReset = async () => {
  await asyncWrapper(dropCollection, 'users')
  await asyncWrapper(dropCollection, 'comments')
  await asyncWrapper(dropCollection, 'blogposts') // MongoDB lowercases camcelcase IDS
}

// Before Each Describe block (test) erase DB users
beforeEach(collectionsReset)
