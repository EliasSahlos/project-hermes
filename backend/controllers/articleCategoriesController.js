const { MongoClient } = require('mongodb')
require('dotenv').config()

const uri = process.env.MONGO_ATLAS_URI

async function getArticleCategories(req, res) {
    const client = new MongoClient(uri)
    try {
        // Connects to Database
        await client.connect()
        const db = client.db('app-data')
        const articleCategoriesCollection = db.collection('article-categories')

        const articleCategories = await articleCategoriesCollection.find({}).toArray()

        res.status(200).json({ message: 'Article Categories fetched successfully', articleCategories })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Failed to fetch articleCategories. Please try again!' })
    } finally {
        await client.close()
    }
}

module.exports = { getArticleCategories }