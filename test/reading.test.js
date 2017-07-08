const assert = require('assert')
const User = require('../src/user')
describe('Reading Records', () => {
  // insert dummy user for this test only
  let joe, maria, alex, zach
  beforeEach(async () => {
    joe = new User({
      name: 'Joe'
    })
    maria = new User({
      name: 'Maria'
    })
    alex = new User({
      name: 'Alex'
    })
    zach = new User({
      name: 'Zach'
    })
    // await joe.save()
    await Promise.all([joe.save(), maria.save(), alex.save(), zach.save()])
  })

  it('Find all the users with the name of joe', async () => {
    const result = await User.find({ name: 'Joe' })
    const findUser = result
      .filter(user => user._id.toString() === joe._id.toString())
    assert(findUser.length === 1)
  })

  it('Should find a user with a particular id', async () => {
    const result = await User.findOne({ _id: joe._id })
    assert(result.name === 'Joe')
  })

  it('Should can skip and limit the result set', async () => {
    // find all users with empty object
    const limitTwo = await User.find({})
      .sort({ name: 1 }) // sort Ascending
      .skip(1)
      .limit(2)

    assert(limitTwo.length === 2)
    assert(limitTwo[0].name === 'Joe')
    assert(limitTwo[1].name === 'Maria')
  })
})
