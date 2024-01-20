const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController')


router.get('/all',articleController.getArticles)

module.exports = router;
