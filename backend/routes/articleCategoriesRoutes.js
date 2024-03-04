const express = require('express')
const router = express.Router()
const articleCategories = require('../controllers/articleCategoriesController')

router.get('/all', articleCategories.getArticleCategories)

module.exports = router