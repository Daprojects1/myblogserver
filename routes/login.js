const express = require('express')
const router = express.Router()
const loginUser = require('../controllers/AuthControllers/loginController')



// slap function into controllers
router.route('/').post(loginUser)


module.exports = router