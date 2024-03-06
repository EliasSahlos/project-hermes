const express = require('express')
const router = express.Router()
const articleController = require('../controllers/articleController')
const viewsController = require('../controllers/viewsController')

// api/articles
router.get('/scrape', articleController.scrapeArticles)
router.get('/all', articleController.getAllArticles)
router.get('/id/:id', articleController.getArticleById)
router.get('/category/:category', articleController.getArticleByCategory)
router.put('/id/:id/views', viewsController.updateArticleViewCount)

module.exports = router
