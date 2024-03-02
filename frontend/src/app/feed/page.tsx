'use client'
import { useEffect, useState } from "react"
import axios from "axios"
import { PaginationProvider } from "@/context/pagination-context"
import ArticlesCard from "@/components/feed/articles-card/articles-card"
import PaginationBlock from "@/components/feed/pagination-block/pagination-block"
import SpinnerLoading from "@/components/shared/spinner-loading/spinner-loading"
import SearchIcon from '@mui/icons-material/Search';
import { useAuth } from "@/context/auth-context"
import { TextField } from "@mui/material"
import Image from "next/image"

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
        const expired = currentTime - timestamp > 60000; // 1 minute in milliseconds
        return { data, expired };
    }

    function searchIconClickHandler() {
        setIsFilterOpened(!isFilterOpened)
    }

    console.log('Open Filter:', isFilterOpened);


    return (
        <PaginationProvider articles={articles}>
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
                        {/* Articles Block */}
                        <div className={isFilterOpened ? "hidden md:block md:w-full" : "w-full"}>
                            {isLoading && <SpinnerLoading />}
                            {!isLoading && <ArticlesCard />}
                            {!isLoading &&
                                <div className="flex justify-center items-center mb-8">
                                    <PaginationBlock />
                                </div>
                            }
                        </div>
                        {/* FiltersBlock */}
                        <div className={isFilterOpened ? "w-full md:w-[50%] lg:w-[30%] px-2 border-2 rounded-md" : "hidden"}>
                            <div className="flex justify-center items-center my-6 border-b-2 w-full py-2">
                                <h1 className="text-2xl text-center">Filters</h1>
                            </div>
                            {/* Categories */}
                            <div className="flex justify-center items-center">
                                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                                    <div className="p-4 border-2 rounded shadow-md relative overflow-hidden w-32 h-32">
                                        <div className="absolute inset-0 bg-white opacity-70 z-10"></div>
                                        <Image
                                            className="absolute inset-0 object-cover transform scale-110"
                                            src='https://whyathens.com/wp-content/uploads/2016/09/Greek-Parliament-Hellenic-Vouli-Chamber-.jpg'
                                            alt='broken-img'
                                            layout="fill"
                                        />
                                        <h1 className="absolute inset-0 flex justify-center items-center font-bold z-20">Politics</h1>
                                    </div>

                                    <div className="p-4 border-2 rounded shadow-md relative overflow-hidden w-32 h-32">
                                        <div className="absolute inset-0 bg-white opacity-70 z-10"></div>
                                        <Image
                                            className="absolute inset-0 object-cover transform scale-110"
                                            src='https://img1.wsimg.com/isteam/ip/69cba915-80dd-4ce2-a7e4-1d6b667d710d/winery1912.jpg'
                                            alt='broken-img'
                                            layout="fill"
                                        />
                                        <h1 className="absolute inset-0 flex justify-center items-center font-bold z-20">Lifestyle</h1>
                                    </div>


                                    <div className="p-4 border-2 rounded shadow-md relative overflow-hidden w-32 h-32">
                                        <div className="absolute inset-0 bg-white opacity-70 z-10"></div>
                                        <Image
                                            className="absolute inset-0 object-cover transform scale-110"
                                            src='https://www.newsit.gr/wp-content/uploads/2024/03/iStock-801479766.jpg'
                                            alt='broken-img'
                                            layout="fill"
                                        />
                                        <h1 className="absolute inset-0 flex justify-center items-center font-bold z-20">Economics</h1>
                                    </div>

                                    <div className="p-4 border-2 rounded shadow-md relative overflow-hidden w-32 h-32">
                                        <div className="absolute inset-0 bg-white opacity-70 z-10"></div>
                                        <Image
                                            className="absolute inset-0 object-cover transform scale-110"
                                            src='https://www.newsit.gr/wp-content/uploads/2024/03/olympiakos-scaled.jpg'
                                            alt='broken-img'
                                            layout="fill"
                                        />
                                        <h1 className="absolute inset-0 flex justify-center items-center font-bold z-20">Sports</h1>
                                    </div>

                                    <div className="p-4 border-2 rounded shadow-md relative overflow-hidden w-32 h-32">
                                        <div className="absolute inset-0 bg-white opacity-70 z-10"></div>
                                        <Image
                                            className="absolute inset-0 object-cover transform scale-110"
                                            src='https://www.newsit.gr/wp-content/uploads/2024/02/iStock-1206796363.jpg'
                                            alt='broken-img'
                                            layout="fill"
                                        />
                                        <h1 className="absolute inset-0 flex justify-center items-center font-bold z-20">Technology</h1>
                                    </div>

                                    <div className="p-4 border-2 rounded shadow-md relative overflow-hidden w-32 h-32">
                                        <div className="absolute inset-0 bg-white opacity-70 z-10"></div>
                                        <Image
                                            className="absolute inset-0 object-cover transform scale-110"
                                            src='https://i.pinimg.com/736x/bb/87/b7/bb87b743b9ed1dc1516a08955fe51842.jpg'
                                            alt='broken-img'
                                            layout="fill"
                                        />
                                        <h1 className="absolute inset-0 flex justify-center items-center font-bold z-20">Health</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PaginationProvider>
    );
}

export default FeedPage;
