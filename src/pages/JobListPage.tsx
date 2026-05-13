import {useQuery} from '@tanstack/react-query'
import { getJobs } from '../lib/api'
import JobCard from '../components/JobCard'

function JobListPage() {
    const {data, isLoading, isError, error} = useQuery({
        queryKey: ['jobs'],
        queryFn: ()=>getJobs()
    })

    if (isLoading) return <div>Loading jobs...</div>
    if (isError) return <div>Something went wrong: {error.message}</div>
    if (!data || data.length === 0 ) return <div>No jobs found</div>
    
    return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white px-6 py-8">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold text-slate-900">Jobs</h1>
          <p className="mt-1 text-sm text-slate-500">
            {data ? `${data.length} positions found` : 'Loading…'}
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-8">
        {isLoading && <p className="text-slate-500">Loading jobs…</p>}

        {isError && (
          <p className="text-red-600">Something went wrong: {error.message}</p>
        )}

        {data && data.length === 0 && (
          <p className="text-slate-500">No jobs found.</p>
        )}

        {data && data.length > 0 && (
          <ul className="space-y-3">
            {data.map((job) => (
              <li key={job.id}>
                <JobCard job={job} />
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  )
}

export default JobListPage