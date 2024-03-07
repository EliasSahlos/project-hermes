const cron = require('node-cron')
const { scrapeArticles } = require("./articleController")
const { deleteOldArticles } = require("./articleController")

// Define a function to be run periodically
function fetchDataPeriodically() {
    // Schedule the fetchData function to run every 10 minutes
    cron.schedule('*/10 * * * *', async () => {
        try {
            const articles = await scrapeArticles()
            console.log('Fetched articles:', articles)
            // Do whatever you want with the fetched articles here
        } catch (error) {
            console.error('Error fetching articles:', error)
        } finally {
            await deleteDataPeriodically()
        }
    })
}

async function deleteDataPeriodically() {
    try {
        console.log("Deleting old articles")
        await deleteOldArticles()
        console.log('Finished deleting old articles')
    } catch (error) {
        console.log("Error while deleting old articles", error)
    }
}

module.exports = { fetchDataPeriodically, deleteDataPeriodically }