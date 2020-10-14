const express = require('express')
const router = express.Router()
const newsController = require('../../controllers/v1/newsController')
const authController = require('../../controllers/v1/authController')

router.use('/auth', authController)
router.use('/news', newsController)

module.exports = router
