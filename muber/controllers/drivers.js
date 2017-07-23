// hack for testing with mocha
if (process.env.NODE_ENV === 'test') {
  require('../models/driver')
}

const mongoose = require('mongoose')
const Driver = mongoose.model('Driver')

exports.create = async (req, res, next) => {
  const {email} = req.body
  const driver = new Driver({
    email: email
  })

  await driver.save()
  res.send(driver)
}

exports.edit = async (req, res) => {
  const {id} = req.params
  const body = req.body

  const updatedDriver = await Driver.findByIdAndUpdate({_id: id}, body)
  res.send(updatedDriver)
}

exports.remove = async (req, res) => {
  const {id} = req.params

  const response = await Driver.findByIdAndRemove({_id: id})
  res.send(response)
}