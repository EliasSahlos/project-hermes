interface Article {
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