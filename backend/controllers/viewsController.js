const { MongoClient } = require('mongodb')

require('dotenv').config()

const uri = process.env.MONGO_ATLAS_URI

async function updateArticleViewCount(req, res) {
    const client = new MongoClient(uri)
    try {
        const {id} = req.params
        console.log('Article ID from inside the view controller', id)

        // Connect to database
        await client.connect()
        const db = client.db('app-data')
        const articleCollection = db.collection('articles')

        //Update the view count for the article
        const article = await articleCollection.findOneAndUpdate(
            {uuid: id},
            {$inc: {views: 1}},
            {returnDocument: 'after'}
        )
        if (!article.uuid) {
            return res.status(404).json({message: "Article Not Found"})
        }
        res.status(200).json({message: 'View Count Updated successfully', article: article.value})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Internal Server Error"})
    } finally {
        await client.close()
    }
}

module.exports = {updateArticleViewCount}