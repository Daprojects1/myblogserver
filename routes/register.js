const express = require('express')
const router = express.Router()
const registerController = require('../controllers/AuthControllers/registerController')

router.route('/').post(registerController)

module.exports = router