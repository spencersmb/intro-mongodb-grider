const assert = require('assert')
const User = require('../src/user')
describe('Reading Records', () => {
  // insert dummy user for this test only
  let joe
  beforeEach(async () => {
    joe = new User({
      name: 'Joe'
    })
    await joe.save()
  })

  it('Find all the users with the name of joe', async () => {
    const result = await User.find({name: 'Joe'})
    const findUser = result
      .filter(user => user._id.toString() === joe._id.toString())
    assert(findUser.length === 1)
  })

  it('Should find a user with a particular id', async () => {
    const result = await User.findOne({_id: joe._id})
    assert(result.name === 'Joe')
  })
})
