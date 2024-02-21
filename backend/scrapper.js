const {chromium} = require("playwright");
const websites = require('./websites')

const startingArticleLinks = ['h2', 'h3', '.media', '.gtr']
const titleSelectors = ['h1.fw-headline', '.entry-title', '.article-title', '.article__title', '.headline', '.itemTitle', '.title', 'h1', 'h2', 'h3']
const articleSelectors = ['div.articletext', 'div.article', 'div.entry-content', 'div.content', 'div.itemFullText', 'div.main-text', 'div.story-fulltext', 'div.td-post-content', 'div.article__body', '.cntTxt']
const timeSelectors = ['.time', '.date', 'time']
// const imageSelectors = ['.image', '.img', 'img', 'picture']

async function fetchArticlesFromWebsites() {
    const articles = [];

    try {
        console.log("STARTED FETCHING..")
        const browser = await chromium.launch();
        const context = await browser.newContext();
        const page = await context.newPage();

        for (const website of websites) {
            console.log("NOW FETCHING WEBPAGE : ", website)

            for (const category in website.categories) {
                await page.goto(website.categories[category], {waitUntil: 'domcontentloaded'});
                let articleLinks = [];

                //Fetch websites url
                for (const startingSelector of startingArticleLinks) {
                    const selector = `${startingSelector} a`;
                    articleLinks = await page.$$eval(selector, links => links.map(link => link.href));

                    if (articleLinks.length > 0) {
                        break;
                    }
                }

                for (let i = 0; i < Math.min(articleLinks.length, 5); i++) {
                    const articleData = await scrapeArticle(page, articleLinks[i]);
                    articles.push(articleData); // Pushing articles into the array declared outside the loop
                }
            }
        }

        await browser.close();
        console.log("FINISHED FETCHING")
    } catch (error) {
        console.error('Error fetching articles:', error);
    }

    return articles;
}


async function scrapeArticle(page, articleUrl) {
    const articleData = {
        url: articleUrl,
        title: '',
        content: '',
        time: '',
        image: '',
        source: '',
    };

    try {
        if (articleUrl) {
            await page.goto(articleUrl, {waitUntil: 'domcontentloaded'});

            //Fetch Title
            for (const selector of titleSelectors) {
                articleData.title = await page.$eval(selector, el => el.textContent.trim()).catch(() => '');
                if (articleData.title) break;
            }

            //Fetch Article
            for (const selector of articleSelectors) {
                articleData.content = await page.$eval(selector, el => el.textContent.trim()).catch(() => '');
                if (articleData.content) {
                    articleData.content = articleData.content.replace(/\n/g, '').replace(/\t/g, '');
                    break;
                }
            }
            //Fetch Time
            let foundTimestamp = false
            for (const selector of timeSelectors) {
                articleData.time = await page.$eval(selector, el => el.getAttribute('datetime')).catch(() => '');
                if (articleData.time) {
                    foundTimestamp = true
                    break;
                }
                if (!foundTimestamp) {
                    articleData.time = new Date().toISOString()
                }
            }

            // for (const selector of imageSelectors) {
            //     articleData.image = await page.$eval(selector, el => el.getAttribute('src')).catch(() => '');
            //     if (articleData.image) break;
            // }

            //Fetch Image
            const images = await page.$$eval('img', imgs => imgs.map(img => ({
                src: img.getAttribute('src'),
                alt: img.getAttribute('alt')
            })));

            for (const img of images) {
                const excludedWords = ['logo', 'svg', 'avatar', 'profile', 'profiles', 'webp', 'gif'];
                const shouldExclude = excludedWords.some(word => img.src.includes(word) || (img.alt && img.alt.includes(word)));
                if (!shouldExclude) {
                    articleData.image = img.src;
                    break;
                }
            }


            articleData.source = await page.$eval('meta[property="og:site_name"]', el => el.content.trim()).catch(() => '')
        }
    } catch (error) {
        console.error('Error scraping article:', error);
    }

    return articleData;
}


module.exports = {fetchArticlesFromWebsites}
