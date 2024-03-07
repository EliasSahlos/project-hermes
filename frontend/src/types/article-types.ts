interface Article {
    _id: any
    uuid: any
    url: string
    title: string
    content: string
    time: string
    image: string
    source: string
    category: string
}

interface ArticlesProps {
    articles: Article[]
}

interface ArticlesBlockProps {
    articles: Article[]
    isFiltersOpen: boolean
    isLoading: boolean
}
