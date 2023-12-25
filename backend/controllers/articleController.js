const scraper = require('../scrapper')

async function getArticles(req, res) {
    try {
        const articles = await scraper.fetchArticlesFromWebsites()
        res.json({success: true, articles})
    } catch (error) {
        console.error('Error fetching articles')
        res.status(500).json({success: false,message: 'Failed to fetch articles'})
    }
}

module.exports = {getArticles}