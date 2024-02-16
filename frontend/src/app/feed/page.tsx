'use client'
import mockData from "@/mock-articles.json"
import FeedTitle from "@/components/feed/feed-title/feed-title"
import { useAuth } from "@/context/auth-context"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Image from "next/image"
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import Grid from '@mui/material/Grid';
import Link from "next/link"

interface Articles {
    url: string
    title: string
    content: string
    time: string
    image: string
    source: string
}

function FeedPage() {
    const [articles, setArticles] = useState<Articles[]>([])

    const { isAuthenticated } = useAuth()
    const router = useRouter()

    useEffect(() => {
        setArticles(mockData.articles)
    }, [])

    console.log(articles);

    return (
        <div className="flex flex-col px-4">
            <div className="flex mb-2">
                <FeedTitle />
            </div>
            <Grid container spacing={2}>
                {articles.map((article, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
                        <div className="relative border-[1px] border-black rounded shadow-md p-4 h-[180px] md:h-[250px]">
                            <div className="absolute bg-black/5 backdrop-blur-lg w-full left-0 top-0 h-[40px]">
                                <div className="flex">
                                    <h1 className="font-semibold flex-1 p-2">{article.source}</h1>
                                    <div className="flex justify-end items-center p-2 hover:scale-110 ease-in duration-200 cursor-pointer">
                                        <BookmarkBorderIcon />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-10 md:mt-28 py-2">
                                <h1 className="text-bold">{article.title}</h1>
                                <p className="text-sm mt-3">{article.content.slice(0, 50)}...</p>
                            </div>
                        </div>
                    </Grid>
                ))}
            </Grid>
        </div>
    )
}

export default FeedPage
