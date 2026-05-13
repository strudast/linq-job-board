import type { Job } from './types'

const BASE_URL = 'https://69a17dae2e82ee536fa15e5d.mockapi.io/api'

export interface GetJobsParams {
  search?: string
  isActiveRecruiting?: boolean
  sortBy?: 'publishedAt'
  order?: 'asc' | 'desc'
  page?: number
  limit?: number
}

export async function getJobs(params: GetJobsParams = {}): Promise<Job[]> {
  const searchParams = new URLSearchParams()

  // MockAPI filters fields by passing the field name as the query key (e.g. `?title=react`
  // performs a substring match on the `title` field). There is no generic `?search=` param.
  if (params.search) searchParams.set('title', params.search)

  if (params.isActiveRecruiting !== undefined) {
    searchParams.set('isActiveRecruiting', String(params.isActiveRecruiting))
  }
  if (params.sortBy) searchParams.set('sortBy', params.sortBy)
  if (params.order) searchParams.set('order', params.order)
  if (params.page) searchParams.set('page', String(params.page))
  if (params.limit) searchParams.set('limit', String(params.limit))

  const url = `${BASE_URL}/jobs?${searchParams.toString()}`
  const response = await fetch(url)

  // Throw on non-2xx so React Query transitions into the `error` state.
  // Returning empty/null here would silently swallow failures.
  if (!response.ok) {
    throw new Error(`Failed to fetch jobs: ${response.status}`)
  }

  return response.json()
}

export async function getJobById(id: string): Promise<Job> {
  const response = await fetch(`${BASE_URL}/jobs/${id}`)

  if (!response.ok) {
    throw new Error(`Failed to fetch job ${id}: ${response.status}`)
  }

  return response.json()
}