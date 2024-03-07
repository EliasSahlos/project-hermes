const { MongoClient } = require("mongodb")
require('dotenv').config()

const uri = process.env.MONGO_ATLAS_URI

//api/websites/sources
async function getWebsiteSources(req, res) {
    const client = new MongoClient(uri)
    try {
        // Connects to Database
        await client.connect()
        const db = client.db('app-data')
        const websitesSourcesCollection = db.collection('websites')

        const websitesSources = await websitesSourcesCollection.find({}).toArray()

        res.status(200).json({ message: 'Website sources fetched successfully', websitesSources })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Failed to fetch website sources. Please try again!' })
    } finally {
        await client.close()
    }
}

module.exports = { getWebsiteSources }