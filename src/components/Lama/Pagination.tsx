'use client'
import { ITEM_PER_PAGE } from "@/lib/settings";
import { useRouter } from "next/navigation";

const Pagination = ({ page, count }: { page: number, count: number }) => {

    const router = useRouter()

    const hasPrevious = ITEM_PER_PAGE * (page - 1) > 0;
    const hasNext = ITEM_PER_PAGE * (page - 1) + ITEM_PER_PAGE < count;

    const changePage = (newPage: number) => {
        const params = new URLSearchParams(window.location.search)
        params.set("page", newPage.toString())
        router.push(`${window.location.pathname}?${params}`)
    }
    return (
        <>
            <nav className="flex justify-center items-center gap-x-1 bg-white mt-2 p-2 rounded-b" aria-label="Pagination">

                <button disabled={!hasPrevious} type="button" className="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed" aria-label="Previous" onClick={() => { changePage(page - 1) }}>
                    <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m15 18-6-6 6-6"></path>
                    </svg>
                    <span className="sr-only">Previous</span>
                </button>

                <div className="flex items-center gap-x-1">
                    {Array.from({ length: Math.ceil(count / ITEM_PER_PAGE) },
                        (_, index) => {
                            const pageIndex = index + 1;
                            return <button
                                key={pageIndex}
                                type="button" className={`min-h-[38px] min-w-[38px] flex justify-center items-center  text-gray-800 py-2 px-3 text-sm rounded-lg focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed ${page === pageIndex ? "bg-orange-300" : ""}`}
                                aria-current="page"
                                onClick={() => { changePage(pageIndex) }}
                            >
                                {pageIndex}
                            </button>
                        }
                    )}
                </div>

                <button
                    disabled={!hasNext}
                    type="button" className="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed" aria-label="Next" onClick={() => { changePage(page + 1) }}>
                    <span className="sr-only">Next</span>
                    <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m9 18 6-6-6-6"></path>
                    </svg>
                </button>

            </nav>
        </>
    );
}
export default Pagination;
