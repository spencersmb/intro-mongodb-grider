const assert = require('assert')
const User = require('../src/user')
describe('Creating Records', () => {
  it('Saves a user', async () => {
    const user = new User({
      name: 'Joe'
    })

    // new users have __v property after save
    const newUser = await user.save()
    // console.log('newUser', newUser)
    assert('__v' in newUser)
  })
})
