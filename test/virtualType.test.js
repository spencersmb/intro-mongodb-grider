const assert = require('assert')
const User = require('../src/user')

describe('Update Methods', () => {
  it('post count returns number of posts', async () => {
    const user = new User({
      name: 'spencer',
      posts: [{ title: 'First Post' }]
    })

    await user.save()
    const spencer = await User.findOne({ name: 'spencer' })
    assert(spencer.postCount === 1)
  })
})
