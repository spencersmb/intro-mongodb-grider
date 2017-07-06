const assert = require('assert')
const User = require('../src/user')

describe('Update Methods', () => {
  let joe

  beforeEach(async () => {
    joe = new User({
      name: 'Joe',
      postCount: 0
    })
    await joe.save()
  })

  async function assertName (operation, name) {
    await operation
    // find all users with empty object
    const findAllUsers = await User.find({})

    assert(findAllUsers.length === 1)
    assert(findAllUsers[0].name === name)
  }

  it('instance type using set n save', async () => {
    // set does not save to DB - just changes the model
    joe.set('name', 'Spencer')
    // await joe.save()
    await assertName(joe.save(), 'Spencer')
  })

  it('A model instance update', async () => {
    // commonly used to update a specific record once we have
    // already reached into our DB
    await assertName(joe.update({ name: 'Alex' }), 'Alex')
  })

  it('A model class can update', async () => {
    await assertName(
      User.update({ name: 'Joe' }, { name: 'Teela' }),
      'Teela'
    )
  })

  it('A model class can update one record', async () => {
    await assertName(
      User.findOneAndUpdate({ name: 'Joe' }, { name: 'Bigum' }),
      'Bigum'
    )
  })

  it('A model finds a record with an ID and update', async () => {
    await assertName(
      User.findByIdAndUpdate(joe._id, { name: 'Nuna' }),
      'Nuna'
    )
  })

  it('A users postCount increments by 1', async () => {
    // Update ALL users in the DB with one request
    await User
      .update({ name: 'Joe' },
        { $inc: { likes: 1 } }
      )

    const user = await User.findOne({ name: 'Joe' })
    assert(user.likes === 1)
  })
})
