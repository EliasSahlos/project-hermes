'use client'
import { useParams } from "next/navigation"

function CategorizedArticles() {
    const { category } = useParams()

    console.log('category:', category);

    return (
        <div>

        </div>
    )
}

export default CategorizedArticles