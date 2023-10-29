const express = require('express')
const router = express.Router()
const StayController = require('../controllers/stayController')

router.get('./show', StayController.show)

module.exports = router