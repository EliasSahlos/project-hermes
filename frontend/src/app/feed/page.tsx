'use client'
import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchIcon from '@mui/icons-material/Search';
import { useAuth } from "@/context/auth-context";
import { FiltersProvider } from "@/context/filters-context";
import ArticlesBlock from "@/components/feed/articles-block/articles-block";
import FiltersBlock from "@/components/feed/filters-block/filters-block";

function FeedPage() {
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isFilterOpened, setIsFilterOpened] = useState(false);

    const { userInfo } = useAuth();

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        try {
            const response = await axios.get('http://localhost:3001/api/articles/all');
            const reversedResults = response.data.articles.reverse();
            setArticles(reversedResults);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching articles:', error);
            setIsLoading(false);
        }
    }

    function searchIconClickHandler() {
        setIsFilterOpened(!isFilterOpened);
    }

    return (
        <div className="flex">
            <div className="px-4 mt-20 flex-1 2xl:mx-6">
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
