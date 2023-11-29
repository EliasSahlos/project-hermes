const express = require('express');
const {chromium} = require('playwright');
const app = express();
const port = 3001;

const websites = {
    newsit: {
        economy: {
            url: 'https://www.newsit.gr/category/oikonomia/',
            articleSelector: 'h2 a',
            titleSelector: 'h1.entry-title',
            contentSelector: 'div.entry-content',
            timeSelector: 'time',
            imageSelector: 'img.attachment-full'
        },
        politics: {
            url: 'https://www.newsit.gr/category/politikh/',
            articleSelector: 'h2 a',
            titleSelector: 'h1.entry-title',
            contentSelector: 'div.entry-content',
            timeSelector: 'time',
            imageSelector: 'img.attachment-full'
        },
    },
    enikos: {
        economy: {
            url: 'https://www.enikos.gr/economy/',
            articleSelector: 'h2 a',
            titleSelector: 'div.content-item h1',
            contentSelector: 'div.articletext',
            timeSelector: 'time',
            imageSelector: 'img'
        },
        politics: {
            url: 'https://www.enikos.gr/politics/',
            articleSelector: 'h2 a',
            titleSelector: 'div.content-item h1',
            contentSelector: 'div.articletext',
            timeSelector: 'time',
            imageSelector: 'img'
        },
    },
    reporter: {
        economy: {
            url: 'https://www.reporter.gr/Eidhseis/Oikonomia',
            articleSelector: 'h3 a',
            titleSelector: 'h2.itemTitle',
            contentSelector: 'div.itemFullText',
            timeSelector: 'span.itemDateCreated',
            imageSelector: 'img.c5'
        },
        politics: {
            url: 'https://www.reporter.gr/Eidhseis/Politikh',
            articleSelector: 'h3 a',
            titleSelector: 'h2.itemTitle',
            contentSelector: 'div.itemFullText',
            timeSelector: 'span.itemDateCreated',
            imageSelector: 'img.c5'
        },
    },
    kathimerini: {
        economy: {
            url: 'https://www.kathimerini.gr/economy/',
            articleSelector: 'div.media-content a',
            titleSelector: 'h1.entry-title',
            contentSelector: 'div.entry-content',
            timeSelector: 'time',
            imageSelector: 'img.picture-nx-medium-two'
        },
        politics: {
            url: 'https://www.kathimerini.gr/politics/',
            articleSelector: 'div.media-content a',
            titleSelector: 'h1.entry-title',
            contentSelector: 'div.entry-content',
            timeSelector: 'time',
            imageSelector: 'img.picture-nx-medium-two'
        }
    },
    newsbomb: {
        economy: {
            url: 'https://www.newsbomb.gr/oikonomia',
            articleSelector: 'h3 a',
            titleSelector: 'h1',
            contentSelector: 'div.main-text',
            timeSelector: 'time',
            imageSelector: 'img:first-child'
        },
        politics: {
            url: 'https://www.newsbomb.gr/politikh',
            articleSelector: 'h3 a',
            titleSelector: 'h1',
            contentSelector: 'div.main-text',
            timeSelector: 'time',
            imageSelector: 'img:first-child'
        },
    },
    cnn: {
        economy: {
            url: 'https://www.cnn.gr/oikonomia',
            articleSelector: 'div.gtr a.item-link',
            titleSelector: 'h1.main-title',
            contentSelector: 'div.story-fulltext',
            timeSelector: 'time',
            imageSelector: 'img:first-child'
        },
        politics: {
            url: 'https://www.cnn.gr/politiki',
            articleSelector: 'div.gtr a.item-link',
            titleSelector: 'h1.main-title',
            contentSelector: 'div.story-fulltext',
            timeSelector: 'time',
            imageSelector: 'img:first-child'
        },
    },
};

async function fetchArticlesFromWebsite(website, category) {
    const {url, articleSelector, titleSelector, contentSelector, timeSelector, imageSelector} = websites[website][category];
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


app.get('/api/articles', async (req, res) => {
    const economyArticlesNewsit = await fetchArticlesFromWebsite('newsit', 'economy');
    const politicsArticlesNewsit = await fetchArticlesFromWebsite('newsit', 'politics');
    const economyArticlesEnikos = await fetchArticlesFromWebsite('enikos', 'economy');
    const politicsArticlesEnikos = await fetchArticlesFromWebsite('enikos', 'politics');
    const economyArticlesReporter = await fetchArticlesFromWebsite('reporter', 'economy');
    const politicsArticlesReporter = await fetchArticlesFromWebsite('reporter', 'politics');
    const economyArticlesNewsbomb = await fetchArticlesFromWebsite('newsbomb', 'economy');
    const politicsArticlesNewsbomb = await fetchArticlesFromWebsite('newsbomb', 'politics');
    const economyArticlesKathimerini = await fetchArticlesFromWebsite('kathimerini', 'economy');
    const politicsArticlesKathimerini = await fetchArticlesFromWebsite('kathimerini', 'politics');
    const economyArticlesCnn = await fetchArticlesFromWebsite('cnn', 'economy');
    const politicsArticlesCnn = await fetchArticlesFromWebsite('cnn', 'politics');


    const economyArticles = [...economyArticlesNewsit, ...economyArticlesEnikos, ...economyArticlesReporter, ...economyArticlesNewsbomb, ...economyArticlesCnn, ...economyArticlesKathimerini];
    const politicsArticles = [...politicsArticlesNewsit, ...politicsArticlesEnikos, ...politicsArticlesReporter, ...politicsArticlesNewsbomb, ...politicsArticlesCnn, ...politicsArticlesKathimerini];

    //In case we want to measure the size of the json file, uncomment the lines below
    // const allArticles = {
    //     economyArticles,
    //     politicsArticles
    // }
    // const jsonString = JSON.stringify(allArticles);
    // console.log('Size of JSON response:', Buffer.byteLength(jsonString, 'utf8'),'bytes')
    // res.json(allArticles);

    res.json({
        economyArticles,
        politicsArticles
    })
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
