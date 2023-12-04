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
            imageSelector: 'div.article-wrapper img:first-child'
        },
        politics: {
            url: 'https://www.enikos.gr/politics/',
            articleSelector: 'h2 a',
            titleSelector: 'div.content-item h1',
            contentSelector: 'div.articletext',
            timeSelector: 'time',
            imageSelector: 'div.article-wrapper img:first-child'
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
            imageSelector: 'picture.main-image img'
        },
        politics: {
            url: 'https://www.newsbomb.gr/politikh',
            articleSelector: 'h3 a',
            titleSelector: 'h1',
            contentSelector: 'div.main-text',
            timeSelector: 'time',
            imageSelector: 'picture.main-image img'
        },
    },
    cnn: {
        economy: {
            url: 'https://www.cnn.gr/oikonomia',
            articleSelector: 'div.gtr a.item-link',
            titleSelector: 'h1.main-title',
            contentSelector: 'div.story-fulltext',
            timeSelector: 'time',
            imageSelector: 'picture.main-image img'
        },
        politics: {
            url: 'https://www.cnn.gr/politiki',
            articleSelector: 'div.gtr a.item-link',
            titleSelector: 'h1.main-title',
            contentSelector: 'div.story-fulltext',
            timeSelector: 'time',
            imageSelector: 'picture.main-image img'
        },
    },
};

module.exports = websites;