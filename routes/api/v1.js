const express = require('express')
const router = express.Router()
const newsController = require('~/controllers/v1/newsController')
const authController = require('~/controllers/v1/authController')
const userController = require('~/controllers/v1/userController')
const toolsController = require('~/controllers/v1/toolsController')
const errorLogController = require('~/controllers/v1/errorLogController');

router.use('/auth', authController)
router.use('/user', userController)
router.use('/news', newsController)
router.use('/tools', toolsController)
router.use('/error-log', errorLogController);

module.exports = router
