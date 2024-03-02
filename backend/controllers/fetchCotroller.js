const cron = require('node-cron')
const {scrapeArticles} = require("./articleController");

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

module.exports = {fetchDataPeriodically}