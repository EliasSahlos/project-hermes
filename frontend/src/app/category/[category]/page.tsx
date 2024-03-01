'use client'
import { useEffect, useState } from "react"
import axios from "axios"
import { PaginationProvider } from "@/context/pagination-context"
import ArticlesCard from "@/components/feed/articles-card/articles-card"
import PaginationBlock from "@/components/feed/pagination-block/pagination-block"
import SpinnerLoading from "@/components/shared/spinner-loading/spinner-loading"
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { useParams } from "next/navigation"

function CategorizedArticles() {
    const [articles, setArticles] = useState<Article[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const { category } = useParams()

    useEffect(() => {
        fetchArticleByCategory(category)
    }, [])

    console.log("Articles when fetch:", articles);

    async function fetchArticleByCategory(category: any) {
        setIsLoading(true)
        try {
            const response = await axios.get(`http://localhost:3001/api/articles/category/${category}`);
            setArticles(response.data);
            setIsLoading(false)
        } catch (error) {
            console.error('Error fetching article:', error);
            setIsLoading(false)
        }
    }

    return (
        <PaginationProvider articles={articles}>
            <div className="px-4 mt-20">
                <div className="flex justify-between items-center my-6 md:mx-7 2xl:mx-[400px]">
                    <div>
                        <h1 className="inline-block text-5xl font-extrabold bg-gradient-to-r from-[#5B4EF0] to-[#D5B4E9] text-transparent bg-clip-text capitalize py-1">
                            {category}
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

export default CategorizedArticles
