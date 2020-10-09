const express = require('express');
const router = express.Router();
const newsController = require('../../controllers/v1/newsController');

router.use('/news', newsController);

module.exports = router;
