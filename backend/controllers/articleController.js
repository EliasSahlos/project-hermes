const { CronJob } = require('cron');
const { collection, addDoc, Timestamp, getDocs, query } = require('firebase/firestore');
const { fetchArticlesFromWebsite } = require('../scrapper');
const { db } = require('../firebase/firebase');
const websites = require('../websites');

async function fetchAndProcessArticles() {
    try {
        console.log("Starting fetchAndProcessArticles function..");
        const categories = ['economy', 'politics'];
        const allArticles = {
            economyArticles: [],
            politicsArticles: []
        };
        let newArticlesCounter = 0;
        let newArticles = [];

        for (const website in websites) {
            for (const category of categories) {
                //Fetch articles from websites
                const articles = await fetchArticlesFromWebsite(website, category);
                allArticles[`${category}Articles`] = allArticles[`${category}Articles`].concat(articles);
                
                //Check for existing articles in Firestore base on article field text 
                const existingArticleArticles = [];
                const querySnapshot = await getDocs(query(collection(db, 'articles', category, 'list')));
                querySnapshot.forEach((doc) => {
                    existingArticleArticles.push(doc.data().article);
                });

                //Filter articles that don't exist in Firestore
                const newArticlesFiltered = articles.filter(article => !existingArticleArticles.includes(article.article));
                newArticles.push(...newArticlesFiltered)

                //Convert date field Strings to Timestamps
                const articlesWithTimestamps = newArticlesFiltered.map(article => {
                    const dateTimestamp = Timestamp.fromDate(new Date(article.date));
                    return { ...article, date: dateTimestamp };
                });
                
                //Save new articles in Firestore
                const categoryRef = collection(db, 'articles', category, 'list');
                for (const article of articlesWithTimestamps) {
                    await addDoc(categoryRef, article);
                    newArticlesCounter++;
                }
            }
        }
        console.log("New articles added : ", newArticlesCounter);
        console.log("New Articles : ",newArticles.map((article) => article.title));
        console.log("Finished fetchAndProcessArticles function!");
    } catch (error) {
        console.error(error);
    }
}

async function getAllArticles(req, res) {
    try {
        await fetchAndProcessArticles();
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}

const articlesAutoFetch = new CronJob('0 * * * * *', fetchAndProcessArticles);
articlesAutoFetch.start();

module.exports = { getAllArticles };
