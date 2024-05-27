import { PaginationProps } from "./types";

export default function Pagination({ totalPage, currentPage, handlePageChange }: PaginationProps) {
    let maxPageButtons = 10;

    // maxPageButtons for smartphone
    if (window.innerWidth <= 480) {
        maxPageButtons = 5;
    }

    const halfMaxButtons = Math.floor(maxPageButtons / 2);

    // Calculate the range of page buttons to display
    let startPage = Math.max(currentPage - halfMaxButtons, 1);
    let endPage = Math.min(startPage + maxPageButtons - 1, totalPage);

    if (endPage - startPage + 1 < maxPageButtons) {
        startPage = Math.max(endPage - maxPageButtons + 1, 1);
    }

    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    return (
        <>
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`hover:bg-[#F4F4F4] text-[#606266] text-xl font-medium disabled:opacity-20 rounded-full w-10 h-10 mr-2`}
            >
                {"<"}
            </button>
            {
                pageNumbers.map(page => (
                    <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={
                            page === currentPage ?
                                "bg-[#F3483E] text-white text-xl font-medium rounded-full w-10 h-10 mr-2"
                                :
                                "hover:bg-[#F4F4F4] text-[#606266] font-medium rounded-full w-10 h-10 mr-2"
                        }
                    >
                        {page}
                    </button>
                ))
            }
            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPage}
                className={`hover:bg-[#F4F4F4] text-[#606266] text-xl font-medium disabled:opacity-20 rounded-full w-10 h-10`}
            >
                {">"}
            </button>
        </>
    );
};