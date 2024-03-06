import CategoriesFiltersBlock from "./categories-filters-block"

function FiltersBlock({ isFiltersOpen }: FiltersBlockProps) {
    return (
        <div className={isFiltersOpen ? "w-full md:w-[50%] lg:w-[30%] px-2 border-2 rounded-md" : "hidden"}>
            {/* Categories */}
            <div>
                <div className="flex justify-center items-center my-6 border-b-2 w-full py-2">
                    <h1 className="text-2xl text-center">Categories</h1>
                </div>
                <div className="flex justify-center items-center">
                    <CategoriesFiltersBlock />
                </div>
            </div>
            {/* Sources */}
            <div>
                <div className="flex justify-center items-center my-6 border-b-2 w-full py-2">
                    <h1 className="text-2xl text-center">Sources</h1>
                </div>
            </div>
        </div>
    )
}

export default FiltersBlock