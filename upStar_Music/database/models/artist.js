const mongoose = require('mongoose')
const Schema = mongoose.Schema
const AlbumSchema = require('./album')

const ArtistSchema = new Schema({
  age: Number,
  albums: [AlbumSchema],
  genre: String,
  image: String,
  labelName: String,
  name: String,
  netWorth: Number,
  retired: Boolean,
  website: String,
  yearsActive: Number
})

const Artist = mongoose.model('artist', ArtistSchema)

module.exports = Artist
