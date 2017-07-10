const mongoose = require('mongoose')
const Schema = mongoose.Schema
const SchemaTypes = mongoose.Schema.Types

const AlbumSchema = new Schema({
  copiesSold: Number,
  date: Date,
  image: String,
  numberTracks: Number,
  revenue: Number,
  title: String
})

module.exports = AlbumSchema
