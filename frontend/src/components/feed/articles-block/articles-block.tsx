import SpinnerLoading from "@/components/shared/spinner-loading/spinner-loading"
import { PaginationProvider } from "@/context/pagination-context"
import ArticlesCard from "./articles-card/articles-card"
import PaginationBlock from "./pagination-block/pagination-block"
import { useFilters } from "@/context/filters-context"

function ArticlesBlock({ articles, isFiltersOpen, isLoading }: ArticlesBlockProps) {
    const { filteredArticles } = useFilters()

    return (
        <>
            {filteredArticles &&
                <PaginationProvider articles={filteredArticles}>
                    <div className={isFiltersOpen ? "hidden md:block md:w-full" : "w-full"}>
                        {isLoading && <SpinnerLoading />}
                        {!isLoading && <ArticlesCard />}
                        {!isLoading &&
                            <div className="flex justify-center items-center mb-8">
                                <PaginationBlock />
                            </div>
                        }
                    </div>
                </PaginationProvider>}
        </>
    )
}

export default ArticlesBlock