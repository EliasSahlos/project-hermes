'use client'
import { useEffect, useState } from "react"
import axios from "axios"
import { PaginationProvider } from "@/context/pagination-context"
import ArticlesCard from "@/components/feed/articles-card/articles-card"
import PaginationBlock from "@/components/feed/pagination-block/pagination-block"
import FeedTitle from "@/components/feed/feed-title/feed-title"
import SpinnerLoading from "@/components/shared/spinner-loading/spinner-loading"
import FilterAltIcon from '@mui/icons-material/FilterAlt';

function FeedPage() {
    const [articles, setArticles] = useState<Article[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        fetchData()
    }, [])

    async function fetchData() {
        try {
            const storedData = localStorage.getItem('storedArticles')
            if (storedData) {
                const retrievedArray = JSON.parse(storedData)
                setArticles(retrievedArray)
                setIsLoading(false)
            } else {
                axios.get('http://localhost:3001/api/articles/all')
                    .then((response) => {
                        setArticles(response.data.articles);
                        localStorage.setItem('storedArticles', JSON.stringify(response.data.articles))
                        setIsLoading(false)
                    })
                    .catch((error) => {
                        console.error('Error fetching articles:', error);
                        setIsLoading(false)
                    });
            }
        } catch (error) {
            console.error(error)
            setIsLoading(false)
        }
    }

    return (
        <PaginationProvider articles={articles}>
            <div className="px-4">
                <div className="flex justify-between items-center my-6 md:mx-7 2xl:mx-[400px]">
                    <div>
                        <FeedTitle />
                    </div>
                    <div className="bg-purple-300/80 rounded shadow-md p-1 hover:scale-110 ease-in duration-200 cursor-pointer">
                        <FilterAltIcon fontSize="large" />
                    </div>
                </div>
                {isLoading && <SpinnerLoading />}
                {!isLoading && <ArticlesCard />}
                <div className="flex justify-center items-center mb-8">
                    <PaginationBlock />
                </div>
            </div>
        </PaginationProvider>
    )
}

export default FeedPage
