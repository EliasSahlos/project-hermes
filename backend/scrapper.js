const {chromium} = require("playwright");
const websites = require('./websites')
async function fetchArticlesFromWebsite(website, category) {
    const {
        url,
        articleSelector,
        titleSelector,
        contentSelector,
        timeSelector,
        imageSelector
    } = websites[website][category];
    const articles = [];

    try {
        const browser = await chromium.launch();
        const context = await browser.newContext();
        const page = await context.newPage();

        await page.goto(url, {waitUntil: 'domcontentloaded'});

        const articleLinks = await page.$$eval(articleSelector, links => links.map(link => link.href));

        // Scrape up to 10 articles
        for (let i = 0; i < Math.min(articleLinks.length, 10); i++) {
            const articleUrl = articleLinks[i];
            const articleData = await scrapeArticle(page, articleUrl, titleSelector, contentSelector, timeSelector, imageSelector);
            articles.push(articleData);
        }

        await browser.close();
    } catch (error) {
        console.error('Error fetching articles:', error);
    }

    return articles;
}

async function scrapeArticle(page, url, titleSelector, contentSelector, timeSelector, imageSelector) {
    try {
        if (url) {
            await page.goto(url, {waitUntil: 'domcontentloaded'});

            const title = await page.$eval(titleSelector, titleElement => titleElement.textContent.trim());

            const image = await page.$eval(imageSelector, (imageElement) => imageElement ? imageElement.src : null);

            // Check if og:site_name is present within a small timeout, otherwise set a default value
            let source = 'Unknown Source';
            try {
                source = await Promise.race([
                    page.$eval('meta[property="og:site_name"]', metaElement => metaElement?.content),
                    page.waitForTimeout(50) // Wait for 50 milliseconds
                ]);
            } catch (timeoutError) {
                // Handle timeout error, use the default value
                // console.log(timeoutError)
            }

            const timeElement = await page.$(timeSelector);
            let date;
            if (timeElement) {
                date = await page.$eval(timeSelector, timeElement => timeElement.textContent.trim());
            } else {
                // If timeElement doesn't exist, use the current date and time
                console.log("I had to change the time on this one bro")
                date = new Date().toISOString();
            }
            //const date = await page.$eval(timeSelector, timeElement => timeElement.textContent.trim());

            // Wait for the content element to be present on the page, with a longer timeout
            const contentElements = await page.$$(contentSelector);

            // Extract text content from all specified tags within each content element
            const contentTags = ['p', 'ul', 'li']; // Add more tags as needed
            const content = [];

            for (const element of contentElements) {
                for (const tag of contentTags) {
                    const tagElements = await element.$$(`${tag}`);

                    for (const tagElement of tagElements) {
                        const tagText = await tagElement.textContent();
                        content.push(tagText.trim());
                    }
                }
            }

            // Join content into a single string
            const articleContent = content.join(' ');

            return {
                title,
                article: articleContent.trim(),
                date,
                source,
                image
            };
        } else {
            console.error('URL is undefined for the article. Skipping.');
            return {};
        }
    } catch (error) {
        console.error('Error scraping article:', error);
        return {};
    }
}

module.exports = {fetchArticlesFromWebsite, scrapeArticle}