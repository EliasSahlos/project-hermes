const cron = require('node-cron')
const {scrapeArticles} = require("./articleController");
const {deleteOldArticles} = require("./articleController")

// Define a function to be run periodically
const fetchDataPeriodically = () => {
    // Schedule the fetchData function to run every 10 minutes
    cron.schedule('*/10 * * * *', async () => {
        try {
            const articles = await scrapeArticles();
            console.log('Fetched articles:', articles);
            // Do whatever you want with the fetched articles here
        } catch (error) {
            console.error('Error fetching articles:', error);
        }
    });
};

const deleteDataPeriodically = () => {
    cron.schedule('*/5 * * * *', async () => {
        try {
            await deleteOldArticles()
            console.log("Deleting old articles")
        } catch (error){
            console.log("Error while deleting old articles", error)
        }
    })
}

module.exports = {fetchDataPeriodically, deleteDataPeriodically}