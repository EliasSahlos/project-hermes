const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController')

router.get('/articles/all',articleController.getAllArticles)
router.get('/articles/economy',articleController.getEconomyArticles)
router.get('/articles/politics',articleController.getPoliticArticles)

module.exports = router;