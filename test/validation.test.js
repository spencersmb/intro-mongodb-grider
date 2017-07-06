const assert = require('assert')
const User = require('../src/user')

describe('Validating Records', () => {
  it('requires a user name', () => {
    const user = new User({ name: undefined })
    // Simulate a basic save/validation process
    // without needing to add any validation functions on the schema
    const validationResult = user.validateSync()
    const { message } = validationResult.errors.name

    assert(message === 'Must Provide a name.')
  })

  it('requires name longer than 2 characters', () => {
    const user = new User({ name: 'Al' })
    const validationResult = user.validateSync()
    const { message } = validationResult.errors.name

    assert(message === 'Name must be longer than 2 characters.')
  })

  it('disallows invalid records from being saved', async () => {
    try {
      const user = new User({ name: 'Al' })
      await user.save()
    } catch (e) {
      const { message } = e.errors.name
      assert(message === 'Name must be longer than 2 characters.')
    }
  })
})
