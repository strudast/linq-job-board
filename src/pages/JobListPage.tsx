import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getJobs } from '../lib/api'
import JobCard from '../components/JobCard'
import SearchBar from '../components/SearchBar'
import JobFilters, { type SortOrder } from '../components/JobFilters'
import { useDebounce } from '../hooks/useDebounce'
import Pagination from '../components/Pagination'

const PAGE_SIZE = 10

function JobListPage() {
  const [searchParams, setSearchParams] = useSearchParams()

  // Read filter state from the URL.
  const urlSearch = searchParams.get('q') ?? ''
  const sort = (searchParams.get('sort') as SortOrder) ?? 'desc'
  const recruitingOnly = searchParams.get('recruiting') === 'true'
 const page = Math.max(1, Number(searchParams.get('page')) || 1)

  // Local state for the search input so typing feels instant.
  // The URL only updates after the user stops typing (debounced below).
  const [searchInput, setSearchInput] = useState(urlSearch)
  const debouncedSearch = useDebounce(searchInput, 300)

  // Push the debounced search value into the URL.
  useEffect(() => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        if (debouncedSearch) next.set('q', debouncedSearch)
        else next.delete('q')
        return next
      },
      { replace: true },
    )
  }, [debouncedSearch, setSearchParams])

 // Whenever filters change, jump back to page 1.
  useEffect(() => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        next.delete('page')
        return next
      },
      { replace: true },
    )
    // We intentionally exclude setSearchParams from deps to avoid resetting on every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch, sort, recruitingOnly])

  const updateParam = (key: string, value: string | null) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)
      if (value === null) next.delete(key)
      else next.set(key, value)
      return next
    })
  }

  const { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey: ['jobs', { search: debouncedSearch, sort, recruitingOnly, page }],
    queryFn: () =>
      getJobs({
        search: debouncedSearch || undefined,
        sortBy: 'publishedAt',
        order: sort,
        isActiveRecruiting: recruitingOnly ? true : undefined,
        page,
        limit: PAGE_SIZE,
      }),
  })

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white px-6 py-8">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold text-slate-900">Jobs</h1>
          <p className="mt-1 text-sm text-slate-500">
        {data ? `Showing ${data.length} position${data.length === 1 ? '' : 's'}` : 'Loading…'}
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-3xl space-y-6 px-6 py-8">
        <SearchBar value={searchInput} onChange={setSearchInput} />

        <JobFilters
          sort={sort}
          recruitingOnly={recruitingOnly}
          onSortChange={(value) => updateParam('sort', value)}
          onRecruitingChange={(value) => updateParam('recruiting', value ? 'true' : null)}
        />

        {isLoading && <p className="text-slate-500">Loading jobs…</p>}

        {isError && (
          <p className="text-red-600">Something went wrong: {error.message}</p>
        )}

        {data && data.length === 0 && (
          <p className="text-slate-500">No jobs match your filters.</p>
        )}

        {data && data.length > 0 && (
          <>
          <ul className={`space-y-3 transition-opacity ${isFetching ? 'opacity-60' : ''}`}>
            {data.map((job) => (
              <li key={job.id}>
                <JobCard job={job} />
              </li>
            ))}
          </ul>
          <Pagination
              page={page}
              hasNextPage={data.length === PAGE_SIZE}
              onPageChange={(next) => updateParam('page', String(next))}
            />
            </>
        )}
      </main>
    </div>
  )
}

export default JobListPage