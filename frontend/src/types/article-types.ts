interface Article {
    _id: any
    uuid: any
    url: string
    title: string
    content: string
    time: string
    image: string
    source: string
}

interface ArticlesProps {
    articles: Article[]
}