import Link from "next/link"
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { usePagination } from "@/context/pagination-context";

function ArticlesCard() {
    const { currentPosts } = usePagination()

    function formatDate(isoDate: string, locale: string = "en-UK"): string {
        const date: Date = new Date(isoDate)
        const options: Intl.DateTimeFormatOptions = { month: "short", day: "numeric", weekday: "long", year: "numeric" }
        return date.toLocaleDateString(locale, options)
    }

    return (
        <div>
            <div className="flex justify-center items-center md:px-6">
                <div className="mb-6">
                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {currentPosts.map((article) => (
                            <div key={article.uuid} className="relative h-[270px] rounded overflow-hidden">
                                <Link href={`/feed/${article.uuid}`}>
                                    <img
                                        src={article.image}
                                        alt='broken-img'
                                        className="w-full h-full bg-cover"
                                    />
                                    <div className="absolute top-0 left-0 w-full h-[12%] bg-white/30 backdrop-blur-lg z-50">
                                        <div className="flex justify-between items-center px-2 py-1">
                                            <h1 className="text-white text-sm">{article.source}</h1>
                                            <div className="text-white text-sm hover:scale-110 ease-in duration-200 cursor-pointer">
                                                <BookmarkBorderIcon />
                                            </div>
                                        </div>

                                    </div>
                                    <div
                                        className="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-[rgba(0,0,0,0.4)] bg-fixed z-40">
                                        <div className="flex h-full items-end justify-start">
                                            <div className="m-6 text-white">
                                                <h5 className="mb-3 text-lg font-bold">{article.title}</h5>
                                                <p className="text-xs">
                                                    Published <u>{formatDate(article.time)}.</u>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="absolute top-0 right-0 bottom-0 left-0 h-full w-full hover:bg-[rgba(256,256,256,0.2)] ease-in duration-150"></div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div >
    )
}

export default ArticlesCard

