const {chromium} = require("playwright")
const websites = require('./websites')

const startingArticleLinks = ['h2', 'h3', '.media', '.gtr']
const titleSelectors = ['h1.fw-headline', '.entry-title', '.article-title', '.article__title', '.headline', '.itemTitle', '.title', 'h1', 'h2', 'h3']
const articleSelectors = ['div.articletext', 'div.article', 'div.entry-content', 'div.content', 'div.itemFullText', 'div.main-text', 'div.story-fulltext', 'div.td-post-content', 'div.article__body', '.cntTxt']
const timeSelectors = ['.time', '.date', 'time']

// const imageSelectors = ['.image', '.img', 'img', 'picture']

async function fetchArticlesFromWebsites() {
    const articles = []

    try {
        console.log("STARTING FETCHING PROCESS..")
        const browser = await chromium.launch()
        const context = await browser.newContext()
        const page = await context.newPage()

        for (const website of websites) {
            console.log("NOW FETCHING WEBPAGE : ", website)

            for (const category in website.categories) {
                //Navigate to the URL of the current category
                await page.goto(website.categories[category], {waitUntil: 'domcontentloaded'})
                let articleLinks = []

                //Fetch article URLs from current page
                for (const startingSelector of startingArticleLinks) {
                    const selector = `${startingSelector} a`
                    articleLinks = await page.$$eval(selector, links => links.map(link => link.href))

                    if (articleLinks.length > 0) {
                        break
                    }
                }

                //Scraping articles from fetched URLs
                for (let i = 0; i < Math.min(articleLinks.length, 5); i++) {
                    const articleData = await scrapeArticle(page, articleLinks[i], category)
                    articles.push(articleData)
                }
            }
        }

        await browser.close()
        console.log("FINISHED FETCHING")
    } catch (error) {
        console.error('Error fetching articles:', error)
    }

    return articles
}


async function scrapeArticle(page, articleUrl, category) {
    // Object to store article data
    const articleData = {
        url: articleUrl,
        title: '',
        content: '',
        time: '',
        image: '',
        source: '',
        category: category
    }

    try {
        if (articleUrl) {
            // Navigate to the URL of the article
            await page.goto(articleUrl, {waitUntil: 'domcontentloaded'})

            //Fetch title of the article
            for (const selector of titleSelectors) {
                articleData.title = await page.$eval(selector, el => el.textContent.trim()).catch(() => '')
                if (articleData.title) {
                    break
                }
            }

            //Fetch content of the article
            for (const selector of articleSelectors) {
                articleData.content = await page.$eval(selector, el => el.textContent.trim()).catch(() => '')
                if (articleData.content) {
                    articleData.content = articleData.content.replace(/\n/g, '').replace(/\t/g, '').replace(/<[^>]*>?/gm, '')
                    break
                }
            }
            //Fetch timestamp of the article
            let foundTimestamp = false
            for (const selector of timeSelectors) {
                articleData.time = await page.$eval(selector, el => el.getAttribute('datetime')).catch(() => '')
                if (articleData.time) {
                    foundTimestamp = true
                    break
                }
                if (!foundTimestamp) {
                    articleData.time = new Date().toISOString()
                }
            }

            //Fetch source of the article
            articleData.source = await page.$eval('meta[property="og:site_name"]', el => el.content.trim()).catch(() => '')
            // If it's too long assume it's garbage and grab it from URL
            if (articleData.source.length > 25)
                articleData.source = ''
            if (!articleData.source) {
                const urlParts = articleUrl.split('/');
                if (urlParts.length >= 3) {
                    articleData.source = urlParts[2];
                } else {
                    // If URL is not in the expected format, set source as Unknown
                    articleData.source = 'Unknown';
                }
            }


            const images = await page.$$eval('img', imgs => imgs.map(img => ({
                src: img.getAttribute('src'),
                alt: img.getAttribute('alt')
            })))

            for (const img of images) {
                const excludedWords = ['logo', 'svg', 'avatar', 'profile', 'profiles', 'webp', 'gif']
                const shouldExclude = excludedWords.some(word => img.src.includes(word) || (img.alt && img.alt.includes(word)))
                if (!shouldExclude) {
                    if (img.src && !img.src.startsWith('https')) {
                        // Modify the image URL if it doesn't start with 'https'
                        articleData.image = `https://${articleData.source}${img.src}`;
                    } else {
                        articleData.image = img.src;
                    }
                    break;
                }
            }
        }
    } catch (error) {
        console.error('Error scraping article:', error)
    }

    return articleData
}


module.exports = {fetchArticlesFromWebsites}
