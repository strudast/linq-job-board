import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationProps {
    page:number
    hasNextPage:boolean
    onPageChange : (page:number) => void
}

function Pagination(
    {page, hasNextPage,onPageChange}: PaginationProps
) {
    const canGoPrev = page > 1

    return <nav
    aria-label="Pagination"
     className="flex items-center justify-between border-t border-slate-200 pt-4"
    >
         <button
        type="button"
        onClick={() => onPageChange(page - 1)}
        disabled={!canGoPrev}
        className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700 hover:border-slate-300 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-slate-200"
      >
        <ChevronLeft className="h-4 w-4" />
        Previous
      </button>

      <span className="text-sm text-slate-500">Page {page}</span>

      <button
        type="button"
        onClick={() => onPageChange(page + 1)}
        disabled={!hasNextPage}
        className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700 hover:border-slate-300 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-slate-200"
      >
        Next
        <ChevronRight className="h-4 w-4" />
      </button>
        </nav>
}

export default Pagination