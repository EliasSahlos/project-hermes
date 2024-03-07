import { usePagination } from "@/context/pagination-context";
import { Pagination } from "@mui/material";

function PaginationBlock() {
    const { pages, currentPage, setCurrentPage } = usePagination()

    function changePageHandler(event: any, page: number) {
        setCurrentPage(page)
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    return (
        <Pagination color="secondary" count={pages} page={currentPage} onChange={changePageHandler} />
    )
}

export default PaginationBlock