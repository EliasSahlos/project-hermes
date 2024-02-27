const express = require('express')
const router = express.Router()
const websiteController = require('../controllers/websitesController')

router.get('/sources', websiteController.getWebsiteSources)

module.exports = router