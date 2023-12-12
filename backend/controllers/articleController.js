const {collection, addDoc, Timestamp} = require('firebase/firestore');
const {fetchArticlesFromWebsite} = require('../scrapper')
const {db} = require('../firebase/firebase')
const websites = require('../websites')

async function getAllArticles(req, res) {
    try {
        const categories = ['economy', 'politics'];
        const allArticles = {
            economyArticles: [],
            politicsArticles: []
        };

        for (const website in websites) {
            for (const category of categories) {
                const articles = await fetchArticlesFromWebsite(website, category);
                allArticles[`${category}Articles`] = allArticles[`${category}Articles`].concat(articles);

                // Convert date strings to Timestamps
                const articlesWithTimestamps = articles.map(article => {
                    // Assuming 'date' is the key containing the date string
                    const dateTimestamp = Timestamp.fromDate(new Date(article.date)); // Convert the string to Timestamp
                    return { ...article, date: dateTimestamp }; // Replace the date string with the Timestamp
                });

                // Save articles to Firestore
                const categoryRef = collection(db, 'articles', category,'list'); // Check this line

                for (const article of articlesWithTimestamps) {
                    await addDoc(categoryRef, article); // Check this line as well
                }
            }
        }

        res.json(allArticles);
    } catch (error) {
        res.status(500).send(error.message);
    }
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