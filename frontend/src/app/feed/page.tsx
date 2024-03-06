'use client'
import { useEffect, useState } from "react";
import axios from "axios";
import SearchIcon from '@mui/icons-material/Search';
import { useAuth } from "@/context/auth-context";
import FiltersBlock from "@/components/feed/filters-block/filters-block";
import { FiltersProvider, useFilters } from "@/context/filters-context";
import ArticlesBlock from "@/components/feed/articles-block/articles-block";

function FeedPage() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isFiltersOpen, setIsFiltersOpen] = useState<boolean>(false);

    const { userInfo } = useAuth();

    useEffect(() => {
        fetchData();
    }, []);

    // Fetch All Articles
    async function fetchData() {
        try {
            const cachedData = localStorage.getItem('cachedArticles');
            if (cachedData) {
                const { data, timestamp } = JSON.parse(cachedData);
                if (isCacheExpired(timestamp)) {
                    localStorage.removeItem('cachedArticles');
                } else {
                    setArticles(data);
                    setIsLoading(false);
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
            console.error('Error fetching articles:', error);
            setIsLoading(false);
        }
    }

    // Checks if Cache is expired (After 1 minute)
    function isCacheExpired(timestamp: number) {
        const currentTime = new Date().getTime();
        if (currentTime - timestamp > 1 * 60 * 1000) { //1 Minute in milliseconds
            return true
        } else {
            return false
        }
    }

    // Cache articles to localStorage
    function cacheArticles(articles: Article[]) {
        const timestamp = new Date().getTime();
        const data = { data: articles, timestamp };
        localStorage.setItem('cachedArticles', JSON.stringify(data));
    }

    // Opens-Close filter block
    function searchIconClickHandler() {
        setIsFiltersOpen(!isFiltersOpen);
    }

    return (
        <>
            {articles &&
                <FiltersProvider articles={articles}>
                    <div className="flex">
                        <div className="px-4 mt-20 flex-1">
                            <div className="flex justify-between items-center my-2 md:mx-7">
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
                                <ArticlesBlock articles={articles} isFiltersOpen={isFiltersOpen} isLoading={isLoading} />
                                <FiltersBlock isFiltersOpen={isFiltersOpen} />
                            </div>
                        </div>
                    </div>

                </FiltersProvider >
            }
        </>
    );
}

export default FeedPage;
