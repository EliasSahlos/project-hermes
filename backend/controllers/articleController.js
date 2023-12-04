const {fetchArticlesFromWebsite} = require('../scrapper')
const websites = require('../websites')

async function getAllArticles(req, res) {
    const categories = ['economy', 'politics'];
    const allArticles = {
        economyArticles: [],
        politicsArticles: []
    };
    for (const website in websites) {
        for (const category of categories) {
            const articles = await fetchArticlesFromWebsite(website, category);
            //Inserts new articles to specific category without losing previous articles
            allArticles[`${category}Articles`] = allArticles[`${category}Articles`].concat(articles);
        }
    }

    res.json(allArticles);
}

async function getEconomyArticles(req, res) {
    const categories = ['economy']
    const economyArticles = []
    for (const website in websites) {
        for (const category of categories) {
            const articles = await fetchArticlesFromWebsite(website, category);
            economyArticles.push(...articles)
        }
    }
    res.json(economyArticles)
}

async function getPoliticArticles(req, res) {
    const categories = ['politics']
    const politicsArticles = []
    for (const website in websites) {
        for (const category of categories) {
            const articles = await fetchArticlesFromWebsite(website, category);
            politicsArticles.push(...articles)
        }
    }
    res.json(politicsArticles)
}

module.exports = {getAllArticles, getEconomyArticles, getPoliticArticles}