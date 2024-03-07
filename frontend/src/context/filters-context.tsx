'use client'
import axios from "axios"
import { error } from "console"
import { ReactNode, createContext, useContext, useEffect, useState } from "react"

interface FiltersContextProps {
    filterArticles: () => void
    filteredArticles: Article[] | null
    selectedArticleCategories: ArticleCategory[]
    setSelectedArticleCategories: (categories: ArticleCategory[]) => void
}

const FiltersContext = createContext<FiltersContextProps | undefined>(undefined)

export function FiltersProvider({ children, articles }: { children: ReactNode, articles: Article[] }) {
    const [selectedArticleCategories, setSelectedArticleCategories] = useState<ArticleCategory[]>([])
    const [filteredArticles, setFilteredArticles] = useState<Article[] | null>(null)

    useEffect(() => {
        filterArticles()
    }, [selectedArticleCategories, articles])

    function filterArticles() {
        try {
            if (selectedArticleCategories.length === 0) {
                setFilteredArticles(articles)
            } else {
                axios.post('http://localhost:3001/api/articles/filter', {
                    categories: selectedArticleCategories
                })
                    .then((response) => {
                        const reversedArticles = response.data.reverse()
                        setFilteredArticles(reversedArticles);
                    })
                    .catch(error => {
                        console.error('Error filtering articles:', error);
                    });
            }
        } catch (error) {
            console.error('Error filtering articles:', error);
        }
    }


    const contextValues: FiltersContextProps = {
        filterArticles,
        filteredArticles,
        selectedArticleCategories,
        setSelectedArticleCategories,
    }

    return <FiltersContext.Provider value={contextValues}>{children}</FiltersContext.Provider>
}

export function useFilters() {
    const context = useContext(FiltersContext)
    if (!context) {
        throw new Error("useFilters must be used within an FiltersProvider");
    }
    return context
}
