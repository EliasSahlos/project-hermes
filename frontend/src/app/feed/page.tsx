'use client'
import { mockData } from "../../mock-articles"
import FeedTitle from "@/components/feed/feed-title/feed-title"
import { useAuth } from "@/context/auth-context"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"


function FeedPage() {
    const [articles, setArticles] = useState<any>([])
    
    const {isAuthenticated} = useAuth()
    const router = useRouter()

    useEffect(() => {
       
    }, [])

    return (
        <div className="flex">
            <div className="p-4">
                <FeedTitle />
            </div>
            <div>

            </div>
        </div>
    )
}

export default FeedPage