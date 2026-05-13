/**
 * Job posting as returned by the MockAPI endpoint.
 * Field names match the API response exactly — do not rename.
 */
export interface Job {
  id: string
  title: string
  company: string
  companyAvatar: string
  companyUrl: string
  department: string
  jobType: string
  description: string
  // ISO 8601 timestamp string. Parse with `new Date()` when sorting or displaying.
  publishedAt: string
  isActiveRecruiting: boolean
}