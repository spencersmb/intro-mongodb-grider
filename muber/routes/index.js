const express = require('express')
const router = express.Router()
const GreetingCtrl = require('../controllers/greeting')
const Drivers = require('../controllers/drivers')

const errorHandler = (fn) => async (req, res, next) => {
  // Promise way of doing it
  // return fn(req, res, next).catch(next)

  try {
    return await fn(req, res, next)
  } catch (e) {
    next(e) // pass error onto middleware
  }
}

router.get('/api', GreetingCtrl.getGreeting)

router.post('/api/drivers', errorHandler(Drivers.create))

router.put('/api/drivers/:id', errorHandler(Drivers.edit))

router.delete('/api/drivers/:id', errorHandler(Drivers.remove))

module.exports = router
