const scraper = require('../scrapper/scrapper')
const { MongoClient, ObjectId } = require('mongodb')
const { v4: uuidv4 } = require('uuid')
require('dotenv').config()

const uri = process.env.MONGO_ATLAS_URI

async function scrapeArticles(req, res) {
    const client = new MongoClient(uri)
    try {
        //Scrape articles
        const articles = await scraper.fetchArticlesFromWebsites()

        // Connects to Database
        await client.connect()
        const db = client.db('app-data')
        const articlesCollection = db.collection('articles')

        //Insert each article to database
        let newArticlesCounter = 0
        let newArticlesArr = []
        console.log('Inserting articles to database...')
        for (const article of articles) {

            //Check if article already exists in database
            const existingArticle = await articlesCollection.findOne({ url: article.url })
            if (!existingArticle) {
                const newArticle = {
                    uuid: uuidv4(),
                    url: article.url,
                    title: article.title,
                    content: article.content,
                    time: article.time,
                    image: article.image,
                    source: article.source,
                    category: article.category,
                    views: 0,
                }
                await articlesCollection.insertOne(newArticle)
                newArticlesArr.push(newArticle.title)
                newArticlesCounter++
            }
        }
        console.log("New articles array: ", newArticlesArr, "Articles added:", newArticlesCounter,)
        res.status(200).json({ message: 'Articles scraped and inserted into database successfully!', articles })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Failed to fetch articles. Please try again!' })
    } finally {
        await client.close()
    }
}

async function getAllArticles(req, res) {
    const client = new MongoClient(uri)
    try {
        // Connects to Database
        await client.connect()
        const db = client.db('app-data')
        const articlesCollection = db.collection('articles')

        const articles = await articlesCollection.find({}).toArray()

        res.status(200).json({ message: 'Articles fetched successfully', articles })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Failed to fetch articles. Please try again!' })
    } finally {
        await client.close()
    }
}

async function getArticleById(req, res) {
    const client = new MongoClient(uri)
    try {
        const { id } = req.params
        console.log('Article ID:', id)

        // Connects to Database
        await client.connect()
        const db = client.db('app-data')
        const articlesCollection = db.collection('articles')

        // Find the article by its ID
        const article = await articlesCollection.findOne({ uuid: id })

        if (!article) {
            return res.status(404).json({ message: 'Article not found' })
        }

        // Return the article
        res.json(article)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal Server Error' })
    } finally {
        await client.close()
    }
}

module.exports = { scrapeArticles, getAllArticles, getArticleById }