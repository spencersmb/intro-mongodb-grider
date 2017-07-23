const mongoose = require('mongoose')
mongoose.Promise = global.Promise

let db

if (process.env.NODE_ENV !== 'test') {
  db = mongoose.connect('mongodb://localhost/mubar', {
    useMongoClient: true
    /* other options */
  })

  db.once('open', () => {
      console.log('Connected to mubar!')
    }
  )

  db.on('error', (error) => {
    console.warn('Warning', error)
  })

}

// Load models for dev/production
// Test models must get loaded in the Controller
require('./models/driver')

const app = require('./app')

app.set('port', process.env.PORT || 3050)
const server = app.listen(app.get('port'), () => {
  console.log('process.env.NODE_ENV', process.env.NODE_ENV)
  console.log(`Express running → PORT ${server.address().port}`)
})
// app.listen(3050, () => {
//   console.log('App running on port 3050')
// })