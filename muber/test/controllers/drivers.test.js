require('../../models/driver') // initiate model
const assert = require('assert')
const request = require('supertest')
const app = require('../../app')
const mongoose = require('mongoose')
// assign our Model to a variable -not working
const Driver = mongoose.model('Driver')

// Clean up all test data after tests finish
// after(async () => {
//   await Driver.remove({email: 'test@test.com'})
// })

describe('drivers contoller', () => {
  it('Should POST to /api/drivers should create a driver', async () => {
    const email = 'test@test.com'
    const response = await request(app)
      .post('/api/drivers')
      .send({
        email: email
      })

    const count = await Driver.find({email: email}).count()

    assert(response.status === 200)
    assert(count === 1)

  })

  it('Puts to /api/drivers/:id to edit an existing driver', async () => {
    const driver = new Driver({
      email: 'test@test.com'
    })

    const savedDriver = await driver.save()

    await request(app)
      .put(`/api/drivers/${savedDriver._id}`)
      .send({driving: true})

    const newDriver = await Driver.findOne({email: 'test@test.com'})

    assert(newDriver.driving === true)
  })

  it('Deletes to /api/drivers/:id to delete a driver', async () => {
    const driver = new Driver({
      email: 'test@test.com'
    })

    const savedDriver = await driver.save()

    await request(app)
      .delete(`/api/drivers/${savedDriver._id}`)

    const response = await Driver.find({email: 'test@test.com'}).count()
    assert(response === 0)

  })
})