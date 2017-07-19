const express = require('express')
const router = express.Router()
const GreetingCtrl = require('../controllers/greeting')
const Drivers = require('../controllers/drivers')

router.get('/api', GreetingCtrl.getGreeting)

router.post('/api/drivers', Drivers.create)

module.exports = router
