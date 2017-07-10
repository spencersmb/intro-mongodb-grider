const assert = require('assert')
const mongoose = require('mongoose')
const User = require('../src/user')
const Comment = require('../src/comment')
const BlogPost = require('../src/blogPost')

describe('Associations', () => {
  let joe, blogPost, comment

  beforeEach(async () => {
    joe = new User({ name: 'Joe' })
    blogPost = new BlogPost({ title: 'Js is Great', content: 'JS is the future of webDev.' })
    comment = new Comment({ content: 'Congrats on a Great Post' })

    joe.blogPosts.push(blogPost) // We can push a whole model and mongo will auto Setup the ID for the assosiation
    blogPost.comments.push(comment)
    comment.user = joe

    // await joe.save()
    // await blogPost.save()
    // await comment.save()
    await Promise.all([joe.save(), blogPost.save(), comment.save()])
  })

  it('Saves a relation between a user and blogpost', async () => {
    const user = await User.findOne({ name: 'Joe' }).populate('blogPosts')
    assert(user.blogPosts[0].title === 'Js is Great')
  })

  it('Saves a full relation graph', async () => {
    const user = await User.findOne({ name: 'Joe' }).populate({
      path: 'blogPosts',
      populate: {
        path: 'comments',
        model: 'comment',
        populate: {
          path: 'user',
          model: 'user'
        }
      }
    })

    assert(user.name === 'Joe')
    assert(user.blogPosts[0].title === 'Js is Great')
    assert(user.blogPosts[0].comments[0].content === 'Congrats on a Great Post')
    assert(user.blogPosts[0].comments[0].user.name === 'Joe')
  })
})
