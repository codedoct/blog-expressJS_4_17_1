const express = require('express')
const router = express.Router()
const newsController = require('~/controllers/v1/newsController')
const authController = require('~/controllers/v1/authController')
const userController = require('~/controllers/v1/userController')
const toolsController = require('~/controllers/v1/toolsController')

router.use('/auth', authController)
router.use('/user', userController)
router.use('/news', newsController)
router.use('/tools', toolsController)

module.exports = router
