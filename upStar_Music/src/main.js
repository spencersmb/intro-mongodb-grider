import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import ReduxThunk from 'redux-thunk'
import { Db, Server } from 'mongodb'
import reducers from './reducers'
import Routes from './router'
import mongoose from 'mongoose'
import './seeds'
// require('./config.json')
import { variables } from './env'

mongoose.Promise = Promise

const App = () => {
  const store = createStore(reducers, {}, applyMiddleware(ReduxThunk))

  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  )
}

// const db = new Db('upstar_music', new Server('localhost', 27017))
const db = new Db('upstarmusicapp', new Server(variables.URI, variables.PORT
))

db.open((err, dba) => {
  dba.authenticate(variables.USER, variables.PW, (err, success) => {
    if (success) {
      // callback(null, db);
      window.db = db
      mongoose.connect(variables.MONGODB_URI, {
        useMongoClient: true
        /* other options */
      })
      mongoose.connection
        .once('open', () => {
          ReactDOM.render(<App />, document.getElementById('root'))
        })
        .on('error', (error) => {
          console.warn('Warning', error)
        })
    } else {
      // callback(err ? err : new Error('Could not authenticate user ' + user), null);
    }
  })
})
// .then(() => {
//   window.db = db
//   // mongoose.connect('mongodb://localhost/upstar_music')
//   mongoose.connect(variables.MONGODB_URI, {
//     useMongoClient: true
//     /* other options */
//   })
//   mongoose.connection
//     .once('open', () => {
//       ReactDOM.render(<App />, document.getElementById('root'))
//     })
//     .on('error', (error) => {
//       console.warn('Warning', error)
//     })
// })
