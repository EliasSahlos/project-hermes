'use client'
import { ReactNode, createContext, useContext, useState } from "react"

interface PaginationContextProps {
    currentPage: number
    setCurrentPage: (page: number) => void
    currentPosts: Article[]
    pages: number
}

const PaginationContext = createContext<PaginationContextProps | undefined>(undefined)

export function PaginationProvider({ children, articles }: { children: ReactNode, articles: Article[] }) {
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [postsPerPage, setPostsPerPage] = useState<number>(30)

    const lastPostIndex = currentPage * postsPerPage
    const firstPostIndex = lastPostIndex - postsPerPage
    const currentPosts = articles.slice(firstPostIndex, lastPostIndex)

    let pages = Math.ceil(articles.length / postsPerPage)


    const contextValues: PaginationContextProps = {
        currentPage,
        setCurrentPage,
        currentPosts,
        pages
    }

    return <PaginationContext.Provider value={contextValues}>{children}</PaginationContext.Provider>
}

export function usePagination() {
    const context = useContext(PaginationContext)
    if (!context) {
        throw new Error("usePagination must be used within an PaginationProvider");
    }
    return context
}