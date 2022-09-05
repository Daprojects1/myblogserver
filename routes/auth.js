const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const authCheck = require('../controllers/AuthControllers/runAuthCheck')


router.route('/')
    .get(auth, authCheck)


module.exports = router