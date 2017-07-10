const assert = require('assert')
const User = require('../src/user')

describe('Subdocuments', () => {
  it('Can create a subdocument', async () => {
    const joe = new User(
      {
        name: 'joe',
        posts: [{ title: 'Post Title' }]
      }
    )
    await joe.save()
    const user = await User.findOne({ name: 'joe' })
    assert(user.posts[0].title === 'Post Title')
  })
  it('Can add new post to existing user', async () => {
    const joe = new User(
      {
        name: 'joe',
        posts: []
      }
    )
    await joe.save()
    const user = await User.findOne({ name: 'joe' })
    user.posts.push({
      title: 'new post'
    })
    await user.save()
    const user2 = await User.findOne({ name: 'joe' })
    assert(user2.posts[0].title === 'new post')
  })
  it('Can remove an existing subdoc', async () => {
    const joe = new User(
      {
        name: 'joe',
        posts: [{
          title: 'new post'
        }]
      }
    )
    await joe.save()
    const user = await User.findOne({ name: 'joe' })
    // remove method is something mongo
    // it doesn't save though after remove on SUBDOCUMENTS
    // Must still call save after
    // no need to splice or filter
    user.posts[0].remove()
    await user.save()
    const user2 = await User.findOne({ name: 'joe' })
    assert(!user2.posts[0])
  })
})
