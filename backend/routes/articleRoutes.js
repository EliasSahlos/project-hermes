const express = require('express')
const router = express.Router()
const articleController = require('../controllers/articleController')

// api/articles
router.get('/scrape', articleController.scrapeArticles)
router.get('/all', articleController.getAllArticles)
router.get('/id/:id', articleController.getArticleById)
router.get('/category/:category', articleController.getArticleByCategory)

module.exports = router
