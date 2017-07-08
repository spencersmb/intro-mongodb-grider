const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BlogPostSchema = new Schema({
  title: String,
  content: String,
  // Physically store the ID of a comment in here - not a virtual field
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'comment'
    }
  ]

})

const BlogPost = mongoose.model('blogPost', BlogPostSchema)
module.exports = BlogPost
