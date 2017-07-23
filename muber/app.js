const express = require('express')
const app = express()
const routes = require('./routes/index')
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(routes)

//custom middleware handling errors after routes
app.use((err, req, res, next) => {
  console.log('error', err.stack)

  // 422 validation error
  res.status(422).send({error: err.message})
})

module.exports = app
