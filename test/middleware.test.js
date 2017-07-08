const assert = require('assert')
const mongoose = require('mongoose')
const User = require('../src/user')
const BlogPost = require('../src/blogPost')

describe('Middleware', () => {
  let joe, blogPost

  beforeEach(async () => {
    joe = new User({ name: 'Joe' })
    blogPost = new BlogPost({ title: 'Js is Great', content: 'JS is the future of webDev.' })

    joe.blogPosts.push(blogPost) // We can push a whole model and mongo will auto Setup the ID for the assosiation

    await Promise.all([joe.save(), blogPost.save()])
  })

  it('Should remove Users blogPosts when we remove a user', async () => {
    await joe.remove()

    // should have 0 blogposts after removal
    const totalPosts = await BlogPost.count()
    assert(totalPosts === 0)
  })
})
