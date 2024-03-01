'use client'
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import SpinnerLoading from "@/components/shared/spinner-loading/spinner-loading";
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import { formatDate } from "@/app/formatDate";

function ArticleSinglePage() {
    const { id } = useParams();
    const [article, setArticle] = useState<Article>();
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        fetchArticleById(id)
    }, [id]);

    async function fetchArticleById(articleId: any) {
        setIsLoading(true)
        try {
            const response = await axios.get(`http://localhost:3001/api/articles/id/${articleId}`);
            setArticle(response.data);
            setIsLoading(false)
        } catch (error) {
            console.error('Error fetching article:', error);
            setIsLoading(false)
        }
    }

    return (
        <div className='mt-28 xl:mx-40 p-4'>
            {isLoading && <SpinnerLoading />}
            {!isLoading && article &&
                <div className="bg-white p-4 ">
                    <div className="flex justify-start mb-4">
                        <h2 className="text-gray-500 text-sm capitalize">{article?.source}</h2>
                        <span className="text-purple-500 font-bold mx-1">&gt;</span>
                        <h2 className="font-semibold text-sm capitalize"> {article?.category}</h2>
                    </div>
                    <div className="flex justify-start my-1">
                        <QueryBuilderIcon fontSize="small" />
                        <h2 className="text-sm mx-2">{formatDate(article.time)}</h2>

                    </div>
                    <div className="flex justify-center items-center">
                        <div>
                            <h1 className="text-3xl font-semibold text-justify">{article?.title}</h1>
                        </div>
                    </div>
                    <div className="flex justify-center items-center mt-10">
                        {article?.image && <Image className="" src={article.image} alt="broken-article-img" width={800} height={700} />}
                    </div>
                    <div className="flex flex-row mt-4">
                        <div className="mx-4">
                            {article?.time && formatDate(article.time)}
                        </div>
                        <div className="mx-4">
                            {article?.source}
                        </div>
                    </div>
                    <div className="my-5">
                        <p className="text-justify">{article?.content}</p>
                    </div>
                </div>}
        </div>
    );
}

export default ArticleSinglePage;
