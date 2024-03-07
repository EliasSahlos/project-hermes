'use client'
import { useEffect, useState } from "react"
import axios from "axios"
import { PaginationProvider } from "@/context/pagination-context"
import PaginationBlock from "@/components/feed/articles-block/pagination-block/pagination-block"
import SpinnerLoading from "@/components/shared/spinner-loading/spinner-loading"
import SearchIcon from '@mui/icons-material/Search';
import { useAuth } from "@/context/auth-context"
import { TextField } from "@mui/material"
import Image from "next/image"
import ArticlesCard from "@/components/feed/articles-block/articles-card/articles-card"
import ArticlesBlock from "@/components/feed/articles-block/articles-block"
import FiltersBlock from "@/components/feed/filters-block/filters-block"
import { FiltersProvider } from "@/context/filters-context"

function FeedPage() {
    const [articles, setArticles] = useState<Article[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isFilterOpened, setIsFilterOpened] = useState<boolean>(false);

    const { userInfo } = useAuth()

    useEffect(() => {
        fetchData()
    }, [])

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
                        const reversedResults = response.data.articles.reverse()
                        setArticles(reversedResults);
                        localStorage.setItem('storedArticles', JSON.stringify(reversedResults))
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
        const expired = currentTime - timestamp > 60000; // 1 minute in milliseconds
        return { data, expired };
    }

    function searchIconClickHandler() {
        setIsFilterOpened(!isFilterOpened)
    }

    console.log('Open Filter:', isFilterOpened);


    return (
        <div className="flex">
            <div className="px-4 mt-20 flex-1">
                <div className="flex justify-between items-center my-2 md:mx-7 2xl:mx-[400px">
                    <div>
                        <h1 className="inline-block text-5xl font-extrabold bg-gradient-to-r from-[#5B4EF0] to-[#D5B4E9] text-transparent bg-clip-text py-1">
                            News Today
                        </h1>
                    </div>
                    <div
                        className="bg-purple-200 p-2 rounded-md cursor-pointer hover:bg-purple-400 ease-in duration-200"
                        onClick={searchIconClickHandler}
                    >
                        <SearchIcon fontSize="medium" />
                    </div>
                </div>
                <div className="flex">
                    <FiltersProvider articles={articles}>
                        {/* Articles Block */}
                        <ArticlesBlock articles={articles} isFiltersOpen={isFilterOpened} isLoading={isLoading} />
                        {/* FiltersBlock */}
                        <FiltersBlock isFiltersOpen={isFilterOpened} />
                    </FiltersProvider>
                </div>
            </div>
        </div>
    );
}

export default FeedPage;
