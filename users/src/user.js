const mongoose = require('mongoose')
const Schema = mongoose.Schema
const PostSchema = require('./post')

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Must Provide a name.'],
    validate: {
      validator: (name) => {
        return name.length > 2
      },
      message: 'Name must be longer than 2 characters.'
    }
  },
  // postCount: Number,
  posts: [PostSchema],
  blogPosts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'blogPost'
    }
  ],
  likes: Number
})

UserSchema.virtual('postCount').get(function () {
  return this.posts.length
})

//
UserSchema.pre('remove', async function (next) {
  // this === joe
  // do not require MODEL the top of the page
  const BlogPost = mongoose.model('blogPost')

  // must remove ID of User from blogPost array collection
  // Solution is to not iterate over collection
  // Go through our BlogPosts ID's and if the id is "IN" this.blogPosts Array - remove it from the BlogPosts Collection. Which happens before we remove the entire User completly.
  await BlogPost.remove({ _id: { $in: this.blogPosts } })
  next()
})
const User = mongoose.model('user', UserSchema)
module.exports = User
