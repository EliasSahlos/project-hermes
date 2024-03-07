import { useFilters } from "@/context/filters-context"
import { usePagination } from "@/context/pagination-context"
import axios from "axios"
import Image from "next/image"
import { useEffect, useState } from "react"


function CategoriesFiltersBlock() {
    const [articleCategories, setArticleCategories] = useState<ArticleCategory[]>([])
    const [selectedCategories, setSelectedCategories] = useState<ArticleCategory[]>([])

    const { selectedArticleCategories, setSelectedArticleCategories } = useFilters()

    useEffect(() => {
        fetchArticleCategories();
    }, []);

    useEffect(() => {
        setSelectedArticleCategories(selectedCategories);
    }, [selectedCategories, setSelectedArticleCategories]);


    // Fetch ArticleCategories from API
    async function fetchArticleCategories() {
        axios.get('http://localhost:3001/api/article-categories/all')
            .then((response) => {
                setArticleCategories(response.data.articleCategories)
            })
    }

    // IF articleCategories includes selected ArticleCategory, add it to array ELSE remove it
    function articleCategoryFilterClickHandler(articleCategory: any) {
        if (!selectedCategories.includes(articleCategory.value)) {
            setSelectedCategories(prevSelectedCategories => [...prevSelectedCategories, articleCategory.value]);
        } else {
            setSelectedCategories(prevSelectedCategories =>
                prevSelectedCategories.filter((item) => item !== articleCategory.value)
            );
        }
    }

    //Changes categoryBlock Styling if the specific category is selected
    function categoryBlockStyle(articleCategory: { value: any }) {
        if (selectedCategories.includes(articleCategory.value)) {
            return 'w-32 h-32 border-2 rounded shadow-md relative overflow-hidden p-4 scale-110 ease-in duration-200 cursor-pointer'
        } else {
            return 'w-32 h-32 border-2 rounded shadow-md relative overflow-hidden p-4 hover:scale-110 ease-in duration-200 cursor-pointer'
        }
    }

    //Add purple opacity if the specific category is selected
    function categoryBlockOpacityStyle(articleCategory: { value: any }) {
        if (selectedCategories.includes(articleCategory.value)) {
            return 'absolute inset-0 bg-purple-300 opacity-70 z-10'
        } else {
            return 'absolute inset-0 bg-white opacity-70 z-10'
        }
    }

    return (
        <div className="grid grid-cols-2 gap-x-7 gap-y-4 lg:gap-x-4 lg:gap-y-2">
            {articleCategories.map((articleCategory) => (
                <div
                    className={categoryBlockStyle(articleCategory)}
                    key={articleCategory.value}
                    onClick={() => articleCategoryFilterClickHandler(articleCategory)}
                >
                    <div className={categoryBlockOpacityStyle(articleCategory)}></div>
                    <Image
                        className="absolute inset-0 object-cover transform scale-110"
                        src={articleCategory.image}
                        alt='broken-img'
                        layout="fill"
                    />
                    <h1 className="absolute inset-0 flex justify-center items-center font-bold z-20">{articleCategory.title}</h1>
                </div>
            ))}
        </div>
    )
}

export default CategoriesFiltersBlock