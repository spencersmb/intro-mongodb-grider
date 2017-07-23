const mongoose = require('mongoose')
const Schema = mongoose.Schema
const mongodbErrorHandler = require('mongoose-mongodb-errors')

const driverSchema = new Schema({
  driving: {
    type: Boolean,
    default: false
  },
  email: {
    type: String,
    required: true
  },
  location: String
})
// driverSchema.plugin(mongodbErrorHandler) //change ugly errors to nice looking errors we can display on front end

// module.exports = mongoose.model('Driver', driverSchema)
module.exports = mongoose.model('Driver', driverSchema)
