import {useQuery} from '@tanstack/react-query'
import { getJobs } from '../lib/api'

function JobListPage() {
    const {data, isLoading, isError, error} = useQuery({
        queryKey: ['jobs'],
        queryFn: ()=>getJobs()
    })

    if (isLoading) return <div>Loading jobs...</div>
    if (isError) return <div>Something went wrong: {error.message}</div>
    if (!data || data.length === 0 ) return <div>No jobs found</div>
    
    return (
        <div>
            <h1 className="text-3xl font-bold text-blue-600">Job listings</h1>
        </div>
            )
}

export default JobListPage