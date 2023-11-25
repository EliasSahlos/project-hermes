const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const app = express();
const port = 3001;

async function fetchArticlesFromCategory(url) {
    const articles  = [];

    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);

        const articleLinks = $('h2 a').toArray(); // Update this selector

        // Scrape up to 10 articles
        for (let i = 0; i < Math.min(articleLinks.length, 10); i++) {
            const articleUrl = $(articleLinks[i]).attr('href');
            const articleData = await scrapeArticle(articleUrl);
            articles.push(articleData);
        }
    } catch (error) {
        console.error('Error fetching economy articles:', error);
    }

    return articles;
}

async function scrapeArticle(url) {
    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);

        const title = $('h1.entry-title').text().trim(); // Update this selector
        const source = 'Newsit.gr';

        const timeTag = $('time').first(); // Select the first time tag
        const date = timeTag.text().trim(); // Extract the text content of the time tag

        let articleContent = $('div.entry-content').text(); // Update this selector
        articleContent = articleContent.replace(date, '').trim();

        articleContent = articleContent.replace(/googletag\.cmd\.push\(function\(\) \{[^}]+\}\);/g, '');
        articleContent = articleContent.replace(/\s+/g, ' ').trim();
        return {
            title,
            article: articleContent.trim(),
            date,
            source,
        };
    } catch (error) {
        console.error('Error scraping article:', error);
        return {};
    }
}

app.get('/api/articles', async (req, res) => {
    const economyArticles = await fetchArticlesFromCategory('https://www.newsit.gr/category/oikonomia/');
    const politicsArticles = await fetchArticlesFromCategory('https://www.newsit.gr/category/politikh/');

    res.json({
        economyArticles,
        politicsArticles,
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
