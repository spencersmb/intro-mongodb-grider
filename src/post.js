// this is not a model - only a schema
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = new Schema({
  title: String
})

module.exports = PostSchema
