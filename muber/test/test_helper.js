const mongoose = require('mongoose')
mongoose.Promise = global.Promise // Tell Mongoose to use ES6 promises

// MUST USE DONE instead of async for some reason
before((done) => {

  mongoose.connect('mongodb://localhost/mubar-test', {
    useMongoClient: true
    /* other options */
  }).once('open', () => {
      console.log('Connected to mubar-test DB!')
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
  await asyncWrapper(dropCollection, 'drivers')
  // await asyncWrapper(dropCollection, 'blogposts') // MongoDB lowercases camcelcase IDS
}

// Before each test startsClear or add test data
beforeEach(collectionsReset)
