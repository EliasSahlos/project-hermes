'use client'
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

function ArticleSinglePage() {
    const { id } = useParams();
    const [article, setArticle] = useState<Article>();

    useEffect(() => {
        fetchArticleById(id)
    }, [id]);

    async function fetchArticleById(articleId: any) {
        try {
            const response = await axios.get(`http://localhost:3001/api/articles/${articleId}`);
            setArticle(response.data);
        } catch (error) {
            console.error('Error fetching article:', error);
        }
    }

    function formatDate(isoDate: string, locale: string = "en-US"): string {
        const date: Date = new Date(isoDate)
        const options: Intl.DateTimeFormatOptions = { month: "short", day: "numeric", weekday: "long" }
        return date.toLocaleDateString(locale, options)
    }

    return (
        <div className='mt-28 xl:mx-40 p-4'>
            <div className="flex justify-center items-center">
                <h1 className="text-4xl font-semibold text-justify">{article?.title}</h1>
            </div>
            <div className="flex justify-center items-center mt-10">
                {article?.image && <Image className="rounded-md " src={article.image} alt="broken-article-img" width={800} height={700} />}
            </div>
            <div className="flex flex-row mt-4">
                <div className="mx-4">
                    {article?.time && formatDate(article.time)}
                </div>
                <div className="mx-4">
                    {article?.source}
                </div>
            </div>
            <div className="my-10">
                <p className="text-justify">{article?.content}</p>
            </div>
        </div>
    );
}

export default ArticleSinglePage;
