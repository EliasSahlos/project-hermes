'use client'
import { useEffect, useState } from "react"
import axios from "axios"
import { PaginationProvider } from "@/context/pagination-context"
import ArticlesCard from "@/components/feed/articles-card/articles-card"
import PaginationBlock from "@/components/feed/pagination-block/pagination-block"
import SpinnerLoading from "@/components/shared/spinner-loading/spinner-loading"
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { useAuth } from "@/context/auth-context"

function FeedPage() {
    const [articles, setArticles] = useState<Article[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const { userInfo } = useAuth()

    useEffect(() => {
        fetchData()
    }, [])

    console.log("Articles when fetch:", articles);


    async function fetchData() {
        try {
            const storedData = localStorage.getItem('storedArticles')
            if (storedData) {
                const { data, expired } = checkCacheExpiration(storedData)
                if (!expired) {
                    const retrievedArray = JSON.parse(storedData)
                    setArticles(retrievedArray)
                    setIsLoading(false)
                    return;
                } else {
                    localStorage.removeItem('storedArticles')
                }
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

    function checkCacheExpiration(cachedData: string) {
        const { timestamp, data } = JSON.parse(cachedData)
        const currentTime = new Date().getTime()
        const expired = currentTime - timestamp > 900000; // 15 minutes in milliseconds
        return { data, expired };
    }

    return (
        <PaginationProvider articles={articles}>
            <div className="px-4 mt-20">
                <div className="flex justify-between items-center my-6 md:mx-7 2xl:mx-[400px]">
                    <div>
                        <h1 className="inline-block text-5xl font-extrabold bg-gradient-to-r from-[#5B4EF0] to-[#D5B4E9] text-transparent bg-clip-text py-1">
                            News Today
                        </h1>
                    </div>
                    <div className="bg-purple-300/80 rounded shadow-md p-1 hover:scale-110 ease-in duration-200 cursor-pointer">
                        <FilterAltIcon fontSize="large" />
                    </div>
                </div>
                {isLoading && <SpinnerLoading />}
                {!isLoading && <ArticlesCard />}
                {!isLoading &&
                    <div className="flex justify-center items-center mb-8">
                        <PaginationBlock />
                    </div>
                }
            </div>
        </PaginationProvider>
    )
}

export default FeedPage
