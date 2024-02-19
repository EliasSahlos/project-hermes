'use client'
import mockData from "@/mock-articles.json"
import { useEffect, useState } from "react"
import ArticlesCard from "@/components/feed/articles-card/articles-card"
import PaginationBlock from "@/components/feed/pagination-block/pagination-block"
import { PaginationProvider } from "@/context/pagination-context"
import FeedTitle from "@/components/feed/feed-title/feed-title"

function FeedPage() {
    const [articles, setArticles] = useState<Article[]>([])

    useEffect(() => {
        setArticles(mockData.articles)
    }, [])

    return (
        <PaginationProvider articles={articles}>
            <div className="px-4">
                <div className="my-6 px-6">
                    <FeedTitle />
                </div>
                <ArticlesCard />
                <div className="flex justify-center items-center mb-8">
                    <PaginationBlock />
                </div>
            </div>
        </PaginationProvider>
    )
}

export default FeedPage
