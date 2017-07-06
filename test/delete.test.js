const assert = require('assert')
const User = require('../src/user')

describe('Deleting a User', () => {
  let joe

  beforeEach(async () => {
    joe = new User({
      name: 'Joe'
    })
    await joe.save()
  })

  it('model instance remove', async () => {
    await joe.remove()
    const findUser = await User.findOne({name: 'Joe'})
    assert(findUser === null)
  })

  it('class method remove', async () => {
    // remove a bunch of records with some give criteria
    // this would remove ALL records with name Joe
    await User.remove({name: 'Joe'})
    const findUser = await User.findOne({name: 'Joe'})
    assert(findUser === null)
  })

  it('class method findOneAndRemove', async () => {
    await User.findOneAndRemove({name: 'Joe'})
    const findUser = await User.findOne({name: 'Joe'})
    assert(findUser === null)
  })

  it('class method findByIdAndRemove', async () => {
    await User.findByIdAndRemove(joe._id)
    const findUser = await User.findOne({name: 'Joe'})
    assert(findUser === null)
  })
})
