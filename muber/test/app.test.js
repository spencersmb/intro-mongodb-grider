const assert = require('assert')
const request = require('supertest')
const app = require('../app.js')

describe('The express app', () => {
  it('handles a GET request to /api', async () => {

    const response = await request(app).get('/api')
    assert(response.body.hi === 'there')

    // PROMISE WAY
    // request(app).get('/api').then((r) => {
    //   console.log('r', r)
    //   done()
    // })

  })
})